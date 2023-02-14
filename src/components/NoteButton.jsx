import React from "react";
import styled from "styled-components";
import { Scale } from "tonal";
import * as Tone from "tone";
import overBarConverter from "../utils/overBarConverter";

export default function NoteButton({
  track,
  currentKey,
  degree,
  totalBars,
  setTotalBars,
  setSequence,
  playing,
  setPlaying,
  noteValue,
}) {
  const key = Scale.degrees(currentKey);
  const buttonNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const stopTransport = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    setPlaying(Tone.Transport.state);
  };
  const editSequence = (inputDegree, bar, number) => (e) => {
    if (playing !== "stopped") {
      stopTransport();
    }
    if (e.target.checked === true) {
      e.target.style.background = "var(--note-color)";
      e.target.checked = false;

      setSequence((prevSequence) => {
        const newSeq = prevSequence;
        newSeq[inputDegree] = newSeq[inputDegree].filter(
          (item) => !(item[0] === bar && item[1] === number && item[2] === noteValue),
        );
        return newSeq;
      });
      return;
    }
    setSequence((prevSequence) => {
      const newSeq = prevSequence;
      newSeq[inputDegree].push([bar, number, noteValue]);
      return newSeq;
    });
    if (noteValue === "16n") {
      e.target.style.background = "var(--note-selected-color)";
      e.target.checked = true;
      return;
    }

    const targetParent = e.target.parentElement;
    if (noteValue === "8n") {
      const button8n = document.createElement("button");
      if (bar === totalBars[totalBars.length - 1] && number + 1 > 15) {
        setTotalBars((prevTotalBars) => [...prevTotalBars, prevTotalBars.length + 1]);
      }
      if (number + 1 > 15) {
        button8n.classList.add(`overbar-${bar}`);
        button8n.info = {
          track,
          inputDegree,
          bar,
          number,
        };
      }
      button8n.classList.add("eighth-note", `${track}-${inputDegree}-${bar}-${number}`);
      button8n.addEventListener("click", () => {
        stopTransport();
        button8n.remove();
        setSequence((prevSequence) => {
          const newSeq = prevSequence;
          newSeq[inputDegree] = newSeq[inputDegree].filter(
            (item) => !(item[0] === bar && item[1] === number && item[2] === noteValue),
          );
          return newSeq;
        });
      });
      if ((number + 1) % 4 === 0) {
        button8n.classList.add("eighth-note-longer");
      }
      targetParent.appendChild(button8n);

      removeRepeatNotes("8n");
    }

    if (noteValue === "4n") {
      const button4n = document.createElement("button");
      if (bar === totalBars[totalBars.length - 1] && number + 3 > 15) {
        setTotalBars((prevTotalBars) => [...prevTotalBars, prevTotalBars.length + 1]);
      }
      if (number + 3 > 15) {
        button4n.classList.add(`overbar-${bar}`);
        button4n.info = {
          track,
          inputDegree,
          bar,
          number,
        };
      }

      button4n.classList.add("quarter-note", `${track}-${inputDegree}-${bar}-${number}`);
      button4n.addEventListener("click", () => {
        stopTransport();
        button4n.remove();
        setSequence((prevSequence) => {
          const newSeq = prevSequence;
          newSeq[inputDegree] = newSeq[inputDegree].filter(
            (item) => !(item[0] === bar && item[1] === number && item[2] === noteValue),
          );
          return newSeq;
        });
      });
      if (number % 4 !== 0) {
        button4n.classList.add("quarter-note-longer");
      }
      targetParent.appendChild(button4n);
      removeRepeatNotes("4n");
    }

    if (noteValue === "2n") {
      const button2n = document.createElement("button");
      if (bar === totalBars[totalBars.length - 1] && number + 7 > 15) {
        setTotalBars((prevTotalBars) => [...prevTotalBars, prevTotalBars.length + 1]);
      }
      if (number + 7 > 15) {
        button2n.classList.add(`overbar-${bar}`);
        button2n.info = {
          track,
          inputDegree,
          bar,
          number,
        };
      }
      button2n.classList.add("half-note", `${track}-${inputDegree}-${bar}-${number}`);
      button2n.addEventListener("click", () => {
        stopTransport();
        button2n.remove();
        setSequence((prevSequence) => {
          const newSeq = prevSequence;
          newSeq[inputDegree] = newSeq[inputDegree].filter(
            (item) => !(item[0] === bar && item[1] === number && item[2] === noteValue),
          );
          return newSeq;
        });
      });
      if (number % 4 !== 0) {
        button2n.classList.add("half-note-longer");
      }
      targetParent.appendChild(button2n);
      removeRepeatNotes("2n");
    }
    if (noteValue === "1n") {
      const button1n = document.createElement("button");
      if (bar === totalBars[totalBars.length - 1] && number + 15 > 15) {
        setTotalBars((prevTotalBars) => [...prevTotalBars, prevTotalBars.length + 1]);
      }
      if (number + 15 > 15) {
        button1n.classList.add(`overbar-${bar}`);
        button1n.info = {
          track,
          inputDegree,
          bar,
          number,
        };
      }
      button1n.classList.add("whole-note", `${track}-${inputDegree}-${bar}-${number}`);
      button1n.addEventListener("click", () => {
        stopTransport();
        button1n.remove();
        setSequence((prevSequence) => {
          const newSeq = prevSequence;
          newSeq[inputDegree] = newSeq[inputDegree].filter(
            (item) => !(item[0] === bar && item[1] === number && item[2] === noteValue),
          );
          return newSeq;
        });
      });
      if (number % 4 !== 0) {
        button1n.classList.add("whole-note-longer");
      }
      targetParent.appendChild(button1n);
      removeRepeatNotes("1n");
    }

    function removeRepeatNotes(inputNoteValue) {
      setSequence((prevSequence) => {
        const newSeq = prevSequence;
        newSeq[inputDegree] = newSeq[inputDegree].filter((item) => {
          const targetArray = overBarConverter(bar, number, inputNoteValue);
          let result = true;
          targetArray.forEach((target) => {
            if (item[0] === target[0] && item[1] === target[1]) {
              const targetButton = document.querySelector(
                `button.${track}-${key(degree)}-${target[0]}-${target[1]}`,
              );
              if (targetButton !== null) {
                targetButton.remove();
              }
              const target16thNotes = document.querySelector(
                `button.${track}-${key(degree)}-${target[0]}-${target[1]}-16n`,
              );
              if (target16thNotes !== null) {
                target16thNotes.style.background = "var(--note-color)";
                target16thNotes.checked = false;
              }
              result = false;
            }
          });
          return result;
        });
        return newSeq;
      });
    }
  };

  const createButton = totalBars.map((bar) => {
    const result = buttonNumbers.map((number) => {
      if (number % 4 === 0) {
        return (
          <React.Fragment key={number}>
            <HrDiv>
              <CustomHr />
            </HrDiv>
            <ButtonDiv className={`button-${bar}-${number}`}>
              <Button
                className={`${track}-${degree}-${bar}-${number}-16n`}
                onClick={editSequence(degree, bar, number)}
              />
            </ButtonDiv>
          </React.Fragment>
        );
      }
      return (
        <ButtonDiv key={number} className={`button-${bar}-${number}`}>
          <Button
            className={`${track}-${degree}-${bar}-${number}-16n`}
            onClick={editSequence(degree, bar, number)}
          />
        </ButtonDiv>
      );
    });
    return result;
  });

  return <Div>{createButton}</Div>;
}

const Button = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 5px 10px;
  background: var(--note-color);
  border-radius: 5px;
`;

const ButtonDiv = styled.div`
  position: relative;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const HrDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20px;
  width: 100%;
`;

const CustomHr = styled.div`
  height: 2px;
  width: 100%;
  background: #666;
`;
