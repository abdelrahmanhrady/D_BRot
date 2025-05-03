// context/Web3Context.js
import { createContext, useContext, useState, useEffect } from 'react';
import { contract, web3 } from '@/library/web3';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [player, setPlayer] = useState(null);

  const updatePlayerData = async () => {
    const data = await contract.methods.getPlayer().call({ from: account });
    setPlayer({
      money: parseInt(data[0]),
      level: parseInt(data[1]),
      wins: parseInt(data[2]),
      games: parseInt(data[3]),
    });
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const [acc] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(acc);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (account) {
      updatePlayerData();
    }
  }, [account]);

  return (
    <Web3Context.Provider value={{ account, player, updatePlayerData }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
