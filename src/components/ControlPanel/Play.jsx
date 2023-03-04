import React, { useContext, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import { Scale, Note, transpose } from "tonal";
import Button from "../Button";
import SoundContext from "../../contexts/SoundContext";

export default function Play({
  playing, setPlaying, totalBars, sequence, setting, stopHandler,
}) {
  const [loop, setLoop] = useState(false);
  const soundContext = useContext(SoundContext);
  const playHandler = async () => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
    if (playing === "started") {
      stopHandler();
      return;
    }
    const lastBar = totalBars[totalBars.length - 1];
    const key = Scale.degrees(setting.key);
    const tracks = Object.keys(sequence);
    tracks.forEach((track) => {
      const allDegrees = Object.keys(sequence[track]);
      allDegrees.forEach((degree) => {
        if (sequence[track][degree].length !== 0) {
          let sound;
          if (track === "Drum") {
            sound = soundContext[track][degree];
            sequence[track][degree].forEach((item) => {
              Tone.Transport.schedule((time) => {
                sound.start(time);
              }, `${item.bar - 1}:0:${item.number}`);
            });
            return;
          }
          if (track === "Sine") {
            sound = new Tone.Synth().toDestination();
          } else {
            sound = soundContext[track];
          }
          sequence[track][degree].forEach((item) => {
            Tone.Transport.schedule((time) => {
              if (item.sharpFlat === "sharp") {
                const note = Note.simplify(transpose(key(degree), "2m"));
                sound.triggerAttackRelease(note, item.noteValue, time);
              } else if (item.sharpFlat === "flat") {
                const note = Note.simplify(transpose(key(degree), "-2m"));
                sound.triggerAttackRelease(note, item.noteValue, time);
              } else {
                sound.triggerAttackRelease(Note.simplify(key(degree)), item.noteValue, time);
              }
            }, `${item.bar - 1}:0:${item.number}`);
          });
        }
      });
    });

    totalBars.forEach((bar) => {
      for (let i = 0; i < 16; i += 1) {
        Tone.Transport.schedule((time) => {
          Tone.Draw.schedule(() => {
            const playBar = document.querySelectorAll("div.play-bar");
            const gap = Math.floor(i / 4) * 20;
            const height = (bar - 1) * 720 + i * 40 + gap;
            playBar.forEach((element) => {
              const target = element;
              target.style.top = `${height}px`;
            });
          }, time - 0.1);
        }, `${bar - 1}:0:${i}`);
      }
    });
    if (loop) {
      Tone.Transport.loop = true;
      Tone.Transport.loopStart = 0;
      Tone.Transport.loopEnd = `${lastBar}:0:0`;
    } else {
      Tone.Transport.schedule((time) => {
        Tone.Transport.stop(time);
        Tone.Transport.cancel(0);
        setPlaying(Tone.Transport.state);
      }, `${lastBar}:0:0`);
    }
    Tone.Transport.bpm.value = setting.bpm;
    Tone.Transport.start();
    await Tone.start();
    setPlaying(Tone.Transport.state);
  };

  return (
    <>
      <Button type="button" onClick={playHandler}>
        {playing === "started" ? (
          <img alt="stop" src="images/icons/stop.svg" />
        ) : (
          <img alt="play" src="images/icons/play.svg" />
        )}
      </Button>

      {loop ? (
        <SelectedButton
          onClick={(e) => {
            stopHandler();
            if (loop) {
              setLoop(false);
              e.target.style.background = "var(--button-default-color)";
              return;
            }
            setLoop(true);
            e.target.style.background = "var(--button-selected-color)";
          }}
        >
          <SelectedImg alt="loop" src="images/icons/loop.svg" />
        </SelectedButton>
      ) : (
        <StyledButton
          onClick={(e) => {
            stopHandler();
            if (loop) {
              setLoop(false);
              e.target.style.background = "var(--button-default-color)";
              return;
            }
            setLoop(true);
            e.target.style.background = "var(--button-selected-color)";
          }}
        >
          <img alt="loop" src="images/icons/loop.svg" />
        </StyledButton>
      )}
    </>
  );
}
const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SelectedButton = styled(StyledButton)`
  background: var(--button-selected-color);
`;

const SelectedImg = styled.img`
  background: var(--button-selected-color);
`;
