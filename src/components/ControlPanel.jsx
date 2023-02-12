import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import * as Tone from "tone";
import Button from "./Button";

export default function ControlPanel({
  synthSequence,
  setting,
  setSetting,
  setTotalBars,
  setSynthSequence,
  totalBars,
  playing,
  setPlaying,
  noteValue,
  setNoteValue,
}) {
  const [bpm, setBpm] = useState(setting.bpm);
  useEffect(() => {
    if (playing === "stopped") {
      const startNoteButtonDiv = document.querySelectorAll("div.button-1-0");
      startNoteButtonDiv.forEach((item) => {
        const button = item;
        button.style.background = "var(--play-indicator-color)";
      });
      removePausedColor();
    }
    if (playing === "paused") {
      const target = Tone.Transport.position.slice(0, 5).split(":");
      const targetBar = Number(target[0]) + 1;
      const targetBeat = Number(target[1]) * 4 + Number(target[2]);
      const noteButtonDiv = document.querySelectorAll(`div.button-${targetBar}-${targetBeat}`);
      Tone.Draw.schedule(() => {
        noteButtonDiv.forEach((item) => {
          const button = item;
          button.style.background = "var(--play-indicator-color)";
          button.classList.add("paused");
        });
      }, "+28n");
    }
  }, [totalBars, playing, synthSequence]);
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
    const notes = Object.keys(synthSequence);
    for (let i = 0; i < notes.length; i += 1) {
      const synth = new Tone.Synth().toDestination();
      synth.volume.value = -5;
      if (synthSequence[notes[i]].length !== 0) {
        for (let j = 0; j < synthSequence[notes[i]].length; j += 1) {
          Tone.Transport.schedule(() => {
            synth.triggerAttackRelease(notes[i], synthSequence[notes[i]][j][2]);
          }, `${synthSequence[notes[i]][j][0] - 1}:0:${synthSequence[notes[i]][j][1]}`);
        }
      }
    }
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

  const stopHandler = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    setPlaying(Tone.Transport.state);
  };

  const addBar = () => {
    stopHandler();
    setTotalBars((prevTotalBars) => [...prevTotalBars, prevTotalBars.length + 1]);
  };

  const reduceBar = () => {
    stopHandler();
    setTotalBars((prevTotalBars) => {
      const newTotalBars = [...prevTotalBars];
      const removeTargetBar = newTotalBars.pop();
      setSynthSequence((prevSynthSequence) => {
        const newSynthSequence = prevSynthSequence;
        Object.values(newSynthSequence).forEach((noteArrays) => {
          if (noteArrays.length !== 0) {
            const targetIndex = [];
            for (let i = 0; i < noteArrays.length; i += 1) {
              if (noteArrays[i][0] === removeTargetBar) {
                targetIndex.push(i);
              }
            }
            for (let i = 0; i < targetIndex.length; i += 1) {
              noteArrays.splice(targetIndex[i], 1);
            }
          }
        });
        return newSynthSequence;
      });
      return newTotalBars;
    });
  };
  const bpmChangeHandler = (e) => {
    stopHandler();
    if (e.target.value > 300) {
      setBpm(300);
      return;
    }
    if (e.target.value < 20) {
      setBpm(20);
      return;
    }
    setBpm(e.target.value);
  };
  const addBpm = () => {
    stopHandler();
    setBpm((prevBpm) => {
      let newBpm = Number(prevBpm) + 1;
      if (newBpm > 300) {
        newBpm = 300;
      }
      return newBpm;
    });
  };
  const reduceBpm = () => {
    stopHandler();
    setBpm((prevBpm) => {
      let newBpm = Number(prevBpm) - 1;
      if (newBpm < 20) {
        newBpm = 20;
      }
      return newBpm;
    });
  };
  function keyFormat(key) {
    return `${key.split(" ")[0][0]} ${key.split(" ")[1]}`;
  }

  function removePausedColor() {
    const pausedNoteButtonDiv = document.querySelectorAll("div.paused");
    pausedNoteButtonDiv.forEach((item) => {
      const button = item;
      item.classList.remove("paused");
      button.style.background = "var(--main-background-color)";
    });
  }

  return (
    <ContainerDiv>
      <KeyDiv>
        <KeyText>Key</KeyText>
        <KeyContent>{keyFormat(setting.key)}</KeyContent>
      </KeyDiv>
      <BpmDiv>
        <BpmText>BPM</BpmText>
        <BpmControlDiv>
          <ThemeProvider theme={{ width: "30px" }}>
            <Button type="button" onClick={reduceBpm}>
              -
            </Button>
            <BpmInput value={bpm} onChange={bpmChangeHandler} />
            <Button type="button" onClick={addBpm}>
              +
            </Button>
          </ThemeProvider>
        </BpmControlDiv>
      </BpmDiv>
      <ThemeProvider theme={{ width: "70px", height: "80px" }}>
        <Button type="button" onClick={stopHandler}>
          stop
        </Button>
        <Button type="button" onClick={playHandler}>
          {playing === "started" ? "pause" : "play"}
        </Button>
      </ThemeProvider>

      <NoteValueDiv>
        <NoteValueTitle>Note Value</NoteValueTitle>
        <NoteValueButton
          noteValue={noteValue}
          setNoteValue={setNoteValue}
          playing={playing}
          setPlaying={setPlaying}
        />
      </NoteValueDiv>
      <BarDiv>
        <ThemeProvider theme={{ width: "75px", height: "45px", margin: "3px" }}>
          <Button onClick={reduceBar}>- bar</Button>
          <Button onClick={addBar}>+ bar</Button>
        </ThemeProvider>
      </BarDiv>
    </ContainerDiv>
  );
}

