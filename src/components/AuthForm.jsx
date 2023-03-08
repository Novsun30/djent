import React, { useState } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../config/firebase";
import Button from "./Button";
import ButtonOrange from "./ButtonOrange";

export default function AuthForm({ className, setAuthForm }) {
  const [authSwitch, setAuthSwitch] = useState("logIn");
  const [logInData, setLogInData] = useState({
    Email: "",
    Password: "",
  });
  const [SignUpData, setSignUpdata] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const logInContent = Object.keys(logInData).map((field) => (
    <FormFieldDiv key={field}>
      <FormLabel>{field}</FormLabel>
      <SubmitInput
        type="text"
        value={logInData[field]}
        onChange={(e) => {
          setLogInData({
            ...logInData,
            [field]: e.target.value,
          });
        }}
      />
    </FormFieldDiv>
  ));
  const signUpContent = Object.keys(SignUpData).map((field) => (
    <FormFieldDiv key={field}>
      <FormLabel>{field}</FormLabel>
      <SubmitInput
        type="text"
        value={SignUpData[field]}
        onChange={(e) => {
          setSignUpdata({
            ...SignUpData,
            [field]: e.target.value,
          });
        }}
      />
    </FormFieldDiv>
  ));
  const logIn = async () => {
    signInWithEmailAndPassword(auth, logInData.Email, logInData.Password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        setAuthForm(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const signUp = async () => {
    createUserWithEmailAndPassword(auth, SignUpData.Email, SignUpData.Password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        try {
          const docRef = setDoc(doc(db, "user", auth.currentUser.uid), {
            // need await
            id: user.uid,
            name: SignUpData.Name,
            email: SignUpData.Email,
            password: SignUpData.Password,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <AuthFormDiv className={className}>
      {authSwitch === "logIn" ? (
        <Form>
          <FormTitle>登入</FormTitle>
          <FormContent>{logInContent}</FormContent>
          <StyledButton onClick={logIn}>登入</StyledButton>
          <FormLabel
            onClick={() => {
              setAuthSwitch("signUp");
            }}
          >
            沒有帳號？ 點擊這裡註冊
          </FormLabel>
        </Form>
      ) : null}
      {authSwitch === "signUp" ? (
        <Form>
          <FormTitle>註冊</FormTitle>
          <FormContent>{signUpContent}</FormContent>
          <StyledButton onClick={signUp}>註冊</StyledButton>
          <FormLabel
            onClick={() => {
              setAuthSwitch("logIn");
            }}
          >
            已有帳號？ 點擊這裡登入
          </FormLabel>
        </Form>
      ) : null}
    </AuthFormDiv>
  );
}

const AuthFormDiv = styled.div``;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  width: 320px;
  background: #111;
  height: 450px;
  border-radius: 8px;
`;
const FormTitle = styled.p`
  font-size: 24px;
  color: #eee;
`;
const FormContent = styled.div``;
const FormFieldDiv = styled.div`
  margin: 15px 0;
`;
const FormLabel = styled.label`
  font-size: 18px;
  display: block;
  color: #eee;
  margin-bottom: 3px;
  cursor: pointer;
`;
const SubmitInput = styled.input`
  padding: 5px;
  border-radius: 8px;
  font-size: 16px;
`;

const StyledButton = styled(ButtonOrange)`
  margin: 20px 0;
`;
