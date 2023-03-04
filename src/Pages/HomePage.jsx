import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import { auth } from "../config/firebase";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <StyledMain>
        <IntroDiv>
          <Title>創造自己的音樂</Title>
          <Content>
            Djent 是一個編曲 Web App，幫助您創造樂曲，無須深入了解樂理，也能輕鬆上手。
          </Content>
          <Link to="/compose">
            <Button>點此開始</Button>
          </Link>
        </IntroDiv>
      </StyledMain>
    </>
  );
}

const IntroDiv = styled.div`
  margin-top: 40px;
  width: 660px;
`;
const Title = styled.p`
  font-size: 45px;
  color: #eee;
`;
const Content = styled.p`
  font-size: 30px;
  color: #eee;
  margin: 20px 0;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
