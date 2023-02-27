import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import Button from "../components/Button";
import ControlPanel from "../components/ControlPanel";
import Melody from "../components/Melody";
import NavBar from "../components/NavBar";
import Rhythm from "../components/Rhythm";

export default function ComposePage() {
  const defaultDegrees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const lowerDegrees = [-14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1];
  const bassDegrees = [-19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6];
  const rhythmSet = ["kick", "snare", "closedHiHat"];
  const [setting, setSetting] = useState({
    key: "C4 major",
    bpm: "120",
    track: {
      sine: {
        add: false,
        display: false,
        bass: false,
        lower: false,
      },
      Distortion_Guitar: {
        add: false,
        display: false,
        bass: false,
        lower: false,
      },
      synth: {
        add: false,
        display: false,
        bass: false,
        lower: false,
      },
      piano: {
        add: false,
        display: false,
        bass: false,
        lower: false,
      },
      piano_lower: {
        add: false,
        display: false,
        bass: false,
        lower: true,
      },
      bass: {
        add: false,
        display: false,
        bass: true,
        lower: false,
      },
      drum: {
        add: false,
        display: false,
        bass: false,
        lower: false,
      },
    },
  });
  const [degrees, setDegrees] = useState({
    default: defaultDegrees,
    bass: bassDegrees,
    lower: lowerDegrees,
  });
  const [triangleSequence, setTriangleSequence] = useState(createSequence(degrees, rhythmSet));
  const [totalBars, setTotalBars] = useState([1]);
  const [playing, setPlaying] = useState(Tone.Transport.state);
  const [noteValue, setNoteValue] = useState("16n");
  const [sharpFlat, setSharpFlat] = useState(false);
  const melodyTracks = Object.keys(setting.track).map((track) => {
    if (track === "drum") {
      return (
        <Rhythm
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
          rhythmSet={rhythmSet}
          sharpFlat={sharpFlat}
        />
      );
    }
    return setting.track[track] ? (
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
    ) : null;
  });
  useEffect(() => {
    let noDisplayTrack = true;
    let noAddedTrack = true;
    Object.keys(setting.track).forEach((track) => {
      if (setting.track[track].add) {
        noAddedTrack = false;
      }
      if (setting.track[track].display) {
        noDisplayTrack = false;
      }
    });
    if (noAddedTrack === false && noDisplayTrack) {
      for (let i = 0; i < Object.keys(setting.track).length; i += 1) {
        const track = Object.keys(setting.track)[i];
        if (setting.track[track].add) {
          setSetting({
            ...setting,
            track: {
              ...setting.track,
              [track]: { ...setting.track[track], add: true, display: true },
            },
          });
          break;
        }
      }
    }
    if (setting.track.drum.display) {
      setNoteValue("16n");
      setSharpFlat(false);
    }
  }, [setting.track]);
  function checkTracks() {
    let defaultMessage = (
      <>
        <NoTrackMessage>No track, please add track first </NoTrackMessage>
        <NoTrackMessage>(click track button)</NoTrackMessage>
      </>
    );
    Object.keys(setting.track).forEach((track) => {
      if (setting.track[track].add) {
        defaultMessage = null;
      }
    });
    return defaultMessage;
  }
  const toggleTrack = (track) => () => {
    let prevtarget = null;
    for (let i = 0; i < Object.entries(setting.track).length; i += 1) {
      if (Object.entries(setting.track)[i][1].display) {
        [prevtarget] = Object.entries(setting.track)[i];
        break;
      }
    }
    if (prevtarget === track) {
      return;
    }
    setSetting({
      ...setting,
      track: {
        ...setting.track,
        [track]: { ...setting.track[track], add: true, display: true },
        [prevtarget]: { ...setting.track[prevtarget], add: true, display: false },
      },
    });
  };
  const trackSelector = Object.keys(setting.track).map((track) => {
    if (setting.track[track].display) {
      return (
        <div key={track}>
          <SelectedTrack track={track} onClick={toggleTrack(track)}>
            {`${track.replace("_", " ")}`}
          </SelectedTrack>
        </div>
      );
    }

    if (setting.track[track].add) {
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

  function createSequence(inputDegrees, inputRhythmSet) {
    let result = {};
    Object.keys(setting.track).forEach((track) => {
      if (track === "drum") {
        inputRhythmSet.forEach((rhythm) => {
          result = { ...result, [track]: { ...result[track], [rhythm]: [] } };
        });
        return;
      }
      if (setting.track[track].bass) {
        inputDegrees.bass.forEach((degree) => {
          result = { ...result, [track]: { ...result[track], [degree]: [] } };
        });
        return;
      }
      if (setting.track[track].lower) {
        inputDegrees.lower.forEach((degree) => {
          result = { ...result, [track]: { ...result[track], [degree]: [] } };
        });
        return;
      }
      inputDegrees.default.forEach((degree) => {
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
