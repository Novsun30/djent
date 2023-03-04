import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../config/firebase";
import UserContext from "../contexts/UserContext";
import AuthForm from "./AuthForm";
import Button from "./Button";
import Mask from "./Mask";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const [authForm, setAuthForm] = useState(false);
  return (
    <>
      <Nav>
        <StyleLink to="/">
          <Logo src="images/icons/logo.svg" alt="logo" />
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
      {authForm ? <StyledAuthForm /> : null}
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
`;

const StyledAuthForm = styled(AuthForm)`
  position: fixed;
  top: 250px;
  left: calc(50% - 160px);
  z-index: 4;
`;
