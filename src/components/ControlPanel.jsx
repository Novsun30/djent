import React, {
  useState, useEffect, useContext, useRef,
} from "react";
import styled from "styled-components";
import * as Tone from "tone";
import {
  addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc,
} from "firebase/firestore";

import Button from "./Button";
import Key from "./ControlPanel/Key";
import BPM from "./ControlPanel/Bpm";
import NoteValue from "./ControlPanel/NoteValue";
import Bar from "./ControlPanel/Bar";
import TrackPanel from "./ControlPanel/TrackPanel";
import Play from "./ControlPanel/Play";
import SharpFlat from "./ControlPanel/SharpFlat";
import { auth, db } from "../config/firebase";
import UserContext from "../contexts/UserContext";
import LoadPanel from "./ControlPanel/LoadPanel";
import Mask from "./Mask";
import leftArrow from "../assets/images/icons/leftArrow.svg";
import rightArrow from "../assets/images/icons/rightArrow.svg";
import selectedLeftArrow from "../assets/images/icons/selectedLeftArrow.svg";
import selectedRightArrow from "../assets/images/icons/selectedRightArrow.svg";

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
  sharpFlat,
  setSharpFlat,
  stopHandler,
  toggleTrackPanel,
  firstPartNote,
  SetFirstPartNote,
}) {
  const { user, setUser } = useContext(UserContext);
  const [trackPanel, setTrackPanel] = useState(false);
  const [loadPanel, setLoadPanel] = useState(false);

  useEffect(() => {
    if (playing === "stopped") {
      const playBar = document.querySelectorAll("div.play-bar");
      playBar.forEach((element) => {
        const target = element;
        target.style.top = "0px";
      });
    }
  }, [playing]);

  const editTrack = () => {
    setTrackPanel(true);
  };
  const toggleNotePart = () => {
    if (firstPartNote) {
      SetFirstPartNote(false);
      return;
    }
    SetFirstPartNote(true);
  };
  const saveProject = async () => {
    if (user.curretSong === null) {
      const collectionRef = collection(db, "user", auth.currentUser.uid, "song");
      const addRef = await addDoc(collectionRef, {
        id: "",
        setting,
        sequence,
      });
      await updateDoc(doc(db, "user", auth.currentUser.uid, "song", addRef.id), {
        id: addRef.id,
      });
      const colRef = collection(db, "user", auth.currentUser.uid, "song");
      const songSnap = await getDocs(colRef);
      setUser({
        ...user,
        song: songSnap.docs.map((data) => ({ ...data.data() })),
        curretSong: addRef.id,
      });
      return;
    }
    await updateDoc(doc(db, "user", auth.currentUser.uid, "song", user.currentSong), {
      setting,
      sequence,
    });
    const colRef = collection(db, "user", auth.currentUser.uid, "song");
    const songSnap = await getDocs(colRef);
    setUser({
      ...user,
      song: songSnap.docs.map((data) => ({ ...data.data() })),
    });
  };

  return (
    <ContainerDiv>
      <Key setting={setting} setSetting={setSetting} stopHandler={stopHandler} />
      <BpmBarDiv>
        <BPM setting={setting} setSetting={setSetting} stopHandler={stopHandler} />
        <Bar
          degrees={degrees}
          totalBars={totalBars}
          setTotalBars={setTotalBars}
          setSequence={setSequence}
          stopHandler={stopHandler}
          setting={setting}
          setSetting={setSetting}
        />
      </BpmBarDiv>
      <Play
        playing={playing}
        setPlaying={setPlaying}
        totalBars={totalBars}
        sequence={sequence}
        setting={setting}
        stopHandler={stopHandler}
      />
      {setting.track.Drum.display ? null : (
        <>
          <StyledNoteValue
            noteValue={noteValue}
            setNoteValue={setNoteValue}
            stopHandler={stopHandler}
          />
          <SharpFlat sharpFlat={sharpFlat} setSharpFlat={setSharpFlat} />
        </>
      )}
      <TrackPanel
        trackPanel={trackPanel}
        setTrackPanel={setTrackPanel}
        setting={setting}
        setSetting={setSetting}
        setSequence={setSequence}
      />
      <EditDiv>
        {user === null ? null : (
          <SaveLoadDiv>
            <SaveLoadButton
              onClick={() => {
                setLoadPanel(true);
              }}
            >
              讀取
            </SaveLoadButton>
            <SaveLoadButton onClick={saveProject}>儲存</SaveLoadButton>
          </SaveLoadDiv>
        )}
        {loadPanel ? (
          <>
            <LoadPanel
              setSequence={setSequence}
              setSetting={setSetting}
              setLoadPanel={setLoadPanel}
              setTotalBars={setTotalBars}
            />
            <StyledMask
              onClick={() => {
                setLoadPanel(false);
              }}
            />
          </>
        ) : null}
        <EditTrackButton onClick={editTrack}>編輯音軌</EditTrackButton>
        <SelectTrackButton onClick={toggleTrackPanel}>目前音軌</SelectTrackButton>
      </EditDiv>
      <NoteTabDiv>
        <div>
          {firstPartNote ? (
            <SelectedLeftArrow alt="selectedLeftArrow" src={selectedLeftArrow} />
          ) : (
            <LeftArrow alt="leftArrow" src={leftArrow} onClick={toggleNotePart} />
          )}
        </div>
        <div>
          {firstPartNote ? (
            <RightArrow alt="rightArrow" src={rightArrow} onClick={toggleNotePart} />
          ) : (
            <SelectedRightArrow alt="selectedRightArrow" src={selectedRightArrow} />
          )}
        </div>
      </NoteTabDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 49px;
  background: var(--main-background-color);
  z-index: 2;
  width: 100%;
  height: 150px;
  @media screen and (max-width: 750px) {
    height: 150px;
    flex-wrap: wrap;
  }
`;

const BpmBarDiv = styled.div`
  margin: 0 15px;
  @media screen and (max-width: 750px) {
    margin: 0 7px;
  }
  @media screen and (max-width: 480px) {
    margin: 0 0 0 3px;
  }
`;

const SaveLoadDiv = styled.div`
  display: flex;
`;
const EditDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
  @media screen and (max-width: 1200px) {
    margin-left: 5px;
  }
  @media screen and (max-width: 480px) {
    margin-left: 2px;
  }
`;

const SaveLoadButton = styled(Button)`
  margin: 1px;
  font-size: 20px;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  @media screen and (max-width: 750px) {
    height: 30px;
  }
  @media screen and (max-width: 480px) {
    width: 38px;
    margin: 1px 0;
    height: 30px;
    font-size: 12px;
  }
`;
const EditTrackButton = styled(Button)`
  width: 109px;
  margin: 1px 0;
  @media screen and (max-width: 1200px) {
    width: 88px;
    font-size: 18px;
  }
  @media screen and (max-width: 750px) {
    height: 30px;
  }
  @media screen and (max-width: 480px) {
    width: 62px;
    font-size: 12px;
  }
`;

const SelectTrackButton = styled(EditTrackButton)`
  display: none;
  @media screen and (max-width: 1200px) {
    display: flex;
  }
  @media screen and (max-width: 750px) {
    height: 30px;
  }
  @media screen and (max-width: 480px) {
    width: 62px;
    font-size: 12px;
  }
`;
const StyledNoteValue = styled(NoteValue)``;

const NoteTabDiv = styled.div`
  width: 450px;
  height: 28px;
  display: none;
  margin-bottom: 5px;
  @media screen and (max-width: 750px) {
    display: flex;
    top: 191px;
    justify-content: space-between;
    padding: 0 10px;
  }
  @media screen and (max-width: 480px) {
    width: 360px;
  }
`;

const LeftArrow = styled.img`
  width: 40px;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    width: 24px;
  }
`;
const RightArrow = styled(LeftArrow)``;
const SelectedLeftArrow = styled.img`
  width: 40px;
  @media screen and (max-width: 480px) {
    width: 24px;
  }
`;
const SelectedRightArrow = styled(SelectedLeftArrow)``;

const StyledMask = styled(Mask)`
  left: 0;
`;
