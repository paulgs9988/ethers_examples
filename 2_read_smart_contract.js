const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];
const contract = new ethers.Contract(daiAddress, ERC20_ABI, provider);

const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const myBalance = await contract.balanceOf(
    "0x4943b0c9959dcf58871a799dfb71bece0d97c9f4"
  );
  console.log(
    `
    name: ${name}
    symbol: ${symbol}
    total supply: ${ethers.utils.formatUnits(totalSupply)}
    large wallet ${symbol} balance: ${ethers.utils.formatUnits(myBalance)}
    `
  );
};

main();
