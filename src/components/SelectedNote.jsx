import React from "react";
import styled from "styled-components";

export default function SelectedNote({ onClick, info, sequence }) {
  for (let i = 0; i < sequence[info.track][info.degree].length; i += 1) {
    const target = sequence[info.track][info.degree][i];
    if (target.bar === info.bar && target.number === info.number) {
      if (target.noteValue === "16n") {
        if (target.sharpFlat === "sharp") {
          return <SixteenthSharp onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <SixteenthFlat onClick={onClick} />;
        }
        return <SixteenthNote onClick={onClick} />;
      }
      if (target.noteValue === "8n" && target.display === "normal") {
        if (target.sharpFlat === "sharp") {
          return <EightSharp onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <EightFlat onClick={onClick} />;
        }
        return <EighthNote onClick={onClick} />;
      }
      if (target.noteValue === "8n" && target.display === "longer") {
        if (target.sharpFlat === "sharp") {
          return <EighthSharpLonger onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <EighthFlatLonger onClick={onClick} />;
        }
        return <EighthLonger onClick={onClick} />;
      }
      if (target.noteValue === "8n." && target.display === "normal") {
        if (target.sharpFlat === "sharp") {
          return <EighthDottedSharp onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <EighthDottedFlat onClick={onClick} />;
        }
        return <EighthDotted onClick={onClick} />;
      }
      if (target.noteValue === "8n." && target.display === "longer") {
        if (target.sharpFlat === "sharp") {
          return <EighthDottedSharpLonger onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <EighthDottedFlatLonger onClick={onClick} />;
        }
        return <EighthDottedLonger onClick={onClick} />;
      }
      if (target.noteValue === "4n" && target.display === "normal") {
        if (target.sharpFlat === "sharp") {
          return <QuarterSharp onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <QuarterFlat onClick={onClick} />;
        }
        return <QuarterNote onClick={onClick} />;
      }
      if (target.noteValue === "4n" && target.display === "longer") {
        if (target.sharpFlat === "sharp") {
          return <QuarterSharpLonger onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <QuarterFlatLonger onClick={onClick} />;
        }
        return <QuarterLonger onClick={onClick} />;
      }
      if (target.noteValue === "4n." && target.display === "normal") {
        if (target.sharpFlat === "sharp") {
          return <QuarterDottedSharp onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <QuarterDottedFlat onClick={onClick} />;
        }
        return <QuarterDotted onClick={onClick} />;
      }
      if (target.noteValue === "4n." && target.display === "longer") {
        if (target.sharpFlat === "sharp") {
          return <QuarterDottedSharpLonger onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <QuarterDottedFlatLonger onClick={onClick} />;
        }
        return <QuarterDottedLonger onClick={onClick} />;
      }
      if (target.noteValue === "2n" && target.display === "normal") {
        if (target.sharpFlat === "sharp") {
          return <HalfSharp onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <HalfFlat onClick={onClick} />;
        }
        return <HalfNote onClick={onClick} />;
      }
      if (target.noteValue === "2n" && target.display === "longer") {
        if (target.sharpFlat === "sharp") {
          return <HalfSharpLonger onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <HalfFlatLonger onClick={onClick} />;
        }
        return <HalfLonger onClick={onClick} />;
      }
      if (target.noteValue === "2n." && target.display === "normal") {
        if (target.sharpFlat === "sharp") {
          return <HalfDottedSharp onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <HalfDottedFlat onClick={onClick} />;
        }
        return <HalfDotted onClick={onClick} />;
      }
      if (target.noteValue === "2n." && target.display === "longer") {
        if (target.sharpFlat === "sharp") {
          return <HalfDottedSharpLonger onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <HalfDottedFlatLonger onClick={onClick} />;
        }
        return <HalfDottedLonger onClick={onClick} />;
      }
      if (target.noteValue === "1n" && target.display === "normal") {
        if (target.sharpFlat === "sharp") {
          return <WholeSharp onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <WholeFlat onClick={onClick} />;
        }
        return <WholeNote onClick={onClick} />;
      }
      if (target.noteValue === "1n" && target.display === "longer") {
        if (target.sharpFlat === "sharp") {
          return <WholeSharpLonger onClick={onClick} />;
        }
        if (target.sharpFlat === "flat") {
          return <WholeFlatLonger onClick={onClick} />;
        }
        return <WholeLonger onClick={onClick} />;
      }
    }
  }
  return null;
}

