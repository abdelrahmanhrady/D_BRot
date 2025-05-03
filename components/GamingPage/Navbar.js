import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3 } from "../StateContext/webContext";
import { contract } from "@/library/web3"; // make sure this points to your web3/contract setup

// NOTE: A lot of functions are left overs from the centralized project like the Passive income which does not exist 

const NavbarG = () => {
  const { account, player, updatePlayerData } = useWeb3();
  const router = useRouter();
  const [passiveRate, setPassiveRate] = useState(0);
  const [passiveCost, setPassiveCost] = useState(0);

  useEffect(() => {
    if (player) {
      const rate = 2 ** player.level;
      setPassiveRate(rate);

      let cost;
      if (player.level < 11) {
        cost = rate ** 2;
      } else {
        cost = rate * player.level * 100;
      }
      setPassiveCost(cost);
    }
  }, [player]);

  function stringNumConversion(num) {
    let isNegative = num < 0;
    num = Math.abs(num);
    let result;
    if (num >= 1_000_000_000_000) {
      result = Math.floor(num / 1_000_000_000_000 * 100) / 100 + "T";
    } else if (num >= 1_000_000_000) {
      result = Math.floor(num / 1_000_000_000 * 100) / 100 + "B";
    } else if (num >= 1_000_000) {
      result = Math.floor(num / 1_000_000 * 100) / 100 + "M";
    } else if (num >= 1_000) {
      result = Math.floor(num / 1_000 * 100) / 100 + "K";
    } else {
      result = num.toString();
    }
    return isNegative ? "-" + result : result;
  }

  const passiveCollect = async () => {
    try {
      await contract.methods.collectPassive().send({ from: account });
      await updatePlayerData();
    } catch (err) {
      console.error("Error collecting passive:", err);
    }
  };

  const passiveUpgrade = async () => {
    try {
      await contract.methods.upgradePassive().send({ from: account });
      await updatePlayerData();
    } catch (err) {
      alert("Upgrade failed (maybe not enough money).");
      console.error(err);
    }
  };

  if (!player) {
    return <LoadingScreen>Loading Player...</LoadingScreen>;
  }

  return (
    <>
      <Box>
        <ImageWrapper>
          <Image src="/BRlogo.png" width={106} height={76} alt="Logo" />
        </ImageWrapper>

        <PokerChips>
          <Image src="/PokerChips.png" width={53} height={38} alt="Chips" />
        </PokerChips>
        <HeadText>: {stringNumConversion(player.money)}</HeadText>

        <BoxSignUp onClick={() => router.push("/")}>Exit</BoxSignUp>

        <Link target="_blank" href="/Leaderboard">
          <BoxLeaderboard>Leaderboard</BoxLeaderboard>
        </Link>

      </Box>
    </>
  );
};

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gold;
  font-size: 2rem;
`;

// Styled components below (unchanged)...

const HeadText = styled.h1`
  text-shadow: 1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black,
    -1px 1px 0px black;
  position: absolute;
  top: 25%;
  left: 45%;
  color: rgb(255, 215, 0);
  font-size: 32px;
  font-family: "Noto Sans Georgian";
  font-weight: 700;
  text-align: center;
`;

const Box = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 99px;
  background: rgb(51, 0, 0);
`;

const PokerChips = styled.div`
  position: absolute;
  left: 39%;
  top: 20%;
  padding: 10px 30px;
`;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 10px 30px;
`;

const BoxPassiveCollect = styled.div`
  font-family: "Noto Sans Georgian", sans-serif;
  display: inline-block;
  color: black;
  padding: 7px 28px;
  font-size: 12px;
  background: rgb(0, 255, 42);
  position: absolute;
  cursor: pointer;
  left: 11%;
  top: 24px;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 15px;

  &:hover {
    background: rgb(0, 215, 36);
    transition: 0.5s;
  }
`;

const BoxPassiveLevel = styled.div`
  font-family: "Noto Sans Georgian", sans-serif;
  display: inline-block;
  color: black;
  padding: 7px 28px;
  font-size: 12px;
  background: rgb(255, 215, 0);
  position: absolute;
  cursor: pointer;
  left: 25%;
  top: 24px;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 15px;

  &:hover {
    background: rgb(208, 177, 0);
    transition: 0.5s;
  }
`;

const BoxSignUp = styled.div`
  font-family: "Noto Sans Georgian", sans-serif;
  display: inline-block;
  color: black;
  padding: 7px 28px;
  font-size: 18px;
  background: rgb(255, 215, 0);
  position: absolute;
  cursor: pointer;
  left: 90%;
  top: 24px;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 15px;

  &:hover {
    background: rgb(208, 177, 0);
    transition: 0.5s;
  }
`;

const BoxLeaderboard = styled.div`
  font-family: "Noto Sans Georgian", sans-serif;
  display: inline-block;
  color: black;
  padding: 7px 28px;
  font-size: 18px;
  background: rgb(255, 215, 0);
  position: absolute;
  cursor: pointer;
  left: 75%;
  top: 24px;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 15px;

  &:hover {
    background: rgb(208, 177, 0);
    transition: 0.5s;
  }
`;

export default NavbarG;
