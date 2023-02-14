import React from "react";
import styled from "styled-components";

export default function PlayingBar({ totalBars }) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const playingBar = totalBars.map((bar) => {
    const indicators = numbers.map((number) => {
      if (number % 4 === 0) {
        return (
          <React.Fragment key={`indicator-${bar}-${number}`}>
            <BarTitle>{`${bar}-${number / 4 + 1}`}</BarTitle>
            <PlayingBarDiv>
              <Indicator className={`indicator-${bar}-${number}`} />
              <Input type="checkbox" />
            </PlayingBarDiv>
          </React.Fragment>
        );
      }
      return (
        <PlayingBarDiv key={`indicator-${bar}-${number}`}>
          <Indicator className={`indicator-${bar}-${number}`} />
          <Input type="checkbox" />
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

const Input = styled.input`
  position: absolute;
  top: 35%;
  left: 35%;
  z-index: -1;
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
