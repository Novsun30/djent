import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import ControlPanel from "../components/ControlPanel";
import CustomInput from "../components/CustomInput";
import Melody from "../components/Melody";
import NavBar from "../components/NavBar";
import Rhythm from "../components/Rhythm";
import { db } from "../config/firebase";
import UserContext from "../contexts/UserContext";
import confirmImage from "../assets/images/icons/confirm.svg";
import cancelImage from "../assets/images/icons/cancel.svg";
import editImage from "../assets/images/icons/edit.svg";
import loadingImage from "../assets/images/icons/loading.svg";
import warningImage from "../assets/images/icons/warning.svg";

import Mask from "../components/Mask";

export default function ComposePage({ demo }) {
  const { user, setUser } = useContext(UserContext);
  const basicDegrees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
  const defaultSetting = {
    song: "未命名",
    key: "C4 major",
    bpm: "120",
    bar: [1],
    track: {
      Sine: {
        add: false,
        display: false,
        bass: false,
        lower: false,
      },
      Dist_Guitar: {
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
  };
  const [setting, setSetting] = useState(defaultSetting);
  const defaultDegrees = {
    default: basicDegrees,
    bass: bassDegrees,
    lower: lowerDegrees,
    rhythmSet,
  };
  const [sequence, setSequence] = useState(createSequence(defaultDegrees));
  const [totalBars, setTotalBars] = useState(setting.bar);
  const [playing, setPlaying] = useState(Tone.Transport.state);
  const [noteValue, setNoteValue] = useState("16n");
  const [sharpFlat, setSharpFlat] = useState(false);
  const [editSongTitle, setEditSongTitle] = useState(false);
  const [songTitle, setSongTitle] = useState(setting.song);

  const [showTrackPanel, setShowTrackPanel] = useState(false);
  const [firstPartNote, SetFirstPartNote] = useState(true);
  const toggleTrackPanel = () => {
    if (showTrackPanel) {
      setShowTrackPanel(false);
      return;
    }
    setShowTrackPanel(true);
  };
  const stopHandler = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    setPlaying(Tone.Transport.state);
    const playBar = document.querySelectorAll("div.play-bar");
    playBar.forEach((element) => {
      const target = element;
      target.style.top = "0px";
    });
  };

  const melodyTracks = Object.keys(setting.track).map((track) => {
    if (track === "Drum") {
      return (
        <Rhythm
          key={track}
          track={track}
          setting={setting}
          sequence={sequence}
          setSequence={setSequence}
          totalBars={totalBars}
          setTotalBars={setTotalBars}
          playing={playing}
          setPlaying={setPlaying}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          degrees={defaultDegrees}
          sharpFlat={sharpFlat}
          firstPartNote={firstPartNote}
        />
      );
    }
    return setting.track[track] ? (
      <Melody
        key={track}
        track={track}
        setting={setting}
        sequence={sequence}
        setSequence={setSequence}
        totalBars={totalBars}
        setTotalBars={setTotalBars}
        playing={playing}
        setPlaying={setPlaying}
        noteValue={noteValue}
        setNoteValue={setNoteValue}
        degrees={defaultDegrees}
        sharpFlat={sharpFlat}
        firstPartNote={firstPartNote}
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
  useEffect(() => {
    async function getDemo() {
      const docRef = doc(db, "demo", "1");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setSequence(data.sequence);
      setSetting(data.setting);
      setTotalBars(data.setting.bar);
    }
    if (demo) {
      getDemo();
    }
  }, []);

  function checkTracks() {
    let defaultMessage = <NoTrackMessage>尚無音軌，請先新增音軌</NoTrackMessage>;
    if (demo) {
      defaultMessage = <LoadingImg alt="loading" src={loadingImage} />;
    }
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
        <CurrentTrackDiv key={track}>
          <CustomInput
            type="radio"
            name="currentTrack"
            track={track}
            checked="checked"
            onClick={toggleTrack(track)}
          />
          <SelectedTrack track={track}>{`${track.replaceAll("_", " ")}`}</SelectedTrack>
        </CurrentTrackDiv>
      );
    }

    if (setting.track[track].add) {
      return (
        <CurrentTrackDiv key={track}>
          <CustomInput
            type="radio"
            name="currentTrack"
            track={track}
            onClick={toggleTrack(track)}
          />
          <AddedTrack track={track}>{`${track.replaceAll("_", " ")}`}</AddedTrack>
        </CurrentTrackDiv>
      );
    }
    return null;
  });
  const trackPanel = Object.keys(setting.track).map((track) => {
    if (setting.track[track].display) {
      return (
        <CurrentTrackDiv key={track}>
          <CustomInput
            type="radio"
            name="trackPanel"
            track={track}
            checked="checked"
            onClick={toggleTrack(track)}
          />
          <SelectedTrack track={track}>{`${track.replaceAll("_", " ")}`}</SelectedTrack>
        </CurrentTrackDiv>
      );
    }

    if (setting.track[track].add) {
      return (
        <CurrentTrackDiv key={track}>
          <CustomInput type="radio" name="trackPanel" track={track} onClick={toggleTrack(track)} />
          <AddedTrack track={track}>{`${track.replaceAll("_", " ")}`}</AddedTrack>
        </CurrentTrackDiv>
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
                src={confirmImage}
                alt="confirm"
                onClick={() => {
                  setSetting({ ...setting, song: songTitle });
                  setEditSongTitle(false);
                }}
              />
              <YesNoImg
                src={cancelImage}
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
                src={editImage}
                onClick={() => {
                  setEditSongTitle(true);
                }}
              />
            </>
          )}
        </SongTitleDiv>
        {user === null ? (
          <WaringDiv>
            <WarningImg src={warningImage} alt="warning" />
            <WarningTitle>如需儲存進度，請先登入</WarningTitle>
          </WaringDiv>
        ) : null}

        <ControlPanel
          sequence={sequence}
          setSequence={setSequence}
          setting={setting}
          setSetting={setSetting}
          totalBars={totalBars}
          setTotalBars={setTotalBars}
          playing={playing}
          setPlaying={setPlaying}
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          degrees={defaultDegrees}
          sharpFlat={sharpFlat}
          setSharpFlat={setSharpFlat}
          stopHandler={stopHandler}
          toggleTrackPanel={toggleTrackPanel}
          firstPartNote={firstPartNote}
          SetFirstPartNote={SetFirstPartNote}
        />
        {melodyTracks}
        {checkTracks()}
        {showTrackSelector() ? (
          <TrackSelectorDiv>
            <TrackSelectorTitle>目前音軌</TrackSelectorTitle>
            <TrackSelectorContent>{trackSelector}</TrackSelectorContent>
          </TrackSelectorDiv>
        ) : null}
        {showTrackPanel ? (
          <>
            <PopupTrackSelectorDiv>
              <TrackSelectorTitle>目前音軌</TrackSelectorTitle>
              <TrackSelectorContent>{trackPanel}</TrackSelectorContent>
            </PopupTrackSelectorDiv>
            <StyledMask onClick={toggleTrackPanel} />
          </>
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
  @media screen and (max-width: 750px) {
    font-size: 22px;
  }
`;

const CurrentTrackDiv = styled.div`
  display: flex;
  height: 28px;
  margin: 5px 0;
`;
const AddedTrack = styled.p`
  font-size: 18px;
  margin-left: 18px;
  color: #666;
  margin-top: 3px;
`;
const SelectedTrack = styled.p`
  font-size: 18px;
  margin-left: 18px;
  color: var(--button-selected-color);
  margin-top: 3px;
`;

const TrackSelectorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #111;
  border-radius: 8px;
  width: 180px;
  padding: 20px 0;
  position: fixed;
  left: calc(50% + 420px);
  top: 370px;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const PopupTrackSelectorDiv = styled(TrackSelectorDiv)`
  display: none;
  @media screen and (max-width: 1200px) {
    display: flex;
    left: calc(50% - 90px);
    z-index: 4;
    animation: fade-in 0.25s linear;
    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
const StyledMask = styled(Mask)`
  display: none;
  @media screen and (max-width: 1200px) {
    display: flex;
  }
`;

const TrackSelectorTitle = styled.p`
  color: #eee;
  font-size: 18px;
`;
const TrackSelectorContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
`;
const SongTitleDiv = styled.div`
  display: flex;
  margin: 5px 0;
`;
const SongTitle = styled.p`
  font-size: 32px;
  color: #eee;
  @media screen and (max-width: 750px) {
    font-size: 24px;
  }
`;
const SongTitleInput = styled.input`
  font-size: 32px;
  padding: 1px;
  text-align: center;
  border-radius: 8px;
  width: 275px;
  @media screen and (max-width: 750px) {
    font-size: 24px;
    width: 250px;
  }
`;

const EditImg = styled.img`
  cursor: pointer;
  margin-left: 12px;
`;

const YesNoImg = styled.img`
  cursor: pointer;
  margin-left: 5px;
  width: 30px;
  @media screen and (max-width: 480px) {
    width: 24px;
  }
`;
const WaringDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  @media screen and (max-width: 750px) {
    margin-top: 0;
  }
`;
const WarningTitle = styled.p`
  font-size: 20px;
  margin-left: 5px;
  color: #eee;
  @media screen and (max-width: 750px) {
    font-size: 16px;
  }
`;
const WarningImg = styled.img`
  width: 35px;
  @media screen and (max-width: 750px) {
    width: 24px;
  }
`;
const LoadingImg = styled.img`
  width: 50px;
`;
