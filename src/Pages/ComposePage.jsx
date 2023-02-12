import React, { useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import { Scale } from "tonal";
import ControlPanel from "../components/ControlPanel";
import Triangle from "../components/Triangle";

export default function ComposePage() {
  const degrees = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
  const [setting, setSetting] = useState({
    key: "C4 major",
    bpm: "120",
    triangle: false,
  });
  const [synthSequence, setSynthSequence] = useState(createSequence(setting.key, degrees));
  const [totalBars, setTotalBars] = useState([]);
  const [playing, setPlaying] = useState(Tone.Transport.state);
  const [noteValue, setNoteValue] = useState("16n");
  return (
    <Main>
      <ControlPanel
        synthSequence={synthSequence}
        setSynthSequence={setSynthSequence}
        setting={setting}
        setSetting={setSetting}
        setTotalBars={setTotalBars}
        totalBars={totalBars}
        playing={playing}
        setPlaying={setPlaying}
        noteValue={noteValue}
        setNoteValue={setNoteValue}
      />
      <Triangle
        setting={setting}
        synthSequence={synthSequence}
        setSynthSequence={setSynthSequence}
        totalBars={totalBars}
        setTotalBars={setTotalBars}
        playing={playing}
        setPlaying={setPlaying}
        noteValue={noteValue}
        setNoteValue={setNoteValue}
      />
    </Main>
  );
}

function createSequence(currentKey, inputDegrees) {
  let result = {};
  const key = Scale.degrees(currentKey);
  for (let i = 0; i < inputDegrees.length; i += 1) {
    const note = key(inputDegrees[i]);
    const newObj = { [note]: [] };
    result = Object.assign(result, newObj);
  }
  return result;
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
