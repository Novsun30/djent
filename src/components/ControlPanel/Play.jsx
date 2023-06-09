import React, { useContext, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import { Scale, Note, transpose } from "tonal";
import Button from "../Button";
import SoundContext from "../../contexts/SoundContext";
import playImage from "../../assets/images/icons/play.svg";
import stopImage from "../../assets/images/icons/stop.svg";
import loopImage from "../../assets/images/icons/loop.svg";

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
    window.scroll({
      top: 0,
      behavior: "instant",
    });
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
          if (bar === 1 && i === 0) {
            window.scroll({
              top: 0,
              behavior: "instant",
            });
          }
          Tone.Draw.schedule(() => {
            const playBar = document.querySelectorAll("div.play-bar");
            const gap = Math.floor(i / 4) * 20;
            const height = (bar - 1) * 720 + i * 40 + gap;
            playBar.forEach((element) => {
              const target = element;
              if (bar === 1 && i === 0) {
                target.style.top = "0";
              }
              // target.style.top = `${height}px`;
              target.style.transform = `translate(0, ${height}px)`;

              if (setting.bpm > 120 && setting.bpm <= 180) {
                if (i % 2 === 0) {
                  target.scrollIntoView({ block: "center" });
                }
              } else if (setting.bpm > 180 && setting.bpm <= 220) {
                if (i % 3 === 0) {
                  target.scrollIntoView({ block: "center" });
                }
              } else if (setting.bpm > 220 && setting.bpm <= 260) {
                if (i % 4 === 0) {
                  target.scrollIntoView({ block: "center" });
                }
              } else if (setting.bpm > 260) {
                if (i % 5 === 0) {
                  target.scrollIntoView({ block: "center" });
                }
              } else {
                target.scrollIntoView({ block: "center" });
              }
            });

            // playBar.scrollIntoView({ block: "center" });
            // window.scroll(0, height - 250);
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
  const loopSwitch = (e) => {
    stopHandler();
    if (loop) {
      setLoop(false);
      e.target.style.background = "var(--button-default-color)";
      return;
    }
    setLoop(true);
    e.target.style.background = "var(--button-selected-color)";
  };
  return (
    <Container>
      <StyledButton type="button" onClick={playHandler}>
        {playing === "started" ? (
          <StyledImage alt="stop" src={stopImage} />
        ) : (
          <StyledImage alt="play" src={playImage} />
        )}
      </StyledButton>
      {loop ? (
        <SelectedButton onClick={loopSwitch}>
          <SelectedImg alt="loop" src={loopImage} />
        </SelectedButton>
      ) : (
        <StyledButton onClick={loopSwitch}>
          <StyledImage alt="loop" src={loopImage} />
        </StyledButton>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  margin: 2px;
  @media screen and (max-width: 750px) {
    width: 35px;
    height: 35px;
  }
  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;
const StyledImage = styled.img`
  @media screen and (max-width: 750px) {
    width: 22px;
  }
  @media screen and (max-width: 480px) {
    width: 18px;
  }
`;
const SelectedButton = styled(StyledButton)`
  background: var(--button-selected-color);
`;

const SelectedImg = styled.img`
  background: var(--button-selected-color);
  @media screen and (max-width: 480px) {
    width: 18px;
  }
`;
