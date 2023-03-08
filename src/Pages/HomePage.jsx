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

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <BgDiv />
      <NavBar />
      <StyledMain>
        <BackGroundImg alt="background" src="images/pics/background.jpg" />
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
        <LogoImg alt="logo" src="images/icons/logo.svg" />
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
const IntroDiv = styled.div`
  margin-top: 100px;
  width: 950px;
`;

const LogoImg = styled.img`
  margin-top: 540px;
  filter: drop-shadow(2px 2px 5px #a000d2);
`;
const Title = styled.p`
  font-size: 55px;
  color: #eee;
`;
const SubTitle = styled.p`
  font-size: 40px;
  margin-top: 20px;
  text-align: right;
  color: #eee;
`;
const ContentDiv = styled.div`
  margin: 40px 0;
`;
const Content = styled.p`
  font-size: 30px;
  color: #ffe8bd;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
`;

const BackGroundImg = styled.img`
  position: absolute;
  top: -150px;
  border-radius: 20px;
  z-index: -1;
  transform: rotate(90deg);
  box-shadow: 5px -3px 5px 5px #111;
`;
const ButtonDiv = styled.div`
  display: flex;
  margin-top: 200px;
  justify-content: flex-end;
`;

const DemoButton = styled(ButtonOrange)`
  margin-right: 50px;
`;
