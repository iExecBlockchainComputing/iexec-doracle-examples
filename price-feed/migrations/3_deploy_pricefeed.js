var GenericFactory = artifacts.require('@iexec/solidity/GenericFactory')
var PriceOracle    = artifacts.require("PriceOracle");

const LIBRARIES = [
	// None
].map(contract => ({
	pattern: new RegExp(`__${contract.contractName}${'_'.repeat(38-contract.contractName.length)}`, 'g'),
	library: contract,
}))

async function factoryDeployer(contract, options = {})
{
	console.log(`[factoryDeployer] ${contract.contractName}`);
	const factory          = await GenericFactory.deployed();
	const libraryAddresses = await Promise.all(LIBRARIES.filter(({ pattern }) => contract.bytecode.search(pattern) != -1).map(async ({ pattern, library }) => ({ pattern, ...await library.deployed() })));
	const constructorABI   = contract._json.abi.find(e => e.type == 'constructor');
	const coreCode         = libraryAddresses.reduce((code, { pattern, address }) => code.replace(pattern, address.slice(2).toLowerCase()), contract.bytecode);
	const argsCode         = constructorABI ? web3.eth.abi.encodeParameters(constructorABI.inputs.map(e => e.type), options.args || []).slice(2) : '';
	const code             = coreCode + argsCode;
	const salt             = options.salt  || '0x0000000000000000000000000000000000000000000000000000000000000000';

	contract.address = options.call
		? await factory.predictAddressWithCall(code, salt, options.call)
		: await factory.predictAddress(code, salt);

	if (await web3.eth.getCode(contract.address) == '0x')
	{
		console.log(`[factory] Preparing to deploy ${contract.contractName} ...`);
		options.call
			? await factory.createContractAndCall(code, salt, options.call)
			: await factory.createContract(code, salt);
		console.log(`[factory] ${contract.contractName} successfully deployed at ${contract.address}`);
	}
	else
	{
		console.log(`[factory] ${contract.contractName} already deployed at ${contract.address}`);
	}
}

module.exports = async function(deployer, network, accounts)
{
	await factoryDeployer(
		PriceOracle,
		{
			salt: process.env.SALT,
			call: web3.eth.abi.encodeFunctionCall(PriceOracle._json.abi.find(e => e.name == 'transferOwnership'), [ accounts[0] ]),
			// call: web3.eth.abi.encodeFunctionCall(PriceOracle._json.abi.find(e => e.name == 'updateEnv'), [
			// 	"0xbfE5C1eacD47ba0C9876cc541a3dF8D70d221D4f",                         // authorizedApp
			// 	"0x0000000000000000000000000000000000000000",                         // authorizedDataset
			// 	"0x0000000000000000000000000000000000000000",                         // authorizedWorkerpool
			// 	"0x0000000000000000000000000000000000000000000000000000000000000001", // requiredtag
			// 	"0",                                                                  // requiredtrust
			// ]),
		}
	); // web3.utils.randomHex(32)
};
