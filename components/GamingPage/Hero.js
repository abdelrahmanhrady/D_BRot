import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Chart } from "react-google-charts";
import { useRouter } from "next/router";
import { contract, web3 } from "@/library/web3";
import { useWeb3 } from "../StateContext/webContext";

const HeroG = () => {
  const { account, player, updatePlayerData } = useWeb3();

  const [gameHistory, setGameHistory] = useState([]);






  // Add new state
  const [isProcessing, setIsProcessing] = useState(false);

  // Wrap contract calls in try/finally
  async function updateContractState() {
    try {
      setIsProcessing(true);
      // ... contract calls
    } finally {
      setIsProcessing(false);
    }
  }

  // Update loading message
  if (isProcessing) {
    return <LoadingScreen>Processing blockchain transaction...</LoadingScreen>;
  }
  // Connect wallet
  useEffect(() => {
    // GPT generated, I don't know what window.ethereum really is (I searched for definition I am somewhat understanding of it now)
    if (typeof window !== "undefined") {
      async function connectWallet() {
        if (window.ethereum) {
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
          } catch (error) {
            console.error("Wallet connection Fail:", error);
          }
        } else {
          alert("Install MetaMask Bro");
        }
      }
  
      connectWallet();
    }
  }, []);

  // Call getPlayer() from contract
  const fetchPlayerData = async () => {
    try {
      const data = await contract.methods.getPlayer().call({ from: account });
      updatePlayerData({
        money: data[0],
        level: data[1],
        wins: data[2],
        games: data[3],
      });

      // Calculate win rate
      if (data[3] > 0) {
        setWinRate(Math.round((data[2] * 100) / data[3]));
      }
    } catch (err) {
      console.error("Contract call failed:", err);
    }
  };

  useEffect(() => {
    if (account) {
      fetchPlayerData();
    }
  }, [account]);

  const router = useRouter();

  //I love AI
  const cardImg = [
    // Hearts
    "/HeartA.png",
    "/Heart2.png",
    "/Heart3.png",
    "/Heart4.png",
    "/Heart5.png",
    "/Heart6.png",
    "/Heart7.png",
    "/Heart8.png",
    "/Heart9.png",
    "/Heart10.png",
    "/HeartJ.png",
    "/HeartQ.png",
    "/HeartK.png",

    // Clubs
    "/ClubA.png",
    "/Club2.png",
    "/Club3.png",
    "/Club4.png",
    "/Club5.png",
    "/Club6.png",
    "/Club7.png",
    "/Club8.png",
    "/Club9.png",
    "/Club10.png",
    "/ClubJ.png",
    "/ClubQ.png",
    "/ClubK.png",

    // Spades
    "/SpadeA.png",
    "/Spade2.png",
    "/Spade3.png",
    "/Spade4.png",
    "/Spade5.png",
    "/Spade6.png",
    "/Spade7.png",
    "/Spade8.png",
    "/Spade9.png",
    "/Spade10.png",
    "/SpadeJ.png",
    "/SpadeQ.png",
    "/SpadeK.png",

    // Diamonds
    "/DiamondA.png",
    "/Diamond2.png",
    "/Diamond3.png",
    "/Diamond4.png",
    "/Diamond5.png",
    "/Diamond6.png",
    "/Diamond7.png",
    "/Diamond8.png",
    "/Diamond9.png",
    "/Diamond10.png",
    "/DiamondJ.png",
    "/DiamondQ.png",
    "/DiamondK.png",
  ];

  const cardArray = [
    11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 10, 10, 10,
  ];

  const cardArrayTemp = useRef(cardArray);
  const [rende, setRender] = useState(-99999999);
  const [chartVersion, setChartVersion] = useState(0);

  function render() {
    setRender((prevRender) => prevRender + 1);
  }
  //Save info

  //Game variables
  const [midMsg, setMidMsg] = useState("");

  const empty = "/EmptyCard.png";

  //Card Images
  const dealerImg1 = useRef("/EmptyCard.png");
  const dealerImg2 = useRef("/EmptyCard.png");
  const dealerImg3 = useRef("/EmptyCard.png");
  const dealerImg4 = useRef("/EmptyCard.png");
  const dealerImg5 = useRef("/EmptyCard.png");

  const yourImg1 = useRef("/EmptyCard.png");
  const yourImg2 = useRef("/EmptyCard.png");
  const yourImg3 = useRef("/EmptyCard.png");
  const yourImg4 = useRef("/EmptyCard.png");
  const yourImg5 = useRef("/EmptyCard.png");

  const dealerCard1 = useRef(0);
  const dealerCard2 = useRef(0);
  const dealerCard3 = useRef(0);
  const dealerCard4 = useRef(0);
  const dealerCard5 = useRef(0);

  const flippedCard = useRef(0);

  const yourCard1 = useRef(0);
  const yourCard2 = useRef(0);
  const yourCard3 = useRef(0);
  const yourCard4 = useRef(0);
  const yourCard5 = useRef(0);

  const yourSum = useRef(0);
  const dealerSum = useRef(0);

  const [midGame, setMidGame] = useState(false);
  let CardSelector = 0;

  const [betAmount, setBetAmount] = useState("");
  const fixedBet = useRef(0);

  const stringNum = useRef("");

  //Chart setup, Thanks to AI cause no way anyone writes code this way
  const chartData = React.useMemo(() => {
    return [
      ["Games", "Money"],
      ...(gameHistory.length === 0
        ? [[0, player?.money || 0]]
        : gameHistory.map((money, index) => [index + 1, money])),
    ];
  }, [gameHistory, player?.money]);

  const options = React.useMemo(
    () => ({
      title: "Money Progression",
      hAxis: {
        title: "Games",
        format: "#",
        gridlines: { count: -1 },
      },
      vAxis: {
        title: "Money",
        format: "short",
        viewWindow: {
          min: 0,
        },
      },
      legend: "none",
      backgroundColor: "transparent",
      colors: ["rgb(19, 0, 166)"],
      chartArea: {
        width: "85%",
        height: "75%",
        left: 60,
        top: 40,
        right: 20,
        bottom: 60,
      },
    }),
    []
  );

  //Loading screen
  if (!player || !account) {
    return <LoadingScreen>Connect your wallet to play</LoadingScreen>;
  }

  //Used a little chatgpt logic on this one, but 80% of this function is me. Only the treatment of negative numbers are dealt by gpt
  function stringNumConversion(num) {
    let isNegative = num < 0;
    num = Math.abs(num);

    let result;
    if (num >= 1_000_000_000_000) {
      result = Math.floor((num / 1_000_000_000_000) * 100) / 100 + "T";
    } else if (num >= 1_000_000_000) {
      result = Math.floor((num / 1_000_000_000) * 100) / 100 + "B";
    } else if (num >= 1_000_000) {
      result = Math.floor((num / 1_000_000) * 100) / 100 + "M";
    } else if (num >= 1_000) {
      result = Math.floor((num / 1_000) * 100) / 100 + "K";
    } else {
      result = num.toString();
    }

    return isNegative ? "-" + result : result;
  }

  //Reset cards after game

  function ResetCards() {
    yourCard1.current = 0;
    yourCard2.current = 0;
    yourCard3.current = 0;
    yourCard4.current = 0;
    yourCard5.current = 0;

    dealerCard1.current = 0;
    dealerCard2.current = 0;
    dealerCard3.current = 0;
    dealerCard4.current = 0;
    dealerCard5.current = 0;
    cardArrayTemp.current = [...cardArray];
    setMidMsg("");
  }

  //Checks if you have an ace and reverts it to 1
  function CheckForAceYou() {
    if (yourCard1.current === 11) {
      yourCard1.current = 1;
      return;
    }
    if (yourCard2.current === 11) {
      yourCard2.current = 1;
      return;
    }
    if (yourCard3.current === 11) {
      yourCard3.current = 1;
      return;
    }
    if (yourCard4.current === 11) {
      yourCard4.current = 1;
      return;
    }
    if (yourCard5.current === 11) {
      yourCard5.current = 1;
      return;
    }
  }
  //checks dealers ace
  function CheckForAce() {
    if (dealerCard1.current === 11) {
      dealerCard1.current = 1;
      return;
    }
    if (dealerCard2.current === 11) {
      dealerCard2.current = 1;
      return;
    }
    if (dealerCard3.current === 11) {
      dealerCard3.current = 1;
      return;
    }
    if (dealerCard4.current === 11) {
      dealerCard4.current = 1;
      return;
    }
    if (dealerCard5.current === 11) {
      dealerCard5.current = 1;
      return;
    }
  }
  //Smart way of making sure you aren't reselecting cards
  function SelectorCheck() {
    let CardSelectors = 0;
    CardSelectors = Math.floor(Math.random() * 52);
    while (cardArrayTemp.current[CardSelectors] === 0) {
      console.log(CardSelector);
      CardSelectors = Math.floor(Math.random() * 52);
    }
    return CardSelectors;
  }

  //function mostly used when user clicks "stand" to finalize game
  async function CheckWinner() {
    stringNum.current = stringNumConversion(fixedBet.current);
    const betAmount = parseInt(fixedBet.current);
    let didWin = false;
    let newMoney = player.money;

    try {
      if (yourSum.current > dealerSum.current) {
        setMidMsg(
          `YOU WON ${stringNum.current}$ : ${yourSum.current} to ${dealerSum.current}`
        );
        didWin = true;
        newMoney = player.money + betAmount;
      } else if (yourSum.current < dealerSum.current) {
        setMidMsg(
          `YOU LOST ${stringNum.current}$ : ${yourSum.current} to ${dealerSum.current}`
        );
        didWin = false;
        newMoney = player.money - betAmount;
      } else {
        setMidMsg(`DRAW: ${yourSum.current} to ${dealerSum.current}`);
        didWin = false; // Draw still counts as a game played
      }

      // Update contract state
      await contract.methods.updateStats(didWin).send({ from: account });
      await contract.methods
        .updateMoneyAndLevel(newMoney, player.level)
        .send({ from: account });

      // Refresh player data from blockchain
      const updatedData = await contract.methods
        .getPlayer()
        .call({ from: account });
      updatePlayerData({
        money: updatedData[0],
        level: updatedData[1],
        wins: updatedData[2],
        games: updatedData[3],
      });

      // Update local game history (not stored in contract)
      setGameHistory((prevHistory) => [...prevHistory, newMoney]);
    } catch (error) {
      console.error("Blockchain transaction failed:", error);
      setMidMsg("Transaction failed - check console for details");
    }

    // Reset game state
    setMidGame(false);
    setBetAmount("");
    fixedBet.current = 0;
    setChartVersion((prev) => prev + 1);
  }
  //When dealer has more than 21 and no aces
  async function DealerOverflow() {
    stringNum.current = stringNumConversion(fixedBet.current);
    const betAmount = parseInt(fixedBet.current);

    try {
      setMidMsg(
        `YOU WON ${stringNum.current}$ : Dealer ${dealerSum.current}, over 21!`
      );

      // Update contract state
      await contract.methods.updateStats(true).send({ from: account });
      const newMoney = player.money + betAmount;
      await contract.methods
        .updateMoneyAndLevel(newMoney, player.level)
        .send({ from: account });

      // Refresh data from blockchain
      const updatedData = await contract.methods
        .getPlayer()
        .call({ from: account });
      updatePlayerData({
        money: updatedData[0],
        level: updatedData[1],
        wins: updatedData[2],
        games: updatedData[3],
      });

      // Update local history
      setGameHistory((prev) => [...prev, newMoney]);
    } catch (error) {
      console.error("Transaction failed:", error);
      setMidMsg("Error updating blockchain - check console");
    }

    setMidGame(false);
    setBetAmount("");
    fixedBet.current = 0;
    setChartVersion((prev) => prev + 1);
  }

  async function YouOverflow() {
    stringNum.current = stringNumConversion(fixedBet.current);
    const betAmount = parseInt(fixedBet.current);

    try {
      setMidMsg(
        `YOU LOST ${stringNum.current}$ : You ${yourSum.current}, over 21!`
      );

      // Update contract state
      await contract.methods.updateStats(false).send({ from: account });
      const newMoney = player.money - betAmount;
      await contract.methods
        .updateMoneyAndLevel(newMoney, player.level)
        .send({ from: account });

      // Refresh data
      const updatedData = await contract.methods
        .getPlayer()
        .call({ from: account });
      updatePlayerData({
        money: updatedData[0],
        level: updatedData[1],
        wins: updatedData[2],
        games: updatedData[3],
      });

      // Update local history
      setGameHistory((prev) => [...prev, newMoney]);
    } catch (error) {
      console.error("Transaction failed:", error);
      setMidMsg("Error updating blockchain - check console");
    }

    setMidGame(false);
    setBetAmount("");
    fixedBet.current = 0;
    setChartVersion((prev) => prev + 1);
  }
  //loops ace check 5 times (specifically for 2 aces in the beginning), 5 times is not needed but whatever
  function CheckForAceLoop() {
    for (let x = 0; x < 3; x++) {
      if (dealerSum.current > 21) {
        CheckForAce();
        findSums();
      }
    }
  }
  function CheckForAceLoopYou() {
    for (let x = 0; x < 5; x++) {
      if (yourSum.current > 21) {
        CheckForAceYou();
        findSums();
      }
    }
  }
  //finds the sum of cards
  function findSums() {
    yourSum.current =
      yourCard1.current +
      yourCard2.current +
      yourCard3.current +
      yourCard4.current +
      yourCard5.current;

    dealerSum.current =
      dealerCard1.current +
      dealerCard2.current +
      dealerCard3.current +
      dealerCard4.current +
      dealerCard5.current;
    setRender((prevData) => prevData + 1);
  }

  //the ancient way of setting a function (???), When user clicks "stand"
  const handleStandClick = () => {
    if (midGame === false) {
      alert("You must bet first");
      return;
    }
    dealerCard2.current = cardArray[flippedCard.current];
    //to sum all this up, it checks if dealer is less than 16, and adds a card, then repeats process 3 times
    findSums();
    CheckForAceLoopYou();
    CheckForAceLoop();
    findSums();
    dealerImg2.current = cardImg[flippedCard.current];

    if (dealerSum.current <= 16) {
      CardSelector = SelectorCheck();
      dealerImg3.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      dealerCard3.current = cardArray[CardSelector];

      findSums();

      CheckForAceLoop();
      if (dealerSum.current > 21) {
        DealerOverflow();
        return;
      }

      if (dealerSum.current <= 16) {
        CardSelector = SelectorCheck();
        dealerImg4.current = cardImg[CardSelector];
        cardArrayTemp.current[CardSelector] = 0;
        dealerCard4.current = cardArray[CardSelector];

        findSums();

        CheckForAceLoop();
        if (dealerSum.current > 21) {
          DealerOverflow();
          return;
        }

        if (dealerSum.current <= 16) {
          CardSelector = SelectorCheck();
          dealerImg5.current = cardImg[CardSelector];
          cardArrayTemp.current[CardSelector] = 0;
          dealerCard5.current = cardArray[CardSelector];

          findSums();

          CheckForAceLoop();
          if (dealerSum.current > 21) {
            DealerOverflow();
            return;
          }
          CheckWinner();
        } else {
          CheckWinner();
        }
      } else {
        CheckWinner();
      }
    } else {
      CheckWinner();
    }
  };
  //For when user clicks "hit", adds card and checks if over 21
  const handleHitClick = () => {
    if (midGame === false) {
      alert("You must bet first");
      return;
    }
    if (yourCard5.current !== 0) {
      alert("You have max cards");
      return;
    }

    if (yourCard3.current == 0) {
      CardSelector = SelectorCheck();
      yourImg3.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      yourCard3.current = cardArray[CardSelector];
      findSums();

      CheckForAceLoopYou();
      if (yourSum.current > 21) {
        YouOverflow();
        return;
      }
      render();
      return;
    }
    if (yourCard4.current == 0) {
      CardSelector = SelectorCheck();
      yourImg4.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      yourCard4.current = cardArray[CardSelector];
      findSums();

      CheckForAceLoopYou();
      if (yourSum.current > 21) {
        YouOverflow();
        return;
      }

      render();
      return;
    }

    CardSelector = SelectorCheck();
    yourImg5.current = cardImg[CardSelector];
    cardArrayTemp.current[CardSelector] = 0;
    yourCard5.current = cardArray[CardSelector];
    findSums();

    CheckForAceLoopYou();
    if (yourSum.current > 21) {
      YouOverflow();
      return;
    }
    handleStandClick();
    render();
  };
  //once user bets
  const handleBetClick = () => {
    if (midGame === true) {
      alert("You are in the middle of a game!");
      return;
    }

    if (betAmount < 0) {
      alert("You can't bet negatives");
      return;
    }
    if (betAmount > player.money) {
      alert("You don't have enough money");
      return;
    }

    if (betAmount) {
      fixedBet.current = betAmount;
      setMidGame(true);
      ResetCards();
      CardSelector = Math.floor(Math.random() * 52);
      dealerImg1.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      dealerCard1.current = cardArray[CardSelector];

      CardSelector = SelectorCheck();
      yourImg1.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      yourCard1.current = cardArray[CardSelector];

      CardSelector = SelectorCheck();
      yourImg2.current = cardImg[CardSelector];
      cardArrayTemp.current[CardSelector] = 0;
      yourCard2.current = cardArray[CardSelector];

      dealerImg3.current = empty;
      dealerImg4.current = empty;
      dealerImg5.current = empty;

      yourImg3.current = empty;
      yourImg4.current = empty;
      yourImg5.current = empty;

      findSums();
      if (yourSum.current > 21) {
        CheckForAceLoopYou();
      }
      CardSelector = SelectorCheck();
      dealerImg2.current = "/FlippedCard.png";
      flippedCard.current = CardSelector;
      cardArrayTemp.current[CardSelector] = 0;
    } else {
      alert("Please enter a bet amount!");
    }
  };

  return (
    <>
      <ImageWrapperBlr>
        <Image src="/PokerBG.jpg" layout="fill" objectFit="cover" />
      </ImageWrapperBlr>
      <ImageWrapper>
        <Image src="/PokerBG.jpg" layout="fill" objectFit="cover" />
      </ImageWrapper>

      <HeadText>{midMsg}</HeadText>

      <BetContainer>
        <BetInput
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Enter Bet"
        />
        <BetButton onClick={handleBetClick}>Place Bet</BetButton>
      </BetContainer>

      <Dealer>Dealer Cards: {dealerSum.current}</Dealer>
      <DealerCards>
        <DealerCard>
          <Image src={dealerImg1.current} width={78} height={111} />
        </DealerCard>
        <DealerCard>
          <Image src={dealerImg2.current} width={78} height={111} />
        </DealerCard>
        <DealerCard>
          <Image src={dealerImg3.current} width={78} height={111} />
        </DealerCard>
        <DealerCard>
          <Image src={dealerImg4.current} width={78} height={111} />
        </DealerCard>
        <DealerCard>
          <Image src={dealerImg5.current} width={78} height={111} />
        </DealerCard>
      </DealerCards>

      <You>Your Cards: {yourSum.current}</You>
      <YourCards>
        <YourCard>
          <Image src={yourImg1.current} width={78} height={111} />
        </YourCard>
        <YourCard>
          <Image src={yourImg2.current} width={78} height={111} />
        </YourCard>
        <YourCard>
          <Image src={yourImg3.current} width={78} height={111} />
        </YourCard>
        <YourCard>
          <Image src={yourImg4.current} width={78} height={111} />
        </YourCard>
        <YourCard>
          <Image src={yourImg5.current} width={78} height={111} />
        </YourCard>
      </YourCards>

      <HitStandContainer>
        <HitButton onClick={handleHitClick}>
          ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Hit ☝🏾‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎{" "}
        </HitButton>
        <StandButton onClick={handleStandClick}>
          ‎ ‎ ‎ ‎ ‎ ‎ Stand ✋🏾‎ ‎ ‎ ‎ ‎ ‎{" "}
        </StandButton>
      </HitStandContainer>
      <VideoContainer>
        <iframe
          width="315"
          height="190"
          src="https://www.youtube.com/embed/UZfHXOJVAJo?autoplay=1&mute=1&loop=1&playlist=UZfHXOJVAJo"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </VideoContainer>
      <VideoContainer1>
        <iframe
          width="315"
          height="190"
          src="https://www.youtube.com/embed/UzUrnOiimuE?autoplay=1&mute=1&loop=1&playlist=UzUrnOiimuE"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </VideoContainer1>
      <VideoContainer2>
        <iframe
          width="315"
          height="190"
          src="https://www.youtube.com/embed/vnM6WJrWdkk?autoplay=1&mute=1&loop=1&playlist=vnM6WJrWdkk"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </VideoContainer2>
      <ChartPos>
        <CoverBox>
          <Chart
            key={chartVersion}
            chartType="LineChart"
            data={chartData}
            options={options}
            width={"100%"}
            height={"400px"}
            loader={<div>Loading Chart...</div>}
          />
        </CoverBox>
      </ChartPos>

      {/*<<WinRate>
        Win Rate: {winRate}%<br></br>Total Passive Collected:{" "}
        {stringNumConversion(totalPassiveCollected)}$<br></br>Gambling Net
        Profit: {stringNumConversion(moneyProfit)}$<br></br>Gambling Money Won:{" "}
        {stringNumConversion(moneyWon)}$<br></br>Gambling Money Lost:{" "}
        {stringNumConversion(moneyLost)}$
      </WinRate>>*/}
    </>
  );
};

