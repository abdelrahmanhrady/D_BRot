// lib/web3.js
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contractInfo";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // In browser with MetaMask
  web3 = new Web3(window.ethereum);
} else {
  // Fallback if not in browser
  const provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
  web3 = new Web3(provider);
}

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

export { web3, contract };
