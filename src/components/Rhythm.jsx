import React from "react";
import styled from "styled-components";
import BottomPanel from "./BottomPanel";
import NoteButton from "./NoteButton";
import PlayBar from "./PlayBar";

export default function Rhythm({
  setting,
  sequence,
  setSequence,
  totalBars,
  setTotalBars,
  playing,
  setPlaying,
  noteValue,
  degrees,
  track,
  sharpFlat,
}) {
  const bar = degrees.rhythmSet.map((rhythm, i) => {
    if (i === 4) {
      return (
        <React.Fragment key={`${setting.track}-1-${rhythm}`}>
          <NoteButton
            degree={rhythm}
            totalBars={totalBars}
            setTotalBars={setTotalBars}
            setSequence={setSequence}
            sequence={sequence}
            playing={playing}
            setPlaying={setPlaying}
            noteValue={noteValue}
            track={track}
            sharpFlat={sharpFlat}
          />
          <PlayBar totalBars={totalBars} />
        </React.Fragment>
      );
    }
    return (
      <NoteButton
        key={`${setting.track}-1-${rhythm}`}
        degree={rhythm}
        totalBars={totalBars}
        setTotalBars={setTotalBars}
        setSequence={setSequence}
        sequence={sequence}
        playing={playing}
        setPlaying={setPlaying}
        noteValue={noteValue}
        track={track}
        sharpFlat={sharpFlat}
      />
    );
  });
  if (setting.track[track].display) {
    return (
      <ShowMelodyDiv>
        <BarsDiv>{bar}</BarsDiv>
        <BottomPanel setting={setting} degrees={degrees} track={track} />
      </ShowMelodyDiv>
    );
  }
  return (
    <HideMelodyDiv>
      <BarsDiv>{bar}</BarsDiv>
      <BottomPanel setting={setting} degrees={degrees} track={track} />
    </HideMelodyDiv>
  );
}
const BarsDiv = styled.section`
  display: flex;
  margin-bottom: 150px;
`;

const HideMelodyDiv = styled.div`
  display: none;
`;
const ShowMelodyDiv = styled.div``;
