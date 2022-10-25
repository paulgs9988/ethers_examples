const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

const main = async () => {
  const block = await provider.getBlockNumber();
  //   console.log(`\nBlockNumber: ${block}\n`);

  //   const blockInfo = await provider.getBlock(block);
  //   console.log(blockInfo);

  const { transactions } = await provider.getBlockWithTransactions(block);
  //inspect first transaction within block and log to console:
  console.log(transactions[0]);
};

main();
