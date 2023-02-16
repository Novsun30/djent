import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import * as Tone from "tone";
import { Scale, transpose, Note } from "tonal";
import Button from "./Button";

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
  }, [totalBars, playing, triangleSequence, setting.key]);

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
    setTriangleSequence((prevSequence) => {
      const targetBar = totalBars[totalBars.length - 1];
      let result = { ...prevSequence };
      triangleDegrees.forEach((element) => {
        const newNotes = prevSequence[element].filter(
          (el) => !(el.bar === targetBar || (el.bar === targetBar - 1 && el.overBar === true)),
        );
        result = { ...result, [element]: newNotes };
      });

      return result;
    });
    setTotalBars((prevTotalBars) => {
      prevTotalBars.pop();
      return [...prevTotalBars];
    });
  };

  const bpmChangeHandler = (e) => {
    stopHandler();
    if (e.target.value > 300) {
      setBpm(300);
      return;
    }
    if (e.target.value < 1) {
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
    return `${key.split(" ")[0].replace(/[34]/, " ")} ${key.split(" ")[1]}`;
  }

  function removePausedColor() {
    const pausedNoteButtonDiv = document.querySelectorAll("div.paused");
    pausedNoteButtonDiv.forEach((item) => {
      const button = item;
      item.classList.remove("paused");
      button.style.background = "var(--main-background-color)";
    });
  }
  const majorMinorSwitcher = () => {
    if (setting.key.split(" ")[1] === "major") {
      setSetting((prevSetting) => {
        const newSetting = prevSetting;
        newSetting.key = prevSetting.key.replace("major", "minor");
        return { ...newSetting };
      });
      return;
    }
    setSetting((prevSetting) => {
      const newSetting = prevSetting;
      newSetting.key = prevSetting.key.replace("minor", "major");
      return { ...newSetting };
    });
  };

  const addKey = () => {
    stopHandler();
    setSetting((prevSetting) => {
      const newSetting = prevSetting;
      let newKey = Note.simplify(transpose(setting.key.split(" ")[0], "2m"));
      if (newKey === "G4") {
        newKey = "G3";
      }
      newSetting.key = `${newKey} ${setting.key.split(" ")[1]}`;
      return { ...newSetting };
    });
  };
  const reduceKey = () => {
    stopHandler();
    setSetting((prevSetting) => {
      const newSetting = prevSetting;
      let newKey = Note.simplify(transpose(setting.key.split(" ")[0], "-2m"));
      if (newKey === "F#3") {
        newKey = "F#4";
      }
      newSetting.key = `${newKey} ${setting.key.split(" ")[1]}`;
      return { ...newSetting };
    });
  };
  return (
    <ContainerDiv>
      <KeyDiv>
        <PlusMinusButton type="button" onClick={reduceKey}>
          -
        </PlusMinusButton>
        <KeyCenterDiv>
          <KeyText>Key</KeyText>
          {" "}
          <KeyContent>{keyFormat(setting.key)}</KeyContent>
          <StyledMajorMinorButton type="button" onClick={majorMinorSwitcher}>
            Major / Minor
          </StyledMajorMinorButton>
        </KeyCenterDiv>

        <PlusMinusButton type="button" onClick={addKey}>
          +
        </PlusMinusButton>
      </KeyDiv>
      <BpmDiv>
        <BpmText>BPM</BpmText>
        <BpmControlDiv>
          <PlusMinusButton type="button" onClick={reduceBpm}>
            -
          </PlusMinusButton>
          <BpmInput value={bpm} onChange={bpmChangeHandler} />
          <PlusMinusButton type="button" onClick={addBpm}>
            +
          </PlusMinusButton>
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
        <NoteValueButtons
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

function NoteValueButtons({
  noteValue, setNoteValue, playing, setPlaying,
}) {
  const noteValueSelector = (inputValue) => () => {
    if (playing === "started") {
      return;
    }
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    setPlaying(Tone.Transport.state);
    setNoteValue(inputValue);
  };
  const noteValueArray = ["1n", "2n", "4n", "8n", "16n"];
  const noteValueButtons = noteValueArray.map((inputNoteValue) => (noteValue === inputNoteValue ? (
    <SelectedNoteValue key={`${inputNoteValue}`} onClick={noteValueSelector(inputNoteValue)}>
      {`${inputNoteValue.replace("n", "")}` === "1"
        ? "1"
        : `1/${inputNoteValue.replace("n", "")}`}
    </SelectedNoteValue>
  ) : (
    <NoteValueButton key={`${inputNoteValue}`} onClick={noteValueSelector(inputNoteValue)}>
      {`${inputNoteValue.replace("n", "")}` === "1"
        ? "1"
        : `1/${inputNoteValue.replace("n", "")}`}
    </NoteValueButton>
  )));
  return <NoteValueButtonDiv>{noteValueButtons}</NoteValueButtonDiv>;
}

const PlusMinusButton = styled(Button)`
  width: 30px;
`;
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

const BpmDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const BpmInput = styled.input`
  border: none;
  background: var(--main-background-color);
  color: var(--main-text-color);
  font-size: 20px;
  width: 70px;
  padding: 5px;
  margin: 0 5px;
  text-align: center;
`;

const BpmControlDiv = styled.div``;

const BpmText = styled.p`
  color: var(--main-text-color);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const KeyDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const KeyCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const KeyText = styled.p`
  color: var(--main-text-color);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const KeyContent = styled.p`
  border: none;
  background: var(--main-background-color);
  color: var(--main-text-color);
  font-size: 20px;
  width: 100px;
  padding: 5px;
  text-align: center;
`;

const BarDiv = styled.div`
  display: flex;
  align-items: center;
`;

const NoteValueButton = styled(Button)`
  width: 55px;
  height: 45px;
  margin: 2px;
`;
const SelectedNoteValue = styled(NoteValueButton)`
  background: #aaa;
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
  color: var(--main-text-color);
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StyledMajorMinorButton = styled(Button)`
  font-size: 16px;
`;
