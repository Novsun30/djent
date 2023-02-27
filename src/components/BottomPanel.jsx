import React, { useContext } from "react";
import { Scale, Note } from "tonal";
import styled from "styled-components";
import SoundContext from "../contexts/SoundContext";

export default function BottomPanel({ setting, degrees, track }) {
  const key = Scale.degrees(setting.key);
  const soundContext = useContext(SoundContext);
  const rhythmImages = {
    kick: "/images/kick.svg",
    snare: "/images/snare.svg",
    closedHiHat: "/images/closedHiHat.svg",
  };
  let targetDegree = degrees.default;
  if (setting.track[track].bass) {
    targetDegree = degrees.bass;
  }
  if (setting.track[track].lower) {
    targetDegree = degrees.lower;
  }
  if (track === "drum") {
    targetDegree = degrees;
  }
  const soundDemo = targetDegree.map((degree, i) => {
    const note = Note.simplify(key(degree));
    const playSound = () => {
      if (track === "drum") {
        const sound = soundContext[track][degree];
        sound.start(0);
        return;
      }
      const sound = soundContext[track];
      sound.triggerAttackRelease(note, "8n");
    };
    if (track === "drum") {
      if (i === 1) {
        return (
          <React.Fragment key={degree}>
            <SoundDiv onClick={playSound}>
              <img src={rhythmImages[degree]} alt={degree} />
            </SoundDiv>
            <EmptyDiv />
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={degree}>
          <SoundDiv onClick={playSound}>
            <img src={rhythmImages[degree]} alt={degree} />
          </SoundDiv>
        </React.Fragment>
      );
    }
    if (i === 6) {
      return (
        <React.Fragment key={degree}>
          <SoundDiv onClick={playSound}>
            <SoundText>{note}</SoundText>
          </SoundDiv>
          <EmptyDiv />
        </React.Fragment>
      );
    }

    return (
      <SoundDiv key={degree} onClick={playSound}>
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
