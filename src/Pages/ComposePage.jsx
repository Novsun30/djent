import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import Button from "../components/Button";
import ControlPanel from "../components/ControlPanel";
import Melody from "../components/Melody";
import NavBar from "../components/NavBar";

export default function ComposePage() {
  const defaultDegrees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [setting, setSetting] = useState({
    key: "C4 major",
    bpm: "120",
    melody: {
      sine: { add: false, display: false },
      Distortion_Guitar: { add: false, display: false },
      synth: { add: false, display: false },
      piano: { add: false, display: false },
    },
    rhythm: false,
  });
  const [degrees, setDegrees] = useState(defaultDegrees);
  const [triangleSequence, setTriangleSequence] = useState(createSequence(degrees));
  const [totalBars, setTotalBars] = useState([1]);
  const [playing, setPlaying] = useState(Tone.Transport.state);
  const [noteValue, setNoteValue] = useState("16n");
  const [sharpFlat, setSharpFlat] = useState(false);
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
      sharpFlat={sharpFlat}
    />
  ) : null));
  useEffect(() => {
    let noDisplayTrack = true;
    let noAddedTrack = true;
    Object.keys(setting.melody).forEach((track) => {
      if (setting.melody[track].add) {
        noAddedTrack = false;
      }
      if (setting.melody[track].display) {
        noDisplayTrack = false;
      }
    });
    if (noAddedTrack === false && noDisplayTrack) {
      for (let i = 0; i < Object.keys(setting.melody).length; i += 1) {
        const track = Object.keys(setting.melody)[i];
        if (setting.melody[track].add) {
          setSetting({
            ...setting,
            melody: { ...setting.melody, [track]: { add: true, display: true } },
          });
          break;
        }
      }
    }
  }, [setting.melody]);
  function checkTracks() {
    // let defaultMessage = "No track, please add track first (click track button)";
    let defaultMessage = (
      <>
        <NoTrackMessage>No track, please add track first </NoTrackMessage>
        <NoTrackMessage>(click track button)</NoTrackMessage>
      </>
    );
    Object.keys(setting.melody).forEach((track) => {
      if (setting.melody[track].add) {
        defaultMessage = null;
      }
    });
    return defaultMessage;
  }
  const toggleTrack = (track) => () => {
    let prevtarget = null;
    for (let i = 0; i < Object.entries(setting.melody).length; i += 1) {
      if (Object.entries(setting.melody)[i][1].display) {
        [prevtarget] = Object.entries(setting.melody)[i];
        break;
      }
    }
    if (prevtarget === track) {
      return;
    }
    setSetting({
      ...setting,
      melody: {
        ...setting.melody,
        [track]: { add: true, display: true },
        [prevtarget]: { add: true, display: false },
      },
    });
  };
  const trackSelector = Object.keys(setting.melody).map((track) => {
    if (setting.melody[track].display) {
      return (
        <div key={track}>
          <SelectedTrack track={track} onClick={toggleTrack(track)}>
            {`${track.replace("_", " ")}`}
          </SelectedTrack>
        </div>
      );
    }

    if (setting.melody[track].add) {
      return (
        <div key={track}>
          <AddedTrack track={track} onClick={toggleTrack(track)}>
            {track}
          </AddedTrack>
        </div>
      );
    }
    return null;
  });

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
          sharpFlat={sharpFlat}
          setSharpFlat={setSharpFlat}
        />
        {melodyTracks}
        {checkTracks()}
        <TrackSelectorDiv>
          {trackSelector}
          {setting.rhythm ? <div>rhythm</div> : null}
        </TrackSelectorDiv>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoTrackMessage = styled.p`
  color: var(--waring-text-color);
  font-size: 25px;
`;

const AddedTrack = styled(Button)``;
const SelectedTrack = styled(Button)`
  background: var(--button-selected-color);
`;

const TrackSelectorDiv = styled.div`
  position: fixed;
  right: 400px;
  top: 300px;
`;
