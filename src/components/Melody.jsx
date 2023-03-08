import React, { useMemo } from "react";
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
  track,
  sharpFlat,
}) {
  let targetDegree = degrees.default;
  if (setting.track[track].bass) {
    targetDegree = degrees.bass;
  }
  if (setting.track[track].lower) {
    targetDegree = degrees.lower;
  }

  const bar = targetDegree.map((degree, i) => {
    if (i === 6) {
      return (
        <React.Fragment key={`${setting.track}-1-${degree}`}>
          <NoteButton
            degree={degree}
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
        key={`${setting.track}-1-${degree}`}
        degree={degree}
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