function NoteValueButton({
  noteValue, setNoteValue, playing, setPlaying,
}) {
  useEffect(() => {
    const defaultButton = document.querySelector(`button.note-value-${noteValue}`);
    defaultButton.style.background = "#AAA";
  }, []);

  const noteValueSelector = (e) => {
    if (playing === "started") {
      return;
    }
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    setPlaying(Tone.Transport.state);
    const prevButton = document.querySelector(`button.note-value-${noteValue}`);
    prevButton.style.background = "var(--main-button-color)";
    e.target.style.background = "#AAA";

    setNoteValue(`${e.target.textContent.replace("1/", "")}n`);
  };
  const noteValueArray = ["1n", "2n", "4n", "8n", "16n"];
  const noteValueButtons = noteValueArray.map((currentNoteValue) => (
    <Button
      key={`note-value-${currentNoteValue}`}
      onClick={noteValueSelector}
      className={`note-value-${currentNoteValue}`}
    >
      {`${currentNoteValue.replace("n", "")}` === "1"
        ? "1"
        : `1/${currentNoteValue.replace("n", "")}`}
    </Button>
  ));
  return (
    <NoteValueButtonDiv>
      <ThemeProvider theme={{ width: "55px", height: "45px", margin: "2px" }}>
        {noteValueButtons}
      </ThemeProvider>
    </NoteValueButtonDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
`;

const BpmDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const BpmInput = styled.input`
  border: none;
  background: var(--main-background-color);
  color: #eee;
  font-size: 20px;
  width: 70px;
  padding: 5px;
  margin: 0 5px;
  text-align: center;
`;

const BpmControlDiv = styled.div``;

const BpmText = styled.p`
  color: #eee;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const KeyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const KeyText = styled.p`
  color: #eee;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const KeyContent = styled.p`
  border: none;
  background: var(--main-background-color);
  color: #eee;
  font-size: 20px;
  width: 100px;
  padding: 5px;
  text-align: center;
`;

const BarDiv = styled.div`
  display: flex;
  align-items: center;
`;

const NoteValueButtonDiv = styled.div`
  display: flex;
`;

const NoteValueDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;
const NoteValueTitle = styled.p`
  color: #eee;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
`;
