var HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports =
{
	networks:
	{
		mainnet:
		{
			provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.MAINNET_NODE),
			network_id: '1',
			gasPrice:   8000000000, // 8 Gwei
		},
		ropsten:
		{
			provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.ROPSTEN_NODE),
			network_id: '3',
			gasPrice:   8000000000, // 8 Gwei
		},
		rinkeby:
		{
			provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_NODE),
			network_id: '4',
			gasPrice:   8000000000, // 8 Gwei
		},
		goerli:
		{
			provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.GOERLI_NODE),
			network_id: '5',
			gasPrice:   8000000000, // 8 Gwei
		},
		kovan: {
			provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.KOVAN_NODE),
			network_id: '42',
			gasPrice:   8000000000, // 8 Gwei
		},
		viviani: {
			provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.VIVIANI_NODE),
			network_id: '133',
			gasPrice:   '0', // 0 Gwei
			gas:        '6700000',
		},
		bellecour: {
			provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.BELLECOUR_NODE),
			network_id: '134',
			gasPrice:   '0', // 0 Gwei
			gas:        '6700000',
		}
	}
};
