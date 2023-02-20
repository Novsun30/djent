import React from "react";
import styled from "styled-components";
import BottomPanel from "./BottomPanel";
import NoteButton from "./NoteButton";
import PlayBar from "./PlayBar";

export default function Melody({
  setting,
  sequence,
  setSequence,
  totalBars,
  setTotalBars,
  playing,
  setPlaying,
  noteValue,
  degrees,
  playBarRef,
}) {
  let i = 1;
  const bar = degrees.map((degree) => {
    if (i === 7) {
      i += 1;
      return (
        <React.Fragment key={`${setting.track}-1-${degree}`}>
          <NoteButton
            degree={degree}
            currentKey={setting.key}
            totalBars={totalBars}
            setTotalBars={setTotalBars}
            setSequence={setSequence}
            sequence={sequence}
            playing={playing}
            setPlaying={setPlaying}
            noteValue={noteValue}
            track="triangle"
          />
          <PlayBar totalBars={totalBars} playBarRef={playBarRef} />
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
        setSequence={setSequence}
        sequence={sequence}
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
      <BottomPanel setting={setting} degrees={degrees} />
    </>
  );
}
const BarsDiv = styled.section`
  display: flex;
  margin-bottom: 150px;
`;