//no comments needed for CSS
const Username = styled.h1`
  text-shadow: 
    1px 1px 0px black;, 
    -1px -1px 0px black;,
    1px -1px 0px black;,
    -1px 1px 0px black;


  position: absolute;

  left: 2%;
  top: 14%;
  width: 475px;
  height: 87px;

  color: rgb(255, 215, 0);  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
`;
const WinRate = styled.h1`
  text-shadow: 
    1px 1px 0px black;, 
    -1px -1px 0px black;,
    1px -1px 0px black;,
    -1px 1px 0px black;


  position: absolute;

  left: 2%;
  bottom: 125px;
  width: 475px;
  height: 87px;

  color: rgb(255, 215, 0);  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: gold;
  font-size: 2rem;
`;
const CoverBox = styled.div`
  position: relative;
  width: 400px; // Fixed width
  height: 400px; // Fixed height
  background-color: rgb(255, 237, 133);
  border-radius: 10px; /* Rounded corners */
  z-index: 2; /* Ensure the box is above the chart */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ChartPos = styled.div`
  position: absolute;
  top: 21%;
  left: 2%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const VideoContainer2 = styled.div`
  position: absolute;
  top: 65%;
  left: 75%;
  z-index: 1;
`;
const VideoContainer1 = styled.div`
  position: absolute;
  top: 40%;
  left: 75%;
  z-index: 1;
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 17%;
  left: 75%;
  z-index: 1;
`;
const Dealer = styled.h1`
  text-shadow: 
    1px 1px 0px black;, 
    -1px -1px 0px black;,
    1px -1px 0px black;,
    -1px 1px 0px black;


  position: absolute;

  left: 43%;
  top: 21%;
  width: 475px;
  height: 87px;

  color: rgb(255, 215, 0);  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
`;

