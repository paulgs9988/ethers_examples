const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_TESTNET);

const account1 = process.env.PUBLIC_KEY_1;
const account2 = process.env.PUBLIC_KEY_2;
const chainlinkGoerli = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

const privateKey1 = process.env.PRIVATE_KEY_1;
const wallet = new ethers.Wallet(privateKey1, provider);
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

const contract = new ethers.Contract(chainlinkGoerli, ERC20_ABI, provider);

const main = async () => {
  const balance = await contract.balanceOf(account1);

  console.log(`\nReading from ${chainlinkGoerli}\n`);
  console.log(`Balance of sender: ${balance}\n`);

  const contractWithWallet = contract.connect(wallet);

  const tx = await contractWithWallet.transfer(account2, balance);
  await tx.wait();

  console.log(tx);

  const balanceofSender = await contract.balanceOf(account1);
  const balanceofReceiver = await contract.balanceOf(account2);

  console.log(`\nBalance of sender: ${balanceofSender}`);
  console.log(`Balance of receiver: ${balanceofReceiver}\n`);
};

main();
