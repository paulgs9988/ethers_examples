const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const address = process.env.META_ADDRESS;
const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(
    `\nEth Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`
  );
};

main();
