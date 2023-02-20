import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import * as Tone from "tone";
import { Scale, Note } from "tonal";
import Button from "./Button";
import Key from "./ControlPanel/Key";
import BPM from "./ControlPanel/Bpm";
import NoteValue from "./ControlPanel/NoteValue";
import Bar from "./ControlPanel/Bar";
import TrackPanel from "./ControlPanel/TrackPanel";

export default function ControlPanel({
  setting,
  setSetting,
  setTotalBars,
  triangleSequence,
  setTriangleSequence,
  triangleDegrees,
  setTriangleDegrees,
  totalBars,
  playing,
  setPlaying,
  noteValue,
  setNoteValue,
  playBarRef,
}) {
  const [bpm, setBpm] = useState(setting.bpm);
  const [trackPanel, setTrackPanel] = useState(false);
  useEffect(() => {
    if (playing === "stopped") {
      const playBar = playBarRef;
      playBar.current.style.top = "0px";
    }
  }, [playing]);
  // useEffect(() => {
  //   if (playing === "stopped") {
  //     const startNoteButtonDiv = document.querySelectorAll("div.button-1-0");
  //     startNoteButtonDiv.forEach((item) => {
  //       const button = item;
  //       button.style.background = "var(--play-indicator-color)";
  //     });
  //     removePausedColor();
  //   }
  //   if (playing === "paused") {
  //     const target = Tone.Transport.position.slice(0, 5).split(":");
  //     const targetBar = Number(target[0]) + 1;
  //     const targetBeat = Number(target[1]) * 4 + Number(target[2]);
  //     const noteButtonDiv = document.querySelectorAll(`div.button-${targetBar}-${targetBeat}`);
  //     Tone.Draw.schedule(() => {
  //       noteButtonDiv.forEach((item) => {
  //         const button = item;
  //         button.style.background = "var(--play-indicator-color)";
  //         button.classList.add("paused");
  //       });
  //     }, "+28n");
  //   }
  // }, [totalBars, playing, triangleSequence, setting.key]);

  const playHandler = async () => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
    if (totalBars.length === 0) {
      return;
    }
    if (playing === "started") {
      Tone.Transport.pause();
      setPlaying(Tone.Transport.state);
      return;
    }
    if (playing === "paused") {
      Tone.Transport.start();
      setPlaying(Tone.Transport.state);
      return;
    }
    const lastBar = totalBars[totalBars.length - 1];
    const key = Scale.degrees(setting.key);
    const degrees = Object.keys(triangleSequence);
    degrees.forEach((degree) => {
      const synth = new Tone.Synth().toDestination();
      synth.volume.value = -4;
      if (triangleSequence[degree].length !== 0) {
        triangleSequence[degree].forEach((item) => {
          Tone.Transport.schedule(() => {
            const now = Tone.now();
            synth.triggerAttackRelease(Note.simplify(key(degree)), item.noteValue, now);
          }, `${item.bar - 1}:0:${item.number}`);
        });
      }
    });

    Tone.Transport.schedule(() => {
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
      setPlaying(Tone.Transport.state);
    }, `${lastBar}:0:0`);
    totalBars.forEach((bar) => {
      for (let i = 0; i < 16; i += 1) {
        Tone.Transport.schedule((time) => {
          Tone.Draw.schedule(() => {
            const playBar = playBarRef;
            const gap = Math.floor(i / 4) * 20;
            const height = (bar - 1) * 720 + i * 40 + gap;
            playBar.current.style.top = `${height}px`;
          }, time - 0.1);
        }, `${bar - 1}:0:${i}`);
      }
    });
    console.log(triangleSequence);
    await Tone.start();
    Tone.Transport.bpm.value = bpm;
    setSetting((prevSetting) => ({ ...prevSetting, bpm }));
    Tone.Transport.start();
    setPlaying(Tone.Transport.state);
  };

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
      <BPM bpm={bpm} setBpm={setBpm} stopHandler={stopHandler} />
      <ThemeProvider theme={{ width: "70px", height: "80px" }}>
        <Button type="button" onClick={stopHandler}>
          stop
        </Button>
        <Button type="button" onClick={playHandler}>
          {playing === "started" ? "pause" : "play"}
        </Button>
      </ThemeProvider>
      <NoteValue noteValue={noteValue} setNoteValue={setNoteValue} stopHandler={stopHandler} />

      <Bar
        triangleDegrees={triangleDegrees}
        totalBars={totalBars}
        setTotalBars={setTotalBars}
        setTriangleSequence={setTriangleSequence}
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
