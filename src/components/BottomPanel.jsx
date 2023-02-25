import React, { useContext, useEffect, useRef } from "react";
import { Scale, Note } from "tonal";
import styled from "styled-components";
import * as Tone from "tone";
import SoundContext from "../contexts/SoundContext";

export default function BottomPanel({ setting, degrees, track }) {
  const key = Scale.degrees(setting.key);
  const soundContext = useContext(SoundContext);
  const soundDemo = degrees.map((degree, i) => {
    const note = Note.simplify(key(degree));
    const playSound = () => {
      const sound = soundContext[track];
      sound.volume.value = -4;
      sound.triggerAttackRelease(note, "8n");
    };
    if (i === 6) {
      return (
        <React.Fragment key={note}>
          <SoundDiv onClick={playSound}>
            <SoundText>{note}</SoundText>
          </SoundDiv>
          <EmptyDiv />
        </React.Fragment>
      );
    }

    return (
      <SoundDiv key={note} onClick={playSound}>
        <SoundText>{note}</SoundText>
      </SoundDiv>
    );
  });
  return (
    <BottomDiv>
      <SoundDemoDiv>{soundDemo}</SoundDemoDiv>
    </BottomDiv>
  );
}

const BottomDiv = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  height: 125px;
  width: 100%;
  background: #333;
  justify-content: center;
`;

const SoundDemoDiv = styled.div`
  display: flex;
`;

const SoundDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
  background: #444;
  outline: 1px solid #999;
  cursor: pointer;
`;

const SoundText = styled.p`
  font-size: 22px;
  color: var(--main-text-color);
`;

const EmptyDiv = styled.div`
  height: 100%;
  width: 40px;
`;
