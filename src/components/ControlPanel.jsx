import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import Button from "./Button";
import Key from "./ControlPanel/Key";
import BPM from "./ControlPanel/Bpm";
import NoteValue from "./ControlPanel/NoteValue";
import Bar from "./ControlPanel/Bar";
import TrackPanel from "./ControlPanel/TrackPanel";
import Play from "./ControlPanel/Play";
import SharpFlat from "./ControlPanel/SharpFlat";

export default function ControlPanel({
  setting,
  setSetting,
  setTotalBars,
  sequence,
  setSequence,
  degrees,
  totalBars,
  playing,
  setPlaying,
  noteValue,
  setNoteValue,
  playBarRef,
  sharpFlat,
  setSharpFlat,
}) {
  const [trackPanel, setTrackPanel] = useState(false);
  useEffect(() => {
    if (playing === "stopped") {
      const playBar = playBarRef;
      playBar.current.style.top = "0px";
    }
  }, [playing]);

  const stopHandler = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    setPlaying(Tone.Transport.state);
    const playBar = playBarRef;
    playBar.current.style.top = "0px";
  };

  const eidtTrack = () => {
    setTrackPanel(true);
  };

  return (
    <ContainerDiv>
      <Key setting={setting} setSetting={setSetting} stopHandler={stopHandler} />
      <BPM setting={setting} setSetting={setSetting} stopHandler={stopHandler} />
      <Play
        playing={playing}
        setPlaying={setPlaying}
        totalBars={totalBars}
        sequence={sequence}
        setting={setting}
        playBarRef={playBarRef}
        stopHandler={stopHandler}
      />
      <NoteValue noteValue={noteValue} setNoteValue={setNoteValue} stopHandler={stopHandler} />
      <SharpFlat sharpFlat={sharpFlat} setSharpFlat={setSharpFlat} />
      <Bar
        degrees={degrees}
        totalBars={totalBars}
        setTotalBars={setTotalBars}
        setSequence={setSequence}
        stopHandler={stopHandler}
      />
      <Button onClick={eidtTrack}>edit Track</Button>
      <TrackPanel trackPanel={trackPanel} setTrackPanel={setTrackPanel} />
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 50px;
  padding-top: 20px;
  background: var(--main-background-color);
  z-index: 10;
  width: 100%;
  height: 150px;
`;
