import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { contract, web3 } from "../library/web3";
import Image from "next/image";

const Leaderboard = () => {
  const [winRate, setWinRate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinRate = async () => {
      try {
        // Again kinda iffy on window.ethereum but GPT comes clutch for this
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          const account = accounts[0];
          // Testing purposes
          console.log("Connected wallet:", account);
  
          const rate = await contract.methods.getWinRate().call({ from: account });
          // Testing purposes
          console.log("Win rate:", rate);
  
          setWinRate(rate);
        } else {
          console.error("MetaMask not detected");
        }
      } catch (error) {
        console.error("Error fetching win rate:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWinRate();
  }, []);

  return (
    <>
    <Container>
      <Title>🎯 Your Win Rate 🎯</Title>
      {loading ? (
        <RateText>Loading...</RateText>
      ) : (
        <RateText>{Number(winRate)}%</RateText>
      )}
    </Container>




    <ImageWrapperBlr>
            <Image src="/PokerBG.jpg" layout="fill" objectFit="cover" />
          </ImageWrapperBlr>
          <ImageWrapper>
            <Image src="/PokerBG.jpg" layout="fill" objectFit="cover" />
          </ImageWrapper>
    </>
  );
};
const Container = styled.div`
  font-size: 24px;
  color: white;
  padding: 30px;
  font-weight: bold;
  text-align: center;
  background-color: #1a1a1a;
  margin: 80px auto;
  border-radius: 10px;
  width: 40%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 15px;
  color: gold;
`;

const RateText = styled.p`
  font-size: 28px;
  color: #7fff8a;
`;


const ImageWrapper = styled.div`
  z-index: -1;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0px;
  border-radius: 0px;
  filter: blur(10px);
`;

const ImageWrapperBlr = styled.div`
  z-index: -2;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0px;
  border-radius: 0px;
`;

export default Leaderboard;
