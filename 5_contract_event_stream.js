//Use this contract to listen to events (i.e. Transfers) emitted by the Dai stablecoin contract
const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

const ERC20_ABI = [
  //functions:
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
  //events:
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
//Dai contract address
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const contract = new ethers.Contract(daiAddress, ERC20_ABI, provider);

const main = async () => {
  var currentBlock = await provider.getBlockNumber();
  const transferEvents = await contract.queryFilter(
    "Transfer",
    currentBlock - 10,
    currentBlock
  );
  //log the number of transfers in the last 10 blocks
  console.log(transferEvents.length);
};

main();
