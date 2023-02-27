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
  const addBpm = () => {
    stopHandler();
    setSetting((prevSetting) => {
      let newBpm = Number(prevSetting.bpm) + 1;
      if (newBpm > 300) {
        newBpm = 300;
      }
      return { ...prevSetting, bpm: newBpm };
    });
  };
  const reduceBpm = () => {
    stopHandler();
    setSetting((prevSetting) => {
      let newBpm = Number(prevSetting.bpm) - 1;
      if (newBpm < 1) {
        newBpm = 1;
      }
      return { ...prevSetting, bpm: newBpm };
    });
  };
  return (
    <BpmDiv>
      <BpmText>BPM</BpmText>
      <BpmControlDiv>
        <PlusMinusButton type="button" onClick={reduceBpm}>
          -
        </PlusMinusButton>
        <BpmInput value={setting.bpm} onChange={bpmChangeHandler} />
        <PlusMinusButton type="button" onClick={addBpm}>
          +
        </PlusMinusButton>
      </BpmControlDiv>
    </BpmDiv>
  );
}

const PlusMinusButton = styled(Button)`
  width: 30px;
`;

const BpmDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const BpmInput = styled.input`
  border: none;
  background: var(--main-background-color);
  color: var(--main-text-color);
  font-size: 20px;
  width: 70px;
  padding: 5px;
  margin: 0 5px;
  text-align: center;
`;

const BpmControlDiv = styled.div``;

const BpmText = styled.p`
  color: var(--main-text-color);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;
