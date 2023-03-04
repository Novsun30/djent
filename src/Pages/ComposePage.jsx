import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import Button from "../components/Button";
import ControlPanel from "../components/ControlPanel";
import Melody from "../components/Melody";
import NavBar from "../components/NavBar";
import Rhythm from "../components/Rhythm";
import UserContext from "../contexts/UserContext";

export default function ComposePage() {
  const { user, setUser } = useContext(UserContext);
  const defaultDegrees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const lowerDegrees = [-14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1];
  const bassDegrees = [-19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6];
  const rhythmSet = [
    "closedHiHat",
    "openHiHat",
    "kick",
    "snare",
    "sideStick",
    "hiTom",
    "midTom",
    "floorTom",
    "ride",
    "crash",
  ];
  const [setting, setSetting] = useState({
    song: "未命名",
    key: "C4 major",
    bpm: "120",
    track: {
      Sine: {
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
      Synth: {
        add: false,
        display: false,
        bass: false,
        lower: false,
      },
      Piano: {
        add: false,
        display: false,
        bass: false,
        lower: false,
      },
      Piano_Lower: {
        add: false,
        display: false,
        bass: false,
        lower: true,
      },
      Bass: {
        add: false,
        display: false,
        bass: true,
        lower: false,
      },
      Drum: {
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
    rhythmSet,
  });
  const [triangleSequence, setTriangleSequence] = useState(createSequence(degrees));
  const [totalBars, setTotalBars] = useState([1]);
  const [playing, setPlaying] = useState(Tone.Transport.state);
  const [noteValue, setNoteValue] = useState("16n");
  const [sharpFlat, setSharpFlat] = useState(false);
  const [editSongTitle, setEditSongTitle] = useState(false);
  const [songTitle, setSongTitle] = useState(setting.song);
  const melodyTracks = Object.keys(setting.track).map((track) => {
    if (track === "Drum") {
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
          degrees={degrees}
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
    if (setting.track.Drum.display) {
      setNoteValue("16n");
      setSharpFlat(false);
    }
  }, [setting.track]);
  function checkTracks() {
    let defaultMessage = (
      <>
        <NoTrackMessage>尚無音軌，請先新增音軌</NoTrackMessage>
        <NoTrackMessage>( 點擊音軌按鈕 )</NoTrackMessage>
      </>
    );
    Object.keys(setting.track).forEach((track) => {
      if (setting.track[track].add) {
        defaultMessage = null;
      }
    });
    return defaultMessage;
  }
  function showTrackSelector() {
    let result = false;
    Object.keys(setting.track).forEach((track) => {
      if (setting.track[track].add) {
        result = true;
      }
    });
    return result;
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
            {`${track.replace("_", " ")}`}
          </AddedTrack>
        </div>
      );
    }
    return null;
  });

  function createSequence(inputDegrees) {
    let result = {};
    Object.keys(setting.track).forEach((track) => {
      if (track === "Drum") {
        inputDegrees.rhythmSet.forEach((rhythm) => {
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
        {user !== null ? (
          <SongTitleDiv>
            {editSongTitle ? (
              <>
                <SongTitleInput
                  value={songTitle}
                  onChange={(e) => {
                    setSongTitle(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSetting({ ...setting, song: songTitle });
                      setEditSongTitle(false);
                    }
                  }}
                />
                <YesNoImg
                  src="images/icons/confirm.svg"
                  alt="confirm"
                  onClick={() => {
                    setSetting({ ...setting, song: songTitle });
                    setEditSongTitle(false);
                  }}
                />
                <YesNoImg
                  src="images/icons/cancel.svg"
                  alt="cancel"
                  onClick={() => {
                    setEditSongTitle(false);
                  }}
                />
              </>
            ) : (
              <>
                <SongTitle>{setting.song}</SongTitle>
                <EditImg
                  alt="edit"
                  src="images/icons/edit.svg"
                  onClick={() => {
                    setEditSongTitle(true);
                  }}
                />
              </>
            )}
          </SongTitleDiv>
        ) : (
          <WaringDiv>
            <WarningImg src="images/icons/warning.svg" alt="warning" />
            <WarningTitle>目前未登入，請先登入以儲存進度</WarningTitle>
          </WaringDiv>
        )}

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
        {showTrackSelector() ? (
          <TrackSelectorDiv>
            <TrackSelectorTitle>Tracks</TrackSelectorTitle>
            <TrackSelectorContent>{trackSelector}</TrackSelectorContent>
          </TrackSelectorDiv>
        ) : null}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #111;
  border-radius: 8px;
  width: 300px;
  padding: 20px 0;
  position: fixed;
  right: 400px;
  top: 300px;
`;
const TrackSelectorTitle = styled.p`
  color: #eee;
`;
const TrackSelectorContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const SongTitleDiv = styled.div`
  display: flex;
  margin: 5px 0;
`;
const SongTitle = styled.p`
  font-size: 32px;
  color: #eee;
`;
const SongTitleInput = styled.input`
  font-size: 32px;
  padding: 1px;
  text-align: center;
  border-radius: 8px;
  width: 275px;
`;

const EditImg = styled.img`
  cursor: pointer;
  margin-left: 12px;
`;

const YesNoImg = styled.img`
  transform: scale(1.6);
  cursor: pointer;
  margin-left: 20px;
`;
const WaringDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const WarningTitle = styled.p`
  font-size: 20px;
  margin-left: 5px;
  color: #eee;
`;
const WarningImg = styled.img`
  width: 35px;
`;
