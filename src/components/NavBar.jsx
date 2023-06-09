import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Tone from "tone";
import { auth } from "../config/firebase";
import UserContext from "../contexts/UserContext";
import AuthForm from "./AuthForm";
import Button from "./Button";
import Mask from "./Mask";
import logoImage from "../assets/images/icons/logo.svg";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [authForm, setAuthForm] = useState(false);
  return (
    <>
      <Nav>
        <StyleLink
          to="/"
          onClick={() => {
            Tone.Transport.loop = false;
            Tone.Transport.stop();
            Tone.Transport.cancel(0);
          }}
        >
          <Logo src={logoImage} alt="logo" />
          <Title>Djent</Title>
        </StyleLink>
        {user !== null ? (
          <Button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  setUser(null);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            登出
          </Button>
        ) : (
          <Button onClick={() => (authForm ? null : setAuthForm(true))}>登入</Button>
        )}
      </Nav>
      {authForm ? <StyledAuthForm setAuthForm={setAuthForm} /> : null}
      {authForm ? (
        <Mask
          onClick={() => {
            setAuthForm(false);
          }}
        />
      ) : null}
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  padding: 0 25px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background: #151515;
  position: sticky;
  z-index: 2;
  top: 0;
  @media screen and (max-width: 750px) {
    padding: 0 10px;
  }
`;

const Title = styled.p`
  color: var(--main-text-color);
  font-size: 30px;
  text-align: center;
  cursor: pointer;
`;

const StyleLink = styled(Link)`
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  transform: scale(0.65);
  filter: drop-shadow(2px 2px 5px #a000d2);
`;

const StyledAuthForm = styled(AuthForm)`
  position: fixed;
  top: 150px;
  left: calc(50% - 160px);
  z-index: 4;
  animation: fade-in 0.25s linear;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
