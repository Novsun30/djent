import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import ControlPanel from "../components/ControlPanel";
import Melody from "../components/Melody";
import NavBar from "../components/NavBar";

export default function ComposePage() {
  const degrees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [setting, setSetting] = useState({
    key: "C4 major",
    bpm: "120",
    melody: {
      triangle: true,
      triangleBass: false,
    },
    rhythm: false,
  });
  const [triangleDegrees, setTriangleDegrees] = useState(degrees);
  const [triangleSequence, setTriangleSequence] = useState(createSequence(triangleDegrees));
  const [totalBars, setTotalBars] = useState([1]);
  const [playing, setPlaying] = useState(Tone.Transport.state);
  const [noteValue, setNoteValue] = useState("16n");
  const playBarRef = useRef(null);
  const melodyTracks = Object.keys(setting.melody).map((track) => (setting.melody[track] ? (
    <Melody
      key={track}
      setting={setting}
      sequence={triangleSequence}
      setSequence={setTriangleSequence}
      totalBars={totalBars}
      setTotalBars={setTotalBars}
      playing={playing}
      setPlaying={setPlaying}
      noteValue={noteValue}
      setNoteValue={setNoteValue}
      degrees={triangleDegrees}
      playBarRef={playBarRef}
    />
  ) : null));
  return (
    <>
      <NavBar />
      <Main>
        <ControlPanel
          triangleSequence={triangleSequence}
          setTriangleSequence={setTriangleSequence}
          setting={setting}
          setSetting={setSetting}
          totalBars={totalBars}
          setTotalBars={setTotalBars}
          playing={playing}
          setPlaying={setPlaying}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          triangleDegrees={triangleDegrees}
          setTriangleDegrees={setTriangleDegrees}
          playBarRef={playBarRef}
        />
        {/* <Melody
          setting={setting}
          sequence={triangleSequence}
          setSequence={setTriangleSequence}
          totalBars={totalBars}
          setTotalBars={setTotalBars}
          playing={playing}
          setPlaying={setPlaying}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          degrees={triangleDegrees}
          playBarRef={playBarRef}
        />
        <Melody
          setting={setting}
          sequence={triangleSequence}
          setSequence={setTriangleSequence}
          totalBars={totalBars}
          setTotalBars={setTotalBars}
          playing={playing}
          setPlaying={setPlaying}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          degrees={triangleDegrees}
          playBarRef={playBarRef}
        /> */}
        {melodyTracks}
      </Main>
    </>
  );
}

function createSequence(inputDegrees) {
  let result = {};
  inputDegrees.forEach((degree) => {
    result = { ...result, [degree]: [] };
  });
  return result;
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
