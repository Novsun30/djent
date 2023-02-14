import React from "react";
import styled from "styled-components";
import BottomPanel from "./BottomPanel";
import NoteButton from "./NoteButton";
import PlayingBar from "./PlayingBar";

export default function Triangle({
  setting,
  triangleSequence,
  setTriangleSequence,
  totalBars,
  setTotalBars,
  playing,
  setPlaying,
  noteValue,
  triangleDegrees,
}) {
  let i = 1;
  const bar = triangleDegrees.map((degree) => {
    if (i === 7) {
      i += 1;
      return (
        <React.Fragment key={`${setting.track}-1-${degree}`}>
          <NoteButton
            degree={degree}
            currentKey={setting.key}
            totalBars={totalBars}
            setTotalBars={setTotalBars}
            setSequence={setTriangleSequence}
            sequence={triangleSequence}
            playing={playing}
            setPlaying={setPlaying}
            noteValue={noteValue}
            track="triangle"
          />
          <PlayingBar totalBars={totalBars} />
        </React.Fragment>
      );
    }
    i += 1;
    return (
      <NoteButton
        key={`${setting.track}-1-${degree}`}
        degree={degree}
        currentKey={setting.key}
        totalBars={totalBars}
        setTotalBars={setTotalBars}
        setSequence={setTriangleSequence}
        sequence={triangleSequence}
        playing={playing}
        setPlaying={setPlaying}
        noteValue={noteValue}
        track="triangle"
      />
    );
  });
  return (
    <>
      <BarsDiv className="synth">{bar}</BarsDiv>
      <BottomPanel setting={setting} degrees={triangleDegrees} />
    </>
  );
}
const BarsDiv = styled.div`
  display: flex;
  margin-bottom: 150px;
`;
