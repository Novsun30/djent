import React from "react";
import styled from "styled-components";
import plusImage from "../../assets/images/icons/plus.svg";
import minusImage from "../../assets/images/icons/minus.svg";

export default function Bar({
  degrees,
  totalBars,
  setTotalBars,
  setSequence,
  stopHandler,
  setting,
  setSetting,
}) {
  const addBar = () => {
    stopHandler();
    let existTrack = false;
    Object.keys(setting.track).forEach((track) => {
      if (setting.track[track].add) {
        existTrack = true;
      }
    });
    if (existTrack === false) {
      return;
    }
    setTotalBars((prevTotalBars) => [...prevTotalBars, prevTotalBars.length + 1]);
    setSetting({ ...setting, bar: [...totalBars, totalBars.length + 1] });
  };

  const reduceBar = () => {
    stopHandler();
    if (totalBars.length === 1) {
      return;
    }

    setSequence((prevSequence) => {
      const targetBar = totalBars[totalBars.length - 1];
      let result = { ...prevSequence };
      const allTracks = Object.keys(prevSequence);
      allTracks.forEach((track) => {
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
        targetDegree.forEach((element) => {
          const newNotes = prevSequence[track][element].filter(
            (el) => !(el.bar === targetBar || (el.bar === targetBar - 1 && el.overBar === true)),
          );
          result = { ...result, [track]: { ...result[track], [element]: newNotes } };
        });
      });
      return result;
    });
    setTotalBars((prevTotalBars) => {
      prevTotalBars.pop();
      return [...prevTotalBars];
    });
    const newTotalBars = [...totalBars];
    newTotalBars.pop();
    setSetting({ ...setting, bar: newTotalBars });
  };
  return (
    <BarDiv>
      <StyledImg src={minusImage} onClick={reduceBar} />
      <BarInfoDiv>
        <BarTitle>總小節數</BarTitle>
        <BarContent>{totalBars.length}</BarContent>
      </BarInfoDiv>
      <StyledImg src={plusImage} onClick={addBar} />
    </BarDiv>
  );
}
const BarDiv = styled.div`
  display: flex;
  align-items: center;
`;

const BarTitle = styled.p`
  font-size: 18px;
  color: #eee;
  @media screen and (max-width: 750px) {
    font-size: 16px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;
const BarContent = styled.p`
  font-weight: 700;
  font-size: 18px;
  color: #eee;
  @media screen and (max-width: 750px) {
    font-size: 16px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const BarInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  @media screen and (max-width: 480px) {
    margin: 0 3px;
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
    width: 18px;
  }
`;
