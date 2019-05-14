import { ethers } from 'ethers';
import * as utils from './utils';

const PriceOracle = require('../build/contracts/PriceOracle.json');
const IexecHub    = require('iexec-poco/build/contracts/IexecHub.json');
const IexecClerk  = require('iexec-poco/build/contracts/IexecClerk.json');
const IERC734     = require('iexec-poco/build/contracts/IERC734.json');

export default class Daemon
{
	address:    string;
	wallet:     ethers.Wallet;
	doracle:    ethers.Contract;
	iexechub:   ethers.Contract;
	iexecclerk: ethers.Contract;
	settings:
	{
		authorizedApp:        string,
		authorizedDataset:    string,
		authorizedWorkerpool: string,
		requiredtag:          string,
		requiredtrust:        number,
		GROUPMEMBER_PURPOSE:  number,
	};

	constructor(address: string, wallet: ethers.Wallet)
	{
		this.address = address;
		this.wallet  = wallet;
	}

	async start(listener: boolean = true) : Promise<void>
	{
		console.log(`Connecting to contracts`);
		this.doracle = new ethers.Contract(this.address, PriceOracle.abi, this.wallet);
		console.log(`- doracle    ${this.doracle.address}`);
		this.iexechub = new ethers.Contract(await this.doracle.m_iexecHub(), IexecHub.abi, this.wallet.provider);
		console.log(`- iexechub   ${this.iexechub.address}`);
		this.iexecclerk = new ethers.Contract(await this.doracle.m_iexecClerk(), IexecClerk.abi, this.wallet.provider);
		console.log(`- iexecclerk ${this.iexecclerk.address}`);

		console.log(`Retrieving doracle settings:`);
		this.settings = {
			authorizedApp:        await this.doracle.m_authorizedApp(),
			authorizedDataset:    await this.doracle.m_authorizedDataset(),
			authorizedWorkerpool: await this.doracle.m_authorizedWorkerpool(),
			requiredtag:          await this.doracle.m_requiredtag(),
			requiredtrust:        await this.doracle.m_requiredtrust(),
			GROUPMEMBER_PURPOSE:  await this.iexecclerk.GROUPMEMBER_PURPOSE(),
		}
		console.log(`- authorizedApp:        ${this.settings.authorizedApp}`       );
		console.log(`- authorizedDataset:    ${this.settings.authorizedDataset}`   );
		console.log(`- authorizedWorkerpool: ${this.settings.authorizedWorkerpool}`);
		console.log(`- requiredtag:          ${this.settings.requiredtag}`         );
		console.log(`- requiredtrust:        ${this.settings.requiredtrust}`       );
		console.log(`- GROUPMEMBER_PURPOSE:  ${this.settings.GROUPMEMBER_PURPOSE}` );

		if (listener)
		{
			console.log(`Starting event listener.`)
			this.doracle.on("ResultReady(bytes32)", this.trigger.bind(this));
			console.log(`====== Daemon is running ======`);
		}
		else
		{
			console.log(`====== Daemon is ready ======`);
		}
	}

	async checkIdentity(identity: string, candidate: string, purpose: number): Promise<boolean>
	{
		try
		{
			return identity == candidate || await (new ethers.Contract(identity, IERC734.abi, this.wallet.provider)).keyHasPurpose(utils.addrToKey(candidate), purpose);
		}
		catch
		{
			console.log(identity, candidate)
			return false;
		}
	}

	async getVerifiedResult(doracleCallId: string) : Promise<string>
	{
			let task = await this.iexechub.viewTask(doracleCallId);
			let deal = await this.iexecclerk.viewDeal(task.dealid);

			utils.require(task.status == 3, "result-not-available");
			utils.require(task.resultDigest == ethers.utils.keccak256(task.results), "result-not-validated-by-consensus");
			utils.require(this.settings.authorizedApp        == ethers.constants.AddressZero || await this.checkIdentity(this.settings.authorizedApp,        deal.app.pointer,        this.settings.GROUPMEMBER_PURPOSE), "unauthorized-app");
			utils.require(this.settings.authorizedDataset    == ethers.constants.AddressZero || await this.checkIdentity(this.settings.authorizedDataset,    deal.dataset.pointer,    this.settings.GROUPMEMBER_PURPOSE), "unauthorized-dataset");
			utils.require(this.settings.authorizedWorkerpool == ethers.constants.AddressZero || await this.checkIdentity(this.settings.authorizedWorkerpool, deal.workerpool.pointer, this.settings.GROUPMEMBER_PURPOSE), "unauthorized-workerpool");
			utils.require(this.settings.requiredtrust <= deal.trust, "invalid-trust");

			// Check tag - must be done byte by byte.
			let [ ta, rta ] = [ deal.tag, this.settings.requiredtag ].map(ethers.utils.arrayify);
			for (var i in ta) utils.require((rta[i] & ~ta[i]) == 0, "invalid-tag");

			return task.results;
	}

	async checkData(data: string) : Promise<void>
	{
		let [ date, details, value ] = ethers.utils.defaultAbiCoder.decode(["uint256", "string", "uint256"], data);
		let entry = await this.doracle.values(ethers.utils.solidityKeccak256(["string"],[details]));
		utils.require(entry.date < date, "new-value-is-too-old");
	}

	trigger(doracleCallId: string, event: {})
	{
		process.stdout.write(`${new Date().toISOString()} | processing ${doracleCallId} ... `);
		this.getVerifiedResult(doracleCallId)
		.then(data => {
			this.checkData(data)
			.then(() => {
				this.doracle.processResult(doracleCallId)
				.then(tx => {
					process.stdout.write(`success\n`);
				})
				.catch(e => {
					const txHash = e.transactionHash;
					const data   = e.data[txHash];
					process.stdout.write(`Error: ${data.error} (${data.reason})\n`);
				});
			})
			.catch(reason => {
				process.stdout.write(`Invalid results (${reason})\n`);
			});
		})
		.catch(reason => {
			process.stdout.write(`Failled to verify results (${reason})\n`);
		});
	}
}
