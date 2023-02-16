import React, { useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import ControlPanel from "../components/ControlPanel";
import Triangle from "../components/Triangle";
import NavBar from "../components/NavBar";

export default function ComposePage() {
  const degrees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [setting, setSetting] = useState({
    key: "C4 major",
    bpm: "120",
  });
  const [triangleDegrees, setTriangleDegrees] = useState(degrees);
  const [triangleSequence, setTriangleSequence] = useState(createSequence(triangleDegrees));
  const [totalBars, setTotalBars] = useState([1]);
  const [playing, setPlaying] = useState(Tone.Transport.state);
  const [noteValue, setNoteValue] = useState("16n");
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
        />
        <Triangle
          setting={setting}
          triangleSequence={triangleSequence}
          setTriangleSequence={setTriangleSequence}
          totalBars={totalBars}
          setTotalBars={setTotalBars}
          playing={playing}
          setPlaying={setPlaying}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          triangleDegrees={triangleDegrees}
        />
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
