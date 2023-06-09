import React from "react";
import styled from "styled-components";

export default function PlayBar({ totalBars, firstPartNote, setting }) {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  // useEffect(() => {
  //   console.log(setting);
  // }, [setting]);

  const playingBar = totalBars.map((bar) => {
    const indicators = numbers.map((number) => {
      if (bar === 1 && number === 0) {
        return (
          <React.Fragment key={`${bar}-${number}`}>
            <BarTitle>{`${bar}-${number / 4 + 1}`}</BarTitle>
            <PlayingBarDiv>
              <Indicator />
              <IndicatorBar className="play-bar" />
              {setting !== undefined ? (
                <>
                  {firstPartNote ? <DrumFirstPartBar className="play-bar" /> : null}
                  {firstPartNote ? null : <DrumSecondPartBar className="play-bar" />}
                </>
              ) : (
                <>
                  {firstPartNote ? <FirstPartIndicatorBar className="play-bar" /> : null}
                  {firstPartNote ? null : <SecondPartIndicatorBar className="play-bar" />}
                </>
              )}
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
  justify-content: center;
  align-items: center;
  font-size: 18px;
  display: flex;
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
  transition: transform 0.1s linear;
  @media screen and (max-width: 1200px) {
    width: 740px;
    left: -350px;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const FirstPartIndicatorBar = styled(IndicatorBar)`
  @media screen and (max-width: 750px) {
    display: block;
    width: 400px;
    left: -350px;
  }
  @media screen and (max-width: 480px) {
    width: 340px;
    left: -300px;
  }
`;
const SecondPartIndicatorBar = styled(IndicatorBar)`
  @media screen and (max-width: 750px) {
    display: block;
    width: 400px;
    left: 0;
  }
  @media screen and (max-width: 480px) {
    width: 340px;
  }
`;

const DrumFirstPartBar = styled(FirstPartIndicatorBar)`
  width: 310px;
  left: -260px;
  @media screen and (max-width: 480px) {
    width: 250px;
    left: -210px;
  }
`;
const DrumSecondPartBar = styled(SecondPartIndicatorBar)`
  width: 310px;
  left: -10px;
  @media screen and (max-width: 480px) {
    width: 250px;
    left: 0px;
  }
`;
