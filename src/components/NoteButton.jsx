import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import overBarConverter from "../utils/overBarConverter";
import SelectedNote from "./SelectedNote";

export default function NoteButton({
  track,
  degree,
  totalBars,
  setTotalBars,
  sequence,
  setSequence,
  playing,
  setPlaying,
  noteValue,
  sharpFlat,
}) {
  const buttonNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const stopTransport = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    setPlaying(Tone.Transport.state);
  };
  const addSequence = (inputTrack, inputDegree, bar, number) => () => {
    if (playing !== "stopped") {
      stopTransport();
    }
    const normalNote = {
      ...sequence,
      [inputTrack]: {
        ...sequence[inputTrack],
        [inputDegree]: [
          ...sequence[inputTrack][inputDegree],
          {
            bar,
            number,
            noteValue,
            display: "normal",
            overBar: false,
            sharpFlat,
          },
        ],
      },
    };
    const longerNote = {
      ...sequence,
      [inputTrack]: {
        ...sequence[inputTrack],
        [inputDegree]: [
          ...sequence[inputTrack][inputDegree],
          {
            bar,
            number,
            noteValue,
            display: "longer",
            overBar: false,
            sharpFlat,
          },
        ],
      },
    };
    const longerOverBarNote = {
      ...sequence,
      [inputTrack]: {
        ...sequence[inputTrack],
        [inputDegree]: [
          ...sequence[inputTrack][inputDegree],
          {
            bar,
            number,
            noteValue,
            display: "longer",
            overBar: true,
            sharpFlat,
          },
        ],
      },
    };
    if (noteValue === "16n") {
      setSequence(normalNote);
    }
    if (noteValue === "8n") {
      if (bar === totalBars[totalBars.length - 1] && number + 1 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 1 > 15) {
          return longerOverBarNote;
        }
        if ((number + 1) % 4 === 0) {
          return longerNote;
        }
        return normalNote;
      });
      removeRepeatNotes("8n");
    }
    if (noteValue === "8n.") {
      if (bar === totalBars[totalBars.length - 1] && number + 2 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 2 > 15) {
          return longerOverBarNote;
        }
        if ((number + 1) % 4 === 0 || (number + 2) % 4 === 0) {
          return longerNote;
        }
        return normalNote;
      });
      removeRepeatNotes("8n.");
    }
    if (noteValue === "4n") {
      if (bar === totalBars[totalBars.length - 1] && number + 3 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 3 > 15) {
          return longerOverBarNote;
        }
        if (number % 4 !== 0) {
          return longerNote;
        }
        return normalNote;
      });
      removeRepeatNotes("4n");
    }
    if (noteValue === "4n.") {
      if (bar === totalBars[totalBars.length - 1] && number + 5 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 5 > 15) {
          return longerOverBarNote;
        }
        if (number % 4 === 3) {
          return longerNote;
        }
        return normalNote;
      });
      removeRepeatNotes("4n.");
    }
    if (noteValue === "2n") {
      if (bar === totalBars[totalBars.length - 1] && number + 7 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 7 > 15 && number % 4 !== 0) {
          return longerOverBarNote;
        }
        if (number % 4 !== 0) {
          return longerNote;
        }
        return normalNote;
      });
      removeRepeatNotes("2n");
    }
    if (noteValue === "2n.") {
      if (bar === totalBars[totalBars.length - 1] && number + 11 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 11 > 15 && number % 4 !== 0) {
          return longerOverBarNote;
        }
        if (number % 4 !== 0) {
          return longerNote;
        }
        return normalNote;
      });
      removeRepeatNotes("2n.");
    }

    if (noteValue === "1n") {
      if (bar === totalBars[totalBars.length - 1] && number + 15 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 15 > 15 && number % 4 !== 0) {
          return longerOverBarNote;
        }
        if (number % 4 !== 0) {
          return longerNote;
        }
        return normalNote;
      });
      removeRepeatNotes("1n");
    }
    function removeRepeatNotes(inputNoteValue) {
      setSequence((prevSequence) => {
        const targetArray = overBarConverter(bar, number, inputNoteValue);
        const result = prevSequence[track][inputDegree].filter((item) => {
          let isKeep = true;
          targetArray.forEach((target) => {
            if (item.bar === target[0] && item.number === target[1]) {
              isKeep = false;
            }
          });
          return isKeep;
        });
        return {
          ...prevSequence,
          [track]: { ...prevSequence[track], [inputDegree]: result },
        };
      });
    }
  };

  const removeSequence = (inputTrack, inputDegree, bar, number) => () => {
    stopTransport();
    setSequence({
      ...sequence,
      [inputTrack]: {
        ...sequence[inputTrack],
        [inputDegree]: sequence[inputTrack][inputDegree].filter(
          (item) => !(item.bar === bar && item.number === number),
        ),
      },
    });
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
                onClick={addSequence(track, degree, bar, number)}
              />
              <SelectedNote
                sequence={sequence}
                info={{
                  track,
                  degree,
                  bar,
                  number,
                }}
                onClick={removeSequence(track, degree, bar, number)}
              />
            </ButtonDiv>
          </React.Fragment>
        );
      }
      return (
        <ButtonDiv key={number} className={`button-${bar}-${number}`}>
          <Button
            className={`${track}-${degree}-${bar}-${number}-16n`}
            onClick={addSequence(track, degree, bar, number)}
          />
          <SelectedNote
            sequence={sequence}
            info={{
              track,
              degree,
              bar,
              number,
            }}
            onClick={removeSequence(track, degree, bar, number)}
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
