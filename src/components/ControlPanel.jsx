import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import Button from "./Button";

export default function ControlPanel({
  sequence, setSequence, setting, setSetting,
}) {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(setting.bpm);

  const bpmChangeHandler = (e) => {
    if (e.target.value > 300) {
      setBpm(300);
      e.target.value = 300;
      return;
    }
    if (e.target.value < 1) {
      setBpm(1);
      e.target.value = 1;
      return;
    }
    setBpm(e.target.value);
  };

  const playHandler = () => {
    if (JSON.stringify(sequence) === "[]") {
      return;
    }
    if (Tone.Transport.state === "started") {
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
      setPlaying(false);
      return;
    }

    sequence.forEach((item) => {
      const synth = new Tone.MonoSynth().toDestination();
      Tone.Transport.schedule(() => {
        synth.triggerAttackRelease(item.note, "16n");
      }, `${item.bar - 1}:0:${item.number}`);
    });
    Tone.Transport.bpm.value = bpm;
    setSetting((prevSetting) => ({ ...prevSetting, bpm }));
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = `${sequence[0].bar - 1}:0:0`;
    Tone.Transport.loopEnd = `${sequence[0].bar}:0:0`;
    Tone.Transport.start();
    setPlaying(true);

    console.log(sequence);
  };

  function keyFormat(key) {
    return key[0];
  }
  // const test = () => {
  //   console.log(Tone.Transport.state);
  //   console.log(Tone.context.state);
  //   console.log(setting);
  // };
  return (
    <ContainerDiv>
      <Button type="button" onClick={playHandler}>
        {playing ? "stop" : "play"}
      </Button>
      {/* <Button type="button" onClick={test}>
        state
      </Button> */}
      <BpmDiv>
        <BpmText>BPM</BpmText>
        <BpmControlDiv>
          {/* <Button type="button">-</Button> */}
          <BpmInput defaultValue={bpm} onChange={bpmChangeHandler} />
          {/* <Button type="button">+</Button> */}
        </BpmControlDiv>
      </BpmDiv>
      <KeyDiv>
        <KeyText>Key</KeyText>
        <KeyContext>{keyFormat(setting.key)}</KeyContext>
      </KeyDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
`;

const BpmDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const BpmInput = styled.input`
  border: none;
  background: #1e1e1e;
  color: #eee;
  font-size: 20px;
  width: 70px;
  padding: 5px;
  text-align: center;
`;

const BpmControlDiv = styled.div``;

const BpmText = styled.p`
  color: #eee;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const KeyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const KeyText = styled.p`
  color: #eee;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const KeyContext = styled.p`
  border: none;
  background: #1e1e1e;
  color: #eee;
  font-size: 20px;
  width: 50px;
  padding: 5px;
  text-align: center;
`;
