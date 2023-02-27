import React from "react";
import styled from "styled-components";
import { Note, transpose } from "tonal";
import Button from "../Button";

export default function Key({ setting, setSetting, stopHandler }) {
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
    <KeyDiv>
      <PlusMinusButton type="button" onClick={reduceKey}>
        -
      </PlusMinusButton>
      <KeyCenterDiv>
        <KeyText>Key</KeyText>
        {" "}
        <KeyContent>{keyFormat(setting.key)}</KeyContent>
        <StyledMajorMinorButton type="button" onClick={majorMinorSwitcher}>
          Major / Minor
        </StyledMajorMinorButton>
      </KeyCenterDiv>

      <PlusMinusButton type="button" onClick={addKey}>
        +
      </PlusMinusButton>
    </KeyDiv>
  );
}

const KeyDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const KeyCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const KeyText = styled.p`
  color: var(--main-text-color);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const KeyContent = styled.p`
  border: none;
  background: var(--main-background-color);
  color: var(--main-text-color);
  font-size: 20px;
  width: 100px;
  padding: 5px;
  text-align: center;
`;

const StyledMajorMinorButton = styled(Button)`
  font-size: 16px;
`;

const PlusMinusButton = styled(Button)`
  width: 30px;
`;
