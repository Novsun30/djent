import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import styled, { createGlobalStyle } from "styled-components";
import AuthForm from "../components/AuthForm";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import { auth } from "../config/firebase";
import UserContext from "../contexts/UserContext";
import ButtonOrange from "../components/ButtonOrange";
import backGroundImage from "../assets/images/pics/background.jpg";

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <BgDiv />
      <NavBar />
      <StyledMain>
        <BackGroundImg alt="background" src={backGroundImage} />
        <IntroDiv>
          <Title>歡迎來到Djent</Title>
          <SubTitle>創造自己的音樂</SubTitle>
          <ContentDiv>
            <Content>Djent 是一個編曲 Web App，幫助您創造樂曲</Content>
            <Content>無須深入了解樂理，也能輕鬆上手。</Content>
          </ContentDiv>
          <ButtonDiv>
            <StyledLink to="/demo">
              <DemoButton>範例</DemoButton>
            </StyledLink>
            <StyledLink to="/compose">
              <ButtonOrange>點此開始</ButtonOrange>
            </StyledLink>
          </ButtonDiv>
        </IntroDiv>
      </StyledMain>
    </>
  );
}
const BgDiv = styled.div`
  position: absolute;
  top: 0;
  border-radius: 20px;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(30, 30, 30, 1) 45%,
    rgba(17, 11, 6, 1) 84%,
    rgba(125, 66, 17, 1) 100%
  );
`;

const BackGroundImg = styled.img`
  position: absolute;
  top: -150px;
  border-radius: 20px;
  z-index: -1;
  transform: rotate(90deg);
  box-shadow: 5px -3px 5px 5px #111;
  @media screen and (max-width: 1200px) {
    width: 90%;
    min-width: 750px;
    height: 650px;
    transform: rotate(180deg);
    top: 100px;
  }
  @media screen and (max-width: 750px) {
    min-width: 480px;
    height: 480px;
  }
  @media screen and (max-width: 480px) {
    width: 95%;
    min-width: 360px;
    height: 400px;
  }
`;

const IntroDiv = styled.div`
  margin-top: 100px;
  width: 950px;
  @media screen and (max-width: 1200px) {
    width: 700px;
  }
  @media screen and (max-width: 750px) {
    width: 455px;
  }
  @media screen and (max-width: 480px) {
    width: 340px;
  }
`;

const Title = styled.p`
  font-size: 55px;
  color: #eee;
  @media screen and (max-width: 750px) {
    font-size: 40px;
  }
  @media screen and (max-width: 480px) {
    font-size: 24px;
  }
`;
const SubTitle = styled.p`
  font-size: 40px;
  margin-top: 20px;
  text-align: right;
  color: #eee;
  @media screen and (max-width: 750px) {
    font-size: 28px;
  }
  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;
const ContentDiv = styled.div`
  margin: 40px 0;
  @media screen and (max-width: 1200px) {
    margin-top: 100px;
  }
  @media screen and (max-width: 1200px) {
    margin-top: 50px;
  }
`;
const Content = styled.p`
  font-size: 30px;
  color: #ffe8bd;
  @media screen and (max-width: 750px) {
    font-size: 22px;
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const StyledMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
`;

const ButtonDiv = styled.div`
  display: flex;
  margin-top: 200px;
  justify-content: flex-end;
  @media screen and (max-width: 750px) {
    margin-top: 100px;
  }
`;

const DemoButton = styled(ButtonOrange)`
  margin-right: 50px;
`;