const SixteenthNote = styled.button`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 5px 10px;
  background: var(--note-selected-color);
  border-radius: 5px;
  @media screen and (max-width: 480px) {
    left: -4px;
  }
`;
const SixteenthSharp = styled(SixteenthNote)`
  background: var(--note-sharp-color);
`;
const SixteenthFlat = styled(SixteenthNote)`
  background: var(--note-flat-color);
`;

const EighthNote = styled(SixteenthNote)`
  height: 70px;
`;
const EightSharp = styled(EighthNote)`
  background: var(--note-sharp-color);
`;
const EightFlat = styled(EighthNote)`
  background: var(--note-flat-color);
`;

const EighthLonger = styled(SixteenthNote)`
  height: 90px;
`;
const EighthSharpLonger = styled(EighthLonger)`
  background: var(--note-sharp-color);
`;
const EighthFlatLonger = styled(EighthLonger)`
  background: var(--note-flat-color);
`;

const EighthDotted = styled(SixteenthNote)`
  height: 110px;
`;
const EighthDottedSharp = styled(EighthDotted)`
  background: var(--note-sharp-color);
`;
const EighthDottedFlat = styled(EighthDotted)`
  background: var(--note-flat-color);
`;

const EighthDottedLonger = styled(SixteenthNote)`
  height: 130px;
`;
const EighthDottedSharpLonger = styled(EighthDottedLonger)`
  background: var(--note-sharp-color);
`;
const EighthDottedFlatLonger = styled(EighthDottedLonger)`
  background: var(--note-flat-color);
`;

const QuarterNote = styled(SixteenthNote)`
  height: 150px;
`;
const QuarterSharp = styled(QuarterNote)`
  background: var(--note-sharp-color);
`;
const QuarterFlat = styled(QuarterNote)`
  background: var(--note-flat-color);
`;

const QuarterLonger = styled(SixteenthNote)`
  height: 170px;
`;
const QuarterSharpLonger = styled(QuarterLonger)`
  background: var(--note-sharp-color);
`;
const QuarterFlatLonger = styled(QuarterLonger)`
  background: var(--note-flat-color);
`;

const QuarterDotted = styled(SixteenthNote)`
  height: 250px;
`;
const QuarterDottedSharp = styled(QuarterDotted)`
  background: var(--note-sharp-color);
`;
const QuarterDottedFlat = styled(QuarterDotted)`
  background: var(--note-flat-color);
`;

const QuarterDottedLonger = styled(SixteenthNote)`
  height: 270px;
`;
const QuarterDottedSharpLonger = styled(QuarterDottedLonger)`
  background: var(--note-sharp-color);
`;
const QuarterDottedFlatLonger = styled(QuarterDottedLonger)`
  background: var(--note-sharp-color);
`;

const HalfNote = styled(SixteenthNote)`
  height: 330px;
`;
const HalfSharp = styled(HalfNote)`
  background: var(--note-sharp-color);
`;
const HalfFlat = styled(HalfNote)`
  background: var(--note-flat-color);
`;

const HalfLonger = styled(SixteenthNote)`
  height: 350px;
`;
const HalfSharpLonger = styled(HalfLonger)`
  background: var(--note-sharp-color);
`;
const HalfFlatLonger = styled(HalfLonger)`
  background: var(--note-flat-color);
`;

const HalfDotted = styled(SixteenthNote)`
  height: 510px;
`;
const HalfDottedSharp = styled(HalfDotted)`
  background: var(--note-sharp-color);
`;
const HalfDottedFlat = styled(HalfDotted)`
  background: var(--note-flat-color);
`;

const HalfDottedLonger = styled(SixteenthNote)`
  height: 530px;
`;
const HalfDottedSharpLonger = styled(HalfDottedLonger)`
  background: var(--note-sharp-color);
`;
const HalfDottedFlatLonger = styled(HalfDottedLonger)`
  background: var(--note-flat-color);
`;

const WholeNote = styled(SixteenthNote)`
  height: 690px;
`;
const WholeSharp = styled(WholeNote)`
  background: var(--note-sharp-color);
`;
const WholeFlat = styled(WholeNote)`
  background: var(--note-flat-color);
`;

const WholeLonger = styled(SixteenthNote)`
  height: 710px;
`;
const WholeSharpLonger = styled(WholeLonger)`
  background: var(--note-sharp-color);
`;
const WholeFlatLonger = styled(WholeLonger)`
  background: var(--note-flat-color);
`;
