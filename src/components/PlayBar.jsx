import React from "react";
import styled from "styled-components";

export default function PlayBar({ totalBars, playBarRef }) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const playingBar = totalBars.map((bar) => {
    const indicators = numbers.map((number) => {
      if (bar === 1 && number === 0) {
        return (
          <React.Fragment key={`${bar}-${number}`}>
            <BarTitle>{`${bar}-${number / 4 + 1}`}</BarTitle>
            <PlayingBarDiv>
              <Indicator />
              <IndicatorBar ref={playBarRef} />
            </PlayingBarDiv>
          </React.Fragment>
        );
      }
      if (number % 4 === 0) {
        return (
          <React.Fragment key={`${bar}-${number}`}>
            <BarTitle>{`${bar}-${number / 4 + 1}`}</BarTitle>
            <PlayingBarDiv>
              <Indicator />
            </PlayingBarDiv>
          </React.Fragment>
        );
      }
      return (
        <PlayingBarDiv key={`${bar}-${number}`}>
          <Indicator />
        </PlayingBarDiv>
      );
    });
    return indicators;
  });
  return <Div>{playingBar}</Div>;
}
const PlayingBarDiv = styled.div`
  position: relative;
`;

const Indicator = styled.button`
  width: 30px;
  height: 30px;
  margin: 5px;
  background: var(--play-indicator-color);
  border-radius: 5px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const BarTitle = styled.p`
  height: 20px;
  color: #fff;
  text-align: center;
  font-size: 18px;
`;

const IndicatorBar = styled.div`
  position: absolute;
  z-index: -1;
  height: 40px;
  width: 840px;
  background: var(--play-indicator-color);
  top: 0px;
  left: -400px;
  border-radius: 8px;
`;
