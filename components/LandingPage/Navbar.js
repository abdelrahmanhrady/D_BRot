import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  //connect wallet

  return (
    
    <>
        
      <Box>
        <ImageWrapper>
          <Image src="/BRlogo.png" width={106} height={76} />
        </ImageWrapper>
 

        
      </Box>
    </>
  );
};



const Box = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 99px;
  background: linear-gradient(to bottom,rgb(51, 0, 0), rgb(40, 0, 0));
  border-radius: 0px;
`;

const ImageWrapper = styled.div`

  position: absolute;
  left: 0px;
  top: 0px;
  width: 136px;
  height: 76px;
  border-radius: 0px;
  padding: 10px 30px;
`;

const BoxSignUp = styled.div`
font-family: 'Noto Sans Georgian', sans-serif;    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 7px 28px;
    font-size: 18px;
    background: rgb(255, 215, 0);
    position: absolute; 
    cursor: pointer;
    left: 90%;
    top: 24px;
    font-weight: bold;

    border: 2px solid rgb(0, 0, 0);
    border-radius: 15px;

    &:hover{
    
    border:2px solid rgb(0, 0, 0);
    background:rgb(208, 177, 0);
    transition: .5s;
    }
`;

const BoxLogIn = styled.div`
font-family: 'Noto Sans Georgian', sans-serif;
    

    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 7px 30px;
    font-size: 18px;
    background: rgb(255, 215, 0 );
    position: absolute; 
    cursor: pointer;
    left: 80%;
    top: 24px;
    font-weight: bold;

    border: 2px solid rgb(0, 0, 0);
    border-radius: 15px;

    &:hover{
    
    border:2px solid rgb(0, 0, 0);
    background: rgb(208, 177, 0);
    transition: .5s;
    }
`;



export default Navbar;
