import React from "react";
import styled from "styled-components";
import { Note, transpose } from "tonal";
import Button from "../Button";
import plusImage from "../../assets/images/icons/plus.svg";
import minusImage from "../../assets/images/icons/minus.svg";

export default function Key({
  setting, setSetting, stopHandler, className,
}) {
  function keyFormat(key) {
    return `${key.split(" ")[0].replace(/[34]/, " ")} ${key.split(" ")[1]}`;
  }
  const majorMinorSwitcher = () => {
    stopHandler();
    if (setting.key.split(" ")[1] === "major") {
      setSetting((prevSetting) => {
        const newSetting = prevSetting;
        newSetting.key = prevSetting.key.replace("major", "minor");
        return { ...newSetting };
      });
      return;
    }
    setSetting((prevSetting) => {
      const newSetting = prevSetting;
      newSetting.key = prevSetting.key.replace("minor", "major");
      return { ...newSetting };
    });
  };

  const addKey = () => {
    stopHandler();
    setSetting((prevSetting) => {
      const newSetting = prevSetting;
      let newKey = Note.simplify(transpose(setting.key.split(" ")[0], "2m"));
      if (newKey === "G4") {
        newKey = "G3";
      }
      newSetting.key = `${newKey} ${setting.key.split(" ")[1]}`;
      return { ...newSetting };
    });
  };
  const reduceKey = () => {
    stopHandler();
    setSetting((prevSetting) => {
      const newSetting = prevSetting;
      let newKey = Note.simplify(transpose(setting.key.split(" ")[0], "-2m"));
      if (newKey === "F#3") {
        newKey = "F#4";
      }
      newSetting.key = `${newKey} ${setting.key.split(" ")[1]}`;
      return { ...newSetting };
    });
  };
  return (
    <KeyDiv className={className}>
      <StyledImg src={minusImage} onClick={reduceKey} />
      <KeyCenterDiv>
        <KeyText>Key</KeyText>
        <KeyContent>{keyFormat(setting.key)}</KeyContent>
        <Rwd480PlusMinusDiv>
          <Rwd480Image src={minusImage} onClick={reduceKey} />
          <Rwd480Image src={plusImage} onClick={addKey} />
        </Rwd480PlusMinusDiv>

        <StyledMajorMinorButton type="button" onClick={majorMinorSwitcher}>
          Major / Minor
        </StyledMajorMinorButton>
      </KeyCenterDiv>

      <StyledImg src={plusImage} onClick={addKey} />
    </KeyDiv>
  );
}

const KeyDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  @media screen and (max-width: 1200px) {
    margin: 0;
  }
`;

const KeyCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const KeyText = styled.p`
  color: var(--main-text-color);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  @media screen and (max-width: 1200px) {
    margin-bottom: 0;
  }
  @media screen and (max-width: 750px) {
    font-size: 16px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const KeyContent = styled.p`
  border: none;
  background: var(--main-background-color);
  color: var(--main-text-color);
  font-size: 20px;
  width: 110px;
  padding: 5px;
  text-align: center;
  @media screen and (max-width: 1200px) {
    font-size: 20px;
  }
  @media screen and (max-width: 750px) {
    font-size: 16px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
    width: 70px;
  }
`;

const StyledMajorMinorButton = styled(Button)`
  font-size: 16px;
  @media screen and (max-width: 750px) {
    font-size: 12px;
    width: 96px;
  }
  @media screen and (max-width: 480px) {
    width: 96px;
    margin-top: 3px;
  }
`;

const StyledImg = styled.img`
  width: 35px;
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    width: 26px;
  }
  @media screen and (max-width: 750px) {
    width: 22px;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const Rwd480PlusMinusDiv = styled.div`
  display: none;
  @media screen and (max-width: 480px) {
    display: flex;
  }
`;

const Rwd480Image = styled(StyledImg)`
  display: none;
  @media screen and (max-width: 480px) {
    display: flex;
    width: 18px;
    margin: 0 10px;
  }
`;
