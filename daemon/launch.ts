import { ethers } from 'ethers';
import   Daemon   from './daemon';

let doracle_addr: string                = "0x3b9F1a9aeCb1991f3818f45bd4CC735f4BEE93Ac";
let private_key: string                 = "0x564a9db84969c8159f7aa3d5393c5ecd014fce6a375842a45b12af6677b12407";
let provider: ethers.providers.Provider = ethers.getDefaultProvider("kovan");

// let doracle_addr: string                = "0x21883aBA1D796BF9B321D900F8006C9a075601F6";
// let private_key: string                 = "0x564a9db84969c8159f7aa3d5393c5ecd014fce6a375842a45b12af6677b12407";
// let provider: ethers.providers.Provider = new ethers.providers.JsonRpcProvider();

let wallet: ethers.Wallet               = new ethers.Wallet(private_key, provider);
let daemon: Daemon                      = new Daemon(doracle_addr, wallet);

daemon.start();
