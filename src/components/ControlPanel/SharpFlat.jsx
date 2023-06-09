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
    <Container>
      <SharpButton title="升記號" myref={sharpRef} onClick={setSharp}>
        #
      </SharpButton>
      <FlatButton title="降記號" myref={flatRef} onClick={setFlat}>
        b
      </FlatButton>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlatButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--note-flat-color);
  margin: 2px;
  @media screen and (max-width: 750px) {
    width: 35px;
    height: 35px;
  }
  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;
const SharpButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--note-sharp-color);
  margin: 2px;
  @media screen and (max-width: 750px) {
    width: 35px;
    height: 35px;
  }
  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;
