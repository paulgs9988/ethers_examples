const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_TESTNET);

const account1 = process.env.PUBLIC_KEY_1; //sender
const account2 = process.env.PUBLIC_KEY_2; //receiver

const privateKey1 = process.env.PRIVATE_KEY_1; //sender
//const privateKey2 = process.env.PRIVATE_KEY_2;  //receiver

const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
  //show account balances before transfer
  const preBalance1 = await provider.getBalance(account1);
  const preBalance2 = await provider.getBalance(account2);
  console.log(
    `Account 1 balance: ${ethers.utils.formatEther(
      preBalance1
    )}\nAccount2 balance: ${ethers.utils.formatEther(preBalance2)}`
  );

  //send some ETH from account1 to account 2
  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.025"),
  });

  //wait for tx to be mined
  await tx.wait();

  console.log(tx);

  //show post transaction account balances
  const postBalance1 = await provider.getBalance(account1);
  const postBalance2 = await provider.getBalance(account2);
  console.log(
    `Account 1 balance: ${ethers.utils.formatEther(
      postBalance1
    )}\nAccount2 balance: ${ethers.utils.formatEther(postBalance2)}`
  );
};

main();
