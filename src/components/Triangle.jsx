import React from "react";
import styled from "styled-components";
import NoteButton from "./NoteButton";
import PlayingBar from "./PlayingBar";

export default function Triangle({
  setting,
  synthSequence,
  setSynthSequence,
  totalBars,
  setTotalBars,
  playing,
  setPlaying,
  noteValue,
}) {
  const degrees = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
  const bar = degrees.map((degree) => {
    if (degree === "7") {
      return (
        <React.Fragment key={`${setting.track}-1-${degree}`}>
          <NoteButton
            degree={degree}
            currentKey={setting.key}
            totalBars={totalBars}
            setTotalBars={setTotalBars}
            setSequence={setSynthSequence}
            sequence={synthSequence}
            playing={playing}
            setPlaying={setPlaying}
            noteValue={noteValue}
            track="triangle"
          />
          <PlayingBar totalBars={totalBars} />
        </React.Fragment>
      );
    }
    return (
      <NoteButton
        key={`${setting.track}-1-${degree}`}
        degree={degree}
        currentKey={setting.key}
        totalBars={totalBars}
        setTotalBars={setTotalBars}
        setSequence={setSynthSequence}
        sequence={synthSequence}
        playing={playing}
        setPlaying={setPlaying}
        noteValue={noteValue}
        track="triangle"
      />
    );
  });
  return <BarsDiv className="synth">{bar}</BarsDiv>;
}
const BarsDiv = styled.div`
  display: flex;
`;
