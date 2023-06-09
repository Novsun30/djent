import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export default function BPM({ setting, setSetting, stopHandler }) {
  const bpmRef = useRef(null);
  const bpmChangeHandler = (e) => {
    e.target.value = e.target.value.replace(/\D/, "");
  };

  const setNewBpm = (e) => {
    stopHandler();
    if (e.target.value > 300) {
      e.target.value = 300;
      setSetting({ ...setting, bpm: 300 });
      return;
    }
    if (e.target.value < 1) {
      e.target.value = 1;
      setSetting({ ...setting, bpm: 1 });
      return;
    }
    setSetting({ ...setting, bpm: e.target.value });
  };

  useEffect(() => {
    bpmRef.current.value = setting.bpm;
  }, [setting.bpm]);

  return (
    <BpmDiv>
      <BpmText>BPM：</BpmText>
      <BpmInput
        ref={bpmRef}
        defaultValue={setting.bpm}
        onChange={bpmChangeHandler}
        onBlur={setNewBpm}
      />
    </BpmDiv>
  );
}

const BpmDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  @media screen and (max-width: 480px) {
    margin: 3px;
  }
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
  @media screen and (max-width: 750px) {
    font-size: 18px;
  }
  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;

const BpmText = styled.p`
  color: var(--main-text-color);
  font-size: 18px;
  font-weight: 600;
  @media screen and (max-width: 750px) {
    font-size: 18px;
  }
  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;
