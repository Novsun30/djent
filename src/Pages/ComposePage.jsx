import React, { useRef, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import ControlPanel from "../components/ControlPanel";
import Melody from "../components/Melody";
import NavBar from "../components/NavBar";

export default function ComposePage() {
  const defaultDegrees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [setting, setSetting] = useState({
    key: "C4 major",
    bpm: "120",
    melody: {
      triangle: true,
      triangleBass: false,
    },
    rhythm: false,
  });
  const [degrees, setDegrees] = useState(defaultDegrees);
  const [triangleSequence, setTriangleSequence] = useState(createSequence(degrees));
  const [totalBars, setTotalBars] = useState([1]);
  const [playing, setPlaying] = useState(Tone.Transport.state);
  const [noteValue, setNoteValue] = useState("16n");
  const [sharpFlat, setSharpFlat] = useState(false);
  const playBarRef = useRef(null);
  const melodyTracks = Object.keys(setting.melody).map((track) => (setting.melody[track] ? (
    <Melody
      key={track}
      track={track}
      setting={setting}
      sequence={triangleSequence}
      setSequence={setTriangleSequence}
      totalBars={totalBars}
      setTotalBars={setTotalBars}
      playing={playing}
      setPlaying={setPlaying}
      noteValue={noteValue}
      setNoteValue={setNoteValue}
      degrees={degrees}
      playBarRef={playBarRef}
      sharpFlat={sharpFlat}
    />
  ) : null));
  const trackSelector = Object.keys(setting.melody).map((track) => (setting.melody[track] ? (
    <div key={track}>
      <div>{track}</div>
    </div>
  ) : null));
  function createSequence(inputDegrees) {
    let result = {};
    Object.keys(setting.melody).forEach((track) => {
      inputDegrees.forEach((degree) => {
        result = { ...result, [track]: { ...result[track], [degree]: [] } };
      });
    });
    return result;
  }

  return (
    <>
      <NavBar />
      <Main>
        <ControlPanel
          sequence={triangleSequence}
          setSequence={setTriangleSequence}
          setting={setting}
          setSetting={setSetting}
          totalBars={totalBars}
          setTotalBars={setTotalBars}
          playing={playing}
          setPlaying={setPlaying}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          degrees={degrees}
          playBarRef={playBarRef}
          sharpFlat={sharpFlat}
          setSharpFlat={setSharpFlat}
        />
        {melodyTracks}
        <div>
          {trackSelector}
          {setting.rhythm ? <div>rhythm</div> : null}
        </div>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
