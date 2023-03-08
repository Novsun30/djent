import React, { useState, useEffect, useContext } from "react";
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
          <NoteValue noteValue={noteValue} setNoteValue={setNoteValue} stopHandler={stopHandler} />
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
            <StyledButton
              onClick={() => {
                setLoadPanel(true);
              }}
            >
              讀取
            </StyledButton>
            <StyledButton onClick={saveProject}>儲存</StyledButton>
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
            <Mask
              onClick={() => {
                setLoadPanel(false);
              }}
            />
          </>
        ) : null}
        <EditTrackButton onClick={editTrack}>編輯音軌</EditTrackButton>
      </EditDiv>
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
  z-index: 2;
  width: 100%;
  height: 150px;
`;

const BpmBarDiv = styled.div`
  margin: 0 15px;
`;

const SaveLoadDiv = styled.div`
  display: flex;
`;
const EditDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
`;

const StyledButton = styled(Button)`
  margin: 1px;
`;
const EditTrackButton = styled(StyledButton)`
  width: 109px;
`;
