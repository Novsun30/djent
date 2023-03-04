import React from "react";
import styled from "styled-components";

export default function Mask({ onClick }) {
  return <MaskDiv onClick={onClick} />;
}
const MaskDiv = styled.div`
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;
