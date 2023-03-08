import React from "react";
import styled from "styled-components";
import Button from "../Button";

export default function BPM({ setting, setSetting, stopHandler }) {
  const bpmChangeHandler = (e) => {
    stopHandler();
    if (e.target.value > 300) {
      setSetting({ ...setting, bpm: 300 });
      return;
    }
    if (e.target.value < 1) {
      setSetting({ ...setting, bpm: 1 });
      return;
    }
    setSetting({ ...setting, bpm: e.target.value });
  };

  return (
    <BpmDiv>
      <BpmText>BPM：</BpmText>
      <BpmInput value={setting.bpm} onChange={bpmChangeHandler} />
    </BpmDiv>
  );
}

const BpmDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const BpmInput = styled.input`
  border: none;
  background: var(--main-background-color);
  color: var(--main-text-color);
  font-size: 20px;
  width: 50px;
  padding: 5px;
  text-align: center;
  cursor: pointer;
`;

const BpmText = styled.p`
  color: var(--main-text-color);
  font-size: 18px;
  font-weight: 600;
`;
