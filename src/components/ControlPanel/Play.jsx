import React from "react";
import styled from "styled-components";
import * as Tone from "tone";
import { Scale, Note } from "tonal";

export default function Play() {
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
      removePausedColor();
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
        Tone.Transport.schedule(() => {
          const indicator = document.querySelector(`button.indicator-${bar}-${i}`);
          const noteButtonDiv = document.querySelectorAll(`div.button-${bar}-${i}`);
          indicator.style.background = "#000";
          noteButtonDiv.forEach((item) => {
            const button = item;
            button.style.background = "var(--play-indicator-color)";
          });

          Tone.Draw.schedule(() => {
            indicator.style.background = "var(--play-indicator-color)";
            noteButtonDiv.forEach((item) => {
              const button = item;
              button.style.background = "var(--main-background-color)";
            });
          }, "+30n");
        }, `${bar - 1}:0:${i}`);
      }
    });
    await Tone.start();
    Tone.Transport.bpm.value = bpm;
    setSetting((prevSetting) => ({ ...prevSetting, bpm }));
    Tone.Transport.start();
    setPlaying(Tone.Transport.state);
  };
}