const DealerCards = styled.div`
  position: absolute;
  top: 28%;
  left: 36%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Adds spacing between cards */
`;

const DealerCard = styled.div`
  position: relative;
`;

const YourCards = styled.div`
  position: absolute;
  top: 55%;
  left: 36%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Adds spacing between cards */
`;

const YourCard = styled.div`
  position: relative;
`;

const You = styled.h1`
  text-shadow: 
    1px 1px 0px black;, 
    -1px -1px 0px black;,
    1px -1px 0px black;,
    -1px 1px 0px black;


  position: absolute;

  left: 44%;
  bottom: 15%;
  width: 475px;
  height: 87px;

  color: rgb(255, 215, 0);  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
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

const HeadText = styled.h1`
  text-shadow: 1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black,
    -1px 1px 0px black;

  position: fixed; /* Use fixed positioning to position it relative to the viewport */
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); /* This will center the element both horizontally and vertically */

  width: 675px;
  height: 87px;

  color: rgb(255, 215, 0);
  font-size: 32px;
  font-family: "Noto Sans Georgian";
  font-weight: 700;
  text-align: center;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
`;

const BetContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
`;

const BetInput = styled.input`
  padding: 10px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  width: 150px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: rgb(255, 215, 0);
  }
`;

const BetButton = styled.button`
font-weight:700;
  padding: 10px 20px;
  font-size: 18px;
  background-color: rgb(255, 215, 0);
  color: black;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;

&:hover{
    
    background:rgb(208, 177, 0);
    transition: .5s;
`;

const HitStandContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  gap: 50px;
`;

const HitButton = styled.button`
font-weight:700;
  padding: 10px 20px;
  font-size: 18px;
  background-color: rgb(255, 215, 0);
  color: black;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;

&:hover{
    
    background:rgb(208, 177, 0);
    transition: .5s;
`;
const StandButton = styled.button`
font-weight:700;
  padding: 10px 20px;
  font-size: 18px;
  background-color: rgb(255, 215, 0);
  
  color: black;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;

&:hover{
    
    background:rgb(208, 177, 0);
    transition: .5s;
`;

export default HeroG;
