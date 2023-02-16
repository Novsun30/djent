import React from "react";
import styled from "styled-components";
import { Scale } from "tonal";
import * as Tone from "tone";
import overBarConverter from "../utils/overBarConverter";
import SelectedNote from "./SelectedNote";

export default function NoteButton({
  track,
  currentKey,
  degree,
  totalBars,
  setTotalBars,
  sequence,
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
  const addSequence = (inputDegree, bar, number) => () => {
    if (playing !== "stopped") {
      stopTransport();
    }
    if (noteValue === "16n") {
      setSequence({
        ...sequence,
        [inputDegree]: [
          ...sequence[inputDegree],
          {
            bar,
            number,
            noteValue,
            display: "normal",
            overBar: false,
          },
        ],
      });
    }
    if (noteValue === "8n") {
      if (bar === totalBars[totalBars.length - 1] && number + 1 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 1 > 15) {
          return {
            ...sequence,
            [inputDegree]: [
              ...sequence[inputDegree],
              {
                bar,
                number,
                noteValue,
                display: "longer",
                overBar: true,
              },
            ],
          };
        }
        if ((number + 1) % 4 === 0) {
          return {
            ...sequence,
            [inputDegree]: [
              ...sequence[inputDegree],
              {
                bar,
                number,
                noteValue,
                display: "longer",
                overBar: false,
              },
            ],
          };
        }
        return {
          ...sequence,
          [inputDegree]: [
            ...sequence[inputDegree],
            {
              bar,
              number,
              noteValue,
              display: "normal",
              overBar: false,
            },
          ],
        };
      });
      removeRepeatNotes("8n");
    }
    if (noteValue === "4n") {
      if (bar === totalBars[totalBars.length - 1] && number + 3 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 3 > 15) {
          return {
            ...sequence,
            [inputDegree]: [
              ...sequence[inputDegree],
              {
                bar,
                number,
                noteValue,
                display: "longer",
                overBar: true,
              },
            ],
          };
        }
        if (number % 4 !== 0) {
          return {
            ...sequence,
            [inputDegree]: [
              ...sequence[inputDegree],
              {
                bar,
                number,
                noteValue,
                display: "longer",
                overBar: false,
              },
            ],
          };
        }
        return {
          ...sequence,
          [inputDegree]: [
            ...sequence[inputDegree],
            {
              bar,
              number,
              noteValue,
              display: "normal",
              overBar: false,
            },
          ],
        };
      });
      removeRepeatNotes("4n");
    }

    if (noteValue === "2n") {
      if (bar === totalBars[totalBars.length - 1] && number + 7 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 7 > 15 && number % 4 !== 0) {
          return {
            ...sequence,
            [inputDegree]: [
              ...sequence[inputDegree],
              {
                bar,
                number,
                noteValue,
                display: "longer",
                overBar: true,
              },
            ],
          };
        }
        if (number % 4 !== 0) {
          return {
            ...sequence,
            [inputDegree]: [
              ...sequence[inputDegree],
              {
                bar,
                number,
                noteValue,
                display: "longer",
                overBar: false,
              },
            ],
          };
        }
        return {
          ...sequence,
          [inputDegree]: [
            ...sequence[inputDegree],
            {
              bar,
              number,
              noteValue,
              display: "normal",
              overBar: false,
            },
          ],
        };
      });
      removeRepeatNotes("2n");
    }

    if (noteValue === "1n") {
      if (bar === totalBars[totalBars.length - 1] && number + 15 > 15) {
        setTotalBars([...totalBars, totalBars.length + 1]);
      }
      setSequence(() => {
        if (number + 15 > 15 && number % 4 !== 0) {
          return {
            ...sequence,
            [inputDegree]: [
              ...sequence[inputDegree],
              {
                bar,
                number,
                noteValue,
                display: "longer",
                overBar: true,
              },
            ],
          };
        }
        if (number % 4 !== 0) {
          return {
            ...sequence,
            [inputDegree]: [
              ...sequence[inputDegree],
              {
                bar,
                number,
                noteValue,
                display: "longer",
                overBar: false,
              },
            ],
          };
        }
        return {
          ...sequence,
          [inputDegree]: [
            ...sequence[inputDegree],
            {
              bar,
              number,
              noteValue,
              display: "normal",
              overBar: false,
            },
          ],
        };
      });
      removeRepeatNotes("1n");
    }
    function removeRepeatNotes(inputNoteValue) {
      setSequence((prevSequence) => {
        const targetArray = overBarConverter(bar, number, inputNoteValue);
        const result = prevSequence[inputDegree].filter((item) => {
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
          [inputDegree]: result,
        };
      });
    }
  };

  const removeSequence = (inputDegree, bar, number) => () => {
    setSequence({
      ...sequence,
      [inputDegree]: sequence[inputDegree].filter(
        (item) => !(item.bar === bar && item.number === number),
      ),
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
                onClick={addSequence(degree, bar, number)}
              />
              <SelectedNote
                sequence={sequence}
                info={{
                  degree,
                  bar,
                  number,
                }}
                onClick={removeSequence(degree, bar, number)}
              />
            </ButtonDiv>
          </React.Fragment>
        );
      }
      return (
        <ButtonDiv key={number} className={`button-${bar}-${number}`}>
          <Button
            className={`${track}-${degree}-${bar}-${number}-16n`}
            onClick={addSequence(degree, bar, number)}
          />
          <SelectedNote
            sequence={sequence}
            info={{
              degree,
              bar,
              number,
            }}
            onClick={removeSequence(degree, bar, number)}
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
