import React from "react";
import styled from "styled-components";
import * as Tone from "tone";
import { Scale, Note, transpose } from "tonal";
import Button from "../Button";

export default function Play({
  playing,
  setPlaying,
  totalBars,
  sequence,
  setting,
  playBarRef,
  stopHandler,
}) {
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
    const tracks = Object.keys(sequence);
    tracks.forEach((track) => {
      const allDegrees = Object.keys(sequence[track]);
      allDegrees.forEach((degree) => {
        let synth;
        if (track === "triangle") {
          synth = new Tone.Synth().toDestination();
        }
        if (track === "triangleBass") {
          synth = new Tone.Synth({
            oscillator: {
              type: "sine",
            },
            envelope: {
              attack: 0.005,
              decay: 0.1,
              sustain: 0.3,
              release: 1,
            },
          }).toDestination();
        }
        synth.volume.value = -4;
        if (sequence[track][degree].length !== 0) {
          sequence[track][degree].forEach((item) => {
            Tone.Transport.schedule(() => {
              const now = Tone.now();
              if (item.sharpFlat === "sharp") {
                const note = Note.simplify(transpose(key(degree), "2m"));
                synth.triggerAttackRelease(note, item.noteValue, now);
              } else if (item.sharpFlat === "flat") {
                const note = Note.simplify(transpose(key(degree), "-2m"));
                synth.triggerAttackRelease(note, item.noteValue, now);
              } else {
                synth.triggerAttackRelease(Note.simplify(key(degree)), item.noteValue, now);
              }
            }, `${item.bar - 1}:0:${item.number}`);
          });
        }
      });
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
    console.log(sequence);
    await Tone.start();
    Tone.Transport.bpm.value = setting.bpm;
    Tone.Transport.start();
    setPlaying(Tone.Transport.state);
  };

  return (
    <>
      <Button type="button" onClick={stopHandler}>
        stop
      </Button>
      <Button type="button" onClick={playHandler}>
        {playing === "started" ? "pause" : "play"}
      </Button>
    </>
  );
}
