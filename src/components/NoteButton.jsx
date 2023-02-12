import React, { useRef, useState } from "react";
import styled from "styled-components";
import * as Tone from "tone";
import { Scale } from "tonal";

export default function NoteButton({
  currentKey,
  track,
  degree,
  currentBar,
  setSequence,
  sequence,
}) {
  const majorKey = Scale.degrees(currentKey);
  const buttonNumbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];

  const handler = (note, bar, number) => (e) => {
    if (e.target.parentElement.children[1].checked === true) {
      e.target.style.background = "var(--primary-color)";
      e.target.parentElement.children[1].checked = false;
      setSequence(
        sequence.filter(
          (item) => item.track !== track
            || item.bar !== bar
            || item.number !== number
            || item.note !== note,
        ),
      );

      return;
    }
    setSequence((prevSequence) => [
      ...prevSequence,
      {
        track,
        bar,
        number,
        note,
      },
    ]);

    e.target.style.background = "#F91";
    e.target.parentElement.children[1].checked = true;
  };

  const buttons = buttonNumbers.map((number) => {
    if (number === "4" || number === "8" || number === "12") {
      return (
        <ButtonDiv key={number}>
          <Button onMouseDown={handler(majorKey(degree), currentBar, number)} />
          <Input type="checkbox" />
          <Hr />
        </ButtonDiv>
      );
    }
    return (
      <ButtonDiv key={number}>
        <Button onMouseDown={handler(majorKey(degree), currentBar, number)} />
        <Input type="checkbox" />
      </ButtonDiv>
    );
  });

  return (
    <Div>
      <Hr />
      {buttons}
    </Div>
  );
}

const Button = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 5px;
  background: #fff6ee;
  border-radius: 5px;
`;
const Input = styled.input`
  position: absolute;
  top: 35%;
  left: 35%;
  z-index: -1;
`;
const ButtonDiv = styled.div`
  position: relative;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr`
  border-color: #666;
  margin: 10px 0;
`;
