import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
// import { Note } from "tonal";
import * as Tone from "tone";
import ControlPanel from "../components/ControlPanel";
import NoteButton from "../components/NoteButton";

export default function HomePage() {
  const [sequence, setSequence] = useState([]);
  const [setting, setSetting] = useState({
    track: "1",
    key: "C4 major",
    bpm: "120",
  });

  const degrees = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
  const bar = degrees.map((degree) => {
    if (degree === "7") {
      return (
        <>
          <NoteButton
            key={`${setting.track}-1-${degree}`}
            track={setting.track}
            degree={degree}
            currentKey={setting.key}
            currentBar="1"
            setSequence={setSequence}
            sequence={sequence}
          />
          <Hr />
        </>
      );
    }
    return (
      <NoteButton
        key={`${setting.track}-1-${degree}`}
        track={setting.track}
        degree={degree}
        currentKey={setting.key}
        currentBar="1"
        setSequence={setSequence}
        sequence={sequence}
      />
    );
  });

  return (
    <Main>
      <ControlPanel
        sequence={sequence}
        setSequence={setSequence}
        setting={setting}
        setSetting={setSetting}
      />
      <BarsDiv>{bar}</BarsDiv>
    </Main>
  );
}

const BarsDiv = styled.div`
  display: flex;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Hr = styled.hr`
  border-color: #666;
  margin: 0 10px;
`;
