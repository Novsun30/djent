import React, { useRef, useState } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../config/firebase";
import eyeImage from "../assets/images/icons/eye.png";
import ButtonOrange from "./ButtonOrange";
import Warning from "./Warning";
import errorMessageRegex from "../utils/errorMessageRegex";

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
  const passwordRef = useRef(null);
  const logInMessageRef = useRef(null);
  const logInWarningDivRef = useRef(null);
  const signUpMessageRef = useRef(null);
  const signUpWarningDivRef = useRef(null);
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
        logInWarningDivRef.current.style.display = "flex";
        logInMessageRef.current.textContent = `${errorMessageRegex(errorMessage)}`;
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

        signUpWarningDivRef.current.style.display = "flex";
        signUpMessageRef.current.textContent = `${
          errorMessageRegex(errorMessage) === "Weak password"
            ? "Password should be at least 6 characters"
            : errorMessageRegex(errorMessage)
        }`;
      });
  };
  const togglePasswordDisplay = () => {
    if (passwordRef.current.type === "text") {
      passwordRef.current.type = "password";
      passwordRef.current.style.fontFamily = "sans-serif";
      passwordRef.current.style.fontSize = "28px";

      return;
    }
    passwordRef.current.type = "text";
    passwordRef.current.style.fontFamily = "Noto Sans TC";
    passwordRef.current.style.fontSize = "16px";
  };

  const logInContent = Object.keys(logInData).map((field) => (
    <FormFieldDiv key={field}>
      <FormLabel>{field}</FormLabel>
      {field === "Password" ? (
        <PasswordInputDiv>
          <PasswordInput
            ref={passwordRef}
            type="password"
            value={logInData[field]}
            onChange={(e) => {
              setLogInData({
                ...logInData,
                [field]: e.target.value,
              });
            }}
          />
          <HidePasswordButton src={eyeImage} onClick={togglePasswordDisplay} />
        </PasswordInputDiv>
      ) : (
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
      )}
    </FormFieldDiv>
  ));
  const signUpContent = Object.keys(SignUpData).map((field) => (
    <FormFieldDiv key={field}>
      <FormLabel>{field}</FormLabel>
      {field === "Password" ? (
        <PasswordInputDiv>
          <PasswordInput
            ref={passwordRef}
            type="password"
            value={SignUpData[field]}
            onChange={(e) => {
              setSignUpdata({
                ...SignUpData,
                [field]: e.target.value,
              });
            }}
          />
          <HidePasswordButton src={eyeImage} onClick={togglePasswordDisplay} />
        </PasswordInputDiv>
      ) : (
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
      )}
    </FormFieldDiv>
  ));

  return (
    <AuthFormDiv className={className}>
      {authSwitch === "logIn" ? (
        <Form>
          <FormTitle>登入</FormTitle>
          <FormContent>{logInContent}</FormContent>
          <WarningDiv warningDivRef={logInWarningDivRef} messageRef={logInMessageRef} />
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
          <WarningDiv warningDivRef={signUpWarningDivRef} messageRef={signUpMessageRef} />
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
  height: 465px;
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
  width: 242px;
  height: 38px;
`;

const StyledButton = styled(ButtonOrange)`
  margin: 20px 0;
`;

const PasswordInputDiv = styled.div`
  position: relative;
`;

const PasswordInput = styled(SubmitInput)`
  font-family: sans-serif;
  font-size: 28px;
`;
const HidePasswordButton = styled.img`
  position: absolute;
  top: 7px;
  right: 4px;
  cursor: pointer;
  width: 24px;
`;

const WarningDiv = styled(Warning)`
  display: none;
`;
