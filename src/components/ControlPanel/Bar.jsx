import React from "react";
import styled from "styled-components";
import Button from "../Button";

export default function Bar({
  triangleDegrees,
  totalBars,
  setTotalBars,
  setTriangleSequence,
  stopHandler,
}) {
  const addBar = () => {
    stopHandler();
    setTotalBars((prevTotalBars) => [...prevTotalBars, prevTotalBars.length + 1]);
  };

  const reduceBar = () => {
    stopHandler();
    if (totalBars.length === 1) {
      return;
    }
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
  return (
    <BarDiv>
      <PlusMinusButton onClick={reduceBar}>- bar</PlusMinusButton>
      <PlusMinusButton onClick={addBar}>+ bar</PlusMinusButton>
    </BarDiv>
  );
}
const BarDiv = styled.div`
  display: flex;
  align-items: center;
`;

const PlusMinusButton = styled(Button)`
  width: 75px;
  height: 45px;
  margin: 3px;
`;
