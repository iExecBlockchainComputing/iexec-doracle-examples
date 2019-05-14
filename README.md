iExec Dencentralized Oracle System
==================================

About iExec
-----------

Thanks to iExec, it is possible to achieve onchain consensus about the result of an offchain application. Applications are represented by smart contracts and executions results can be made available onchain with all the necessary proof.

Building an oracle application
------------------------------

iExec applications produce different outputs.
* The consensus is achieve on a deterministic value describing the application output. By default this is the hash of the result archive, but can be overriden by the content of `/iexec_out/determinism.iexec`. Upon succesfull verification, this is stored onchain in the `task.resultDigest` field.
* The actual result. By default this is the IPFS address of a (potentially encrypted) archive containing the outputs, but can be overrident by the content of `/iexec_out/callback.iexec`. Upon succesfull verification, this is stored onchain in the `task.results` field.

An iExec oracle application such as the on used in the price-oracle example uses these 2 elements to produce verified results to the blockchain.

Given a set of parameters, the application produce a self describing result, encodes it in a way that can be interpreted onchain, store it in `/iexec_out/callback.iexec` so that is can be accessed onchain, and store the hash of this encoded value to perform the consensus.

For example, given the parameters "BTC USD 9 2019-04-11T13:08:32.605Z" the price-oracle application will:

1. Retreive the price of BTC in USD at 2019-04-11T13:08:32.605Z
2. Multiply this value by 10e9 (to capture price value more accurately as it will be represented by an integer onchain)
3. encode the date, the description ("btc-usd-9") and the value using `abi.encode`
4. Store this result in `/iexec_out/callback.iexec`
5. hash the result and store it in `/iexec_out/determinism.iexec`

iExec will then achieve PoCo consensus on the `/iexec_out/determinism.iexec` value, and will store both the `/iexec_out/determinism.iexec` and the `/iexec_out/callback.iexec` onchain.

Given a taskID, it is possible to retreive all the details of the computation as described above. The oracle smartcontract just needs to retreive the informations, verify the validity of the execution and process the encoded result. Thanks to the PoCo consensus, anyone can require a computation and ask the oracle to update itself in a trustless manner.

How to setup an oracle contract
-------------------------------

1. Record the address of the iExec Hub and Clerk contracts

2. Register the requierements needed for an result to we processed
	* Which application (single, any, whitelist?)
	* Which dataset (single, any, whitelist?)
	* Which workerpool (single, any, whitelist?)
	* Minimum level of trust
	* Mandatory tag

How to update an oracle contract
--------------------------------

1. Send the taskID of a valid execution to the oracle smart contract.
2. The oracle smart contract retreives details about this task from the iexec's smart contracts
3. The oracle smart contract verifies the execution is valid (authorized app, dataset, workerpool, trust level and tags)
4. The oracle smart contract verifies the hash of the results correspond to the resultDigest that achieved consensus, thus verifying the validity of the result field.
5. The oracle smart contract decodes the results using `abi.decode`
6. The oracle smart contract process this results. In the case of the price oracle this means storing the value if it is more recent than the one currently reccorded.

How to read price from the iExec price oracle
---------------------------------------------

Just query the oracle `values` field with the id of the requested wield. For example, to get the most recent price of BTC in USD with 9 place precision (as described above), query `values(keccak256(bytes("BTC-USD-9")))` and this will return a structure containing the value, the associate date, and the details of the request.

Deployed addresses
------------------

1. **Kovan:**

	price oracle: `https://kovan.etherscan.io/address/0xc4f503fea0102b826b12fa75feeedf3b519c8b59`

	app whitelist: `https://kovan.etherscan.io/address/0x7c788c2b85e20b4fa25bd579a6b1d0218d86bdd1`

	whitelist contains:

	* `0x84D080a8c17c3784C269435fA82D4b8426Dd65a7` → `0x87cd9afeb72ecb2d7286f44b9ce8a75d7391898b450bafc577c2012d2a684549` (0.0.1)
	* `0xa40e5E7cD39302BBF13E60413db87Df568C04B1E` → `0x629ef3bab7a0abfef062d957753b9f34fe82a4c2d94d4895a0473d18eb9a929b` (0.0.2)
	* `0x538D8E5B3Ef93A6E44FC308E94a04ecB413b7fbE` → `0x66efe1b2fc835c450e8ee2ea82591af1cd4eb98245d7965a5ae24ef56c3baf32` (0.0.3 on 3.0.30)

	Whitelist is administered by:

	* `0x7bd4783FDCAD405A28052a0d1f11236A741da593` → `0xd3516e017d3a68257be86c2da5aa273f19d25b66c3dd62e96923f18a3922bb5b`
	* `0x7859821024E633C5dC8a4FcF86fC52e7720Ce525` → `0x37c512bbaf358829ca29749fd301fe49f45127f458bf631cc40190fc69a2c850`
