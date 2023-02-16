import React from "react";
import styled from "styled-components";

export default function SelectedNote({ onClick, info, sequence }) {
  for (let i = 0; i < sequence[info.degree].length; i += 1) {
    const target = sequence[info.degree][i];
    if (target.bar === info.bar && target.number === info.number) {
      if (target.noteValue === "16n") {
        return <SixteenthNote onClick={onClick} />;
      }
      if (target.noteValue === "8n" && target.display === "normal") {
        return <EighthNote onClick={onClick} />;
      }
      if (target.noteValue === "8n" && target.display === "longer") {
        return <EighthLonger onClick={onClick} />;
      }
      if (target.noteValue === "4n" && target.display === "normal") {
        return <QuarterNote onClick={onClick} />;
      }
      if (target.noteValue === "4n" && target.display === "longer") {
        return <QuarterLonger onClick={onClick} />;
      }
      if (target.noteValue === "2n" && target.display === "normal") {
        return <HalfNote onClick={onClick} />;
      }
      if (target.noteValue === "2n" && target.display === "longer") {
        return <HalfLonger onClick={onClick} />;
      }
      if (target.noteValue === "1n" && target.display === "normal") {
        return <WholeNote onClick={onClick} />;
      }
      if (target.noteValue === "1n" && target.display === "longer") {
        return <WholeLonger onClick={onClick} />;
      }
    }
  }
  return null;
}

const SixteenthNote = styled.button`
  display: block;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 5px 10px;
  background: var(--note-selected-color);
  border-radius: 5px;
`;

const EighthNote = styled(SixteenthNote)`
  height: 70px;
`;

const EighthLonger = styled(SixteenthNote)`
  height: 90px;
`;

const QuarterNote = styled(SixteenthNote)`
  height: 150px;
`;

const QuarterLonger = styled(SixteenthNote)`
  height: 170px;
`;

const HalfNote = styled(SixteenthNote)`
  height: 330px;
`;

const HalfLonger = styled(SixteenthNote)`
  height: 350px;
`;

const WholeNote = styled(SixteenthNote)`
  height: 690px;
`;

const WholeLonger = styled(SixteenthNote)`
  height: 710px;
`;
