export const CONTRACT_ADDRESS = "0xD0D1ECF6815582a6679c3112f05ed3c13b0Bd171"; 

export const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "getPlayer",
    "outputs": [
      { "internalType": "uint256", "name": "money", "type": "uint256" },
      { "internalType": "uint256", "name": "level", "type": "uint256" },
      { "internalType": "uint256", "name": "wins", "type": "uint256" },
      { "internalType": "uint256", "name": "games", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWinRate",
    "outputs": [
      { "internalType": "uint256", "name": "winRate", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_money", "type": "uint256" },
      { "internalType": "uint256", "name": "_level", "type": "uint256" }
    ],
    "name": "updateMoneyAndLevel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bool", "name": "didWin", "type": "bool" }
    ],
    "name": "updateStats",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
