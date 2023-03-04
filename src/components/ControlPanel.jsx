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
        stopHandler={stopHandler}
      />
      {setting.track.Drum.display ? null : (
        <>
          <NoteValue noteValue={noteValue} setNoteValue={setNoteValue} stopHandler={stopHandler} />
          <SharpFlat sharpFlat={sharpFlat} setSharpFlat={setSharpFlat} />
        </>
      )}
      <Bar
        degrees={degrees}
        totalBars={totalBars}
        setTotalBars={setTotalBars}
        setSequence={setSequence}
        stopHandler={stopHandler}
        setting={setting}
      />
      <Button onClick={eidtTrack}>音軌</Button>
      <TrackPanel
        trackPanel={trackPanel}
        setTrackPanel={setTrackPanel}
        setting={setting}
        setSetting={setSetting}
      />
      {user === null ? null : (
        <>
          <Button
            onClick={async () => {
              const collectionRef = collection(db, "user", auth.currentUser.uid, "song");
              if (user.curretSong === null) {
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
              await updateDoc(doc(db, "user", auth.currentUser.uid, "song", user.curretSong), {
                setting,
                sequence,
              });
              const colRef = collection(db, "user", auth.currentUser.uid, "song");
              const songSnap = await getDocs(colRef);
              setUser({
                ...user,
                song: songSnap.docs.map((data) => ({ ...data.data() })),
              });
            }}
          >
            儲存
          </Button>
          <Button
            onClick={() => {
              setLoadPanel(true);
            }}
          >
            讀取
          </Button>
        </>
      )}
      {loadPanel ? (
        <>
          <LoadPanel setSequence={setSequence} setSetting={setSetting} />
          <Mask
            onClick={() => {
              setLoadPanel(false);
            }}
          />
        </>
      ) : null}
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
