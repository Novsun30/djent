import React, { useContext } from "react";
import { Scale, Note } from "tonal";
import styled from "styled-components";
import SoundContext from "../contexts/SoundContext";
import kickImage from "../assets/images/drum/kick.svg";
import snareImage from "../assets/images/drum/snare.svg";
import hiTomImage from "../assets/images/drum/hiTom.svg";
import midTomImage from "../assets/images/drum/midTom.svg";
import floorTomImage from "../assets/images/drum/floorTom.svg";
import closedHiHatImage from "../assets/images/drum/closedHiHat.svg";
import openHiHatImage from "../assets/images/drum/openHiHat.svg";
import crashImage from "../assets/images/drum/crash.svg";
import rideImage from "../assets/images/drum/ride.svg";
import sideStickImage from "../assets/images/drum/sideStick.svg";

export default function BottomPanel({
  setting, degrees, track, firstPartNote,
}) {
  const key = Scale.degrees(setting.key);
  const soundContext = useContext(SoundContext);
  const rhythmImages = {
    kick: kickImage,
    snare: snareImage,
    hiTom: hiTomImage,
    midTom: midTomImage,
    floorTom: floorTomImage,
    closedHiHat: closedHiHatImage,
    openHiHat: openHiHatImage,
    crash: crashImage,
    ride: rideImage,
    sideStick: sideStickImage,
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
      if (i < 4) {
        return (
          <React.Fragment key={degree}>
            <SoundDiv onClick={playSound}>
              <DrumImage src={rhythmImages[degree]} alt={degree} />
            </SoundDiv>
            {firstPartNote ? (
              <FirstPartSoundDiv onClick={playSound}>
                <DrumImage src={rhythmImages[degree]} alt={degree} />
              </FirstPartSoundDiv>
            ) : null}
          </React.Fragment>
        );
      }
      if (i === 4) {
        return (
          <React.Fragment key={degree}>
            <SoundDiv onClick={playSound}>
              <DrumImage src={rhythmImages[degree]} alt={degree} />
            </SoundDiv>
            {firstPartNote ? (
              <>
                <FirstPartSoundDiv onClick={playSound}>
                  <DrumImage src={rhythmImages[degree]} alt={degree} />
                </FirstPartSoundDiv>
                <Rwd750EmptyDiv />
              </>
            ) : null}
            <EmptyDiv />
          </React.Fragment>
        );
      }
      if (i === 5) {
        return (
          <React.Fragment key={degree}>
            <SoundDiv onClick={playSound}>
              <DrumImage src={rhythmImages[degree]} alt={degree} />
            </SoundDiv>
            {firstPartNote ? null : (
              <>
                <Rwd750EmptyDiv />
                <SecondPartSoundDiv onClick={playSound}>
                  <DrumImage src={rhythmImages[degree]} alt={degree} />
                </SecondPartSoundDiv>
              </>
            )}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={degree}>
          <SoundDiv onClick={playSound}>
            <DrumImage src={rhythmImages[degree]} alt={degree} />
          </SoundDiv>
          {firstPartNote ? null : (
            <SecondPartSoundDiv onClick={playSound}>
              <DrumImage src={rhythmImages[degree]} alt={degree} />
            </SecondPartSoundDiv>
          )}
        </React.Fragment>
      );
    }

    if (i < 6) {
      return (
        <React.Fragment key={degree}>
          <SoundDiv onClick={playSound}>
            <SoundText>{note}</SoundText>
          </SoundDiv>
          {firstPartNote ? (
            <FirstPartSoundDiv onClick={playSound}>
              <SoundText>{note}</SoundText>
            </FirstPartSoundDiv>
          ) : null}
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
          {firstPartNote ? (
            <>
              <FirstPartSoundDiv onClick={playSound}>
                <SoundText>{note}</SoundText>
              </FirstPartSoundDiv>
              <Rwd750EmptyDiv />
            </>
          ) : null}
        </React.Fragment>
      );
    }
    if (i === 7) {
      return (
        <React.Fragment key={degree}>
          <SoundDiv onClick={playSound}>
            <SoundText>{note}</SoundText>
          </SoundDiv>
          {firstPartNote ? null : (
            <>
              <Rwd750EmptyDiv />
              <SecondPartSoundDiv onClick={playSound}>
                <SoundText>{note}</SoundText>
              </SecondPartSoundDiv>
            </>
          )}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={degree}>
        <SoundDiv onClick={playSound}>
          <SoundText>{note}</SoundText>
        </SoundDiv>
        {firstPartNote ? null : (
          <SecondPartSoundDiv onClick={playSound}>
            <SoundText>{note}</SoundText>
          </SecondPartSoundDiv>
        )}
      </React.Fragment>
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
  height: 100px;
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
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const FirstPartSoundDiv = styled(SoundDiv)`
  display: none;
  @media screen and (max-width: 750px) {
    display: flex;
  }
  @media screen and (max-width: 480px) {
    width: 42px;
  }
`;
const SecondPartSoundDiv = styled(FirstPartSoundDiv)``;

const SoundText = styled.p`
  font-size: 22px;
  color: var(--main-text-color);
`;

const EmptyDiv = styled.div`
  height: 100%;
  width: 40px;
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const Rwd750EmptyDiv = styled(EmptyDiv)`
  display: none;
  @media screen and (max-width: 750px) {
    display: block;
  }
`;

const DrumImage = styled.img`
  width: 40px;
  height: 40px;
`;
