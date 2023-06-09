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
  firstPartNote,
}) {
  const bar = degrees.rhythmSet.map((rhythm, i) => {
    if (i < 4) {
      return (
        <React.Fragment key={`${setting.track}-1-${rhythm}`}>
          <StyledNoteButton
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
          {firstPartNote ? (
            <FirstPartNoteButton
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
          ) : null}
        </React.Fragment>
      );
    }
    if (i === 4) {
      return (
        <React.Fragment key={`${setting.track}-1-${rhythm}`}>
          <StyledNoteButton
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
          {firstPartNote ? (
            <FirstPartNoteButton
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
          ) : null}
          <PlayBar totalBars={totalBars} firstPartNote={firstPartNote} setting={setting} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={`${setting.track}-1-${rhythm}`}>
        <StyledNoteButton
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
        {firstPartNote ? null : (
          <SecondPartNoteButton
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
        )}
      </React.Fragment>
    );
  });
  if (setting.track[track].display) {
    return (
      <ShowMelodyDiv>
        <BarsDiv>{bar}</BarsDiv>
        <BottomPanel
          setting={setting}
          degrees={degrees}
          track={track}
          firstPartNote={firstPartNote}
        />
      </ShowMelodyDiv>
    );
  }
  return (
    <HideMelodyDiv>
      <BarsDiv>{bar}</BarsDiv>
      <BottomPanel
        setting={setting}
        degrees={degrees}
        track={track}
        firstPartNote={firstPartNote}
      />
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

const StyledNoteButton = styled(NoteButton)`
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const FirstPartNoteButton = styled(NoteButton)`
  display: none;
  @media screen and (max-width: 750px) {
    display: block;
  }
`;
const SecondPartNoteButton = styled(FirstPartNoteButton)``;
