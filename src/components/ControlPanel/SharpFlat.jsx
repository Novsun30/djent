import React, { useRef } from "react";
import styled from "styled-components";
import Button from "../Button";

export default function SharpFlat({ sharpFlat, setSharpFlat }) {
  const flatRef = useRef(null);
  const sharpRef = useRef(null);
  const setFlat = (e) => {
    if (sharpFlat === "flat") {
      setSharpFlat(false);
      e.target.style.background = "var(--button-default-color)";
      e.target.style.borderColor = "#000";
      return;
    }
    setSharpFlat("flat");
    e.target.style.background = "#111";
    e.target.style.borderColor = "var(--note-flat-color)";
    sharpRef.current.style.background = "var(--button-default-color)";
    sharpRef.current.style.borderColor = "#000";
  };
  const setSharp = (e) => {
    if (sharpFlat === "sharp") {
      setSharpFlat(false);
      e.target.style.background = "var(--button-default-color)";
      e.target.style.borderColor = "#000";
      return;
    }
    setSharpFlat("sharp");
    e.target.style.background = "#111";
    e.target.style.borderColor = "var(--note-sharp-color)";
    flatRef.current.style.background = "var(--button-default-color)";
    flatRef.current.style.borderColor = "#000";
  };
  return (
    <>
      <FlatButton myref={flatRef} onClick={setFlat}>
        b
      </FlatButton>
      <ShaprButton myref={sharpRef} onClick={setSharp}>
        #
      </ShaprButton>
    </>
  );
}

const FlatButton = styled(Button)`
  color: var(--note-flat-color);
`;
const ShaprButton = styled(Button)`
  color: var(--note-sharp-color);
`;
