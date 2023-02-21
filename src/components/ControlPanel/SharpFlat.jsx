import React, { useRef } from "react";
import styled from "styled-components";
import Button from "../Button";

export default function SharpFlat({ sharpFlat, setSharpFlat }) {
  const flatRef = useRef(null);
  const sharpRef = useRef(null);
  const setFlat = (e) => {
    if (sharpFlat === "flat") {
      setSharpFlat(false);
      e.target.style.background = "#666";
      return;
    }
    setSharpFlat("flat");
    e.target.style.background = "#333";
    sharpRef.current.style.background = "#666";
  };
  const setSharp = (e) => {
    if (sharpFlat === "sharp") {
      setSharpFlat(false);
      e.target.style.background = "#666";
      return;
    }
    setSharpFlat("sharp");
    e.target.style.background = "#333";
    flatRef.current.style.background = "#666";
  };
  return (
    <>
      <Button myref={flatRef} onClick={setFlat}>
        flat
      </Button>
      <Button myref={sharpRef} onClick={setSharp}>
        sharp
      </Button>
    </>
  );
}
