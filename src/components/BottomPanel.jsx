import React, { useContext } from "react";
import { Scale, Note } from "tonal";
import styled from "styled-components";
import SoundContext from "../contexts/SoundContext";

export default function BottomPanel({ setting, degrees, track }) {
  const key = Scale.degrees(setting.key);
  const soundContext = useContext(SoundContext);
  const rhythmImages = {
    kick: "/images/drum/kick.svg",
    snare: "/images/drum/snare.svg",
    hiTom: "/images/drum/hiTom.svg",
    midTom: "/images/drum/midTom.svg",
    floorTom: "/images/drum/floorTom.svg",
    closedHiHat: "/images/drum/closedHiHat.svg",
    openHiHat: "/images/drum/openHiHat.svg",
    crash: "/images/drum/crash.svg",
    ride: "/images/drum/ride.svg",
    sideStick: "/images/drum/sideStick.svg",
  };
  let targetDegree = degrees.default;
  if (setting.track[track].bass) {
    targetDegree = degrees.bass;
  }
  if (setting.track[track].lower) {
    targetDegree = degrees.lower;
  }
  if (track === "Drum") {
    targetDegree = degrees.rhythmSet;
  }
  const soundDemo = targetDegree.map((degree, i) => {
    const note = Note.simplify(key(degree));
    const playSound = () => {
      if (track === "Drum") {
        const sound = soundContext[track][degree];
        sound.start(0);
        return;
      }
      const sound = soundContext[track];
      sound.triggerAttackRelease(note, "8n");
    };
    if (track === "Drum") {
      if (i === 4) {
        return (
          <React.Fragment key={degree}>
            <SoundDiv onClick={playSound}>
              <DrumImage src={rhythmImages[degree]} alt={degree} />
            </SoundDiv>
            <EmptyDiv />
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={degree}>
          <SoundDiv onClick={playSound}>
            <DrumImage src={rhythmImages[degree]} alt={degree} />
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
  z-index: 1;
  height: 125px;
  width: 100%;
  background: #222;
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
  background: #1a1a1a;
  outline: 1px solid #d70dff;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
  &:hover {
    background: #222;
  }
`;

const SoundText = styled.p`
  font-size: 22px;
  color: var(--main-text-color);
`;

const EmptyDiv = styled.div`
  height: 100%;
  width: 40px;
`;

const DrumImage = styled.img`
  width: 40px;
  height: 40px;
`;
