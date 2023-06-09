import React from "react";
import styled from "styled-components";

export default function Mask({ onClick, className }) {
  return <MaskDiv onClick={onClick} className={className} />;
}
const MaskDiv = styled.div`
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
  background: rgba(0, 0, 0, 0.3);
`;
