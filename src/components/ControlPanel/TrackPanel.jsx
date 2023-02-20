import React from "react";
import styled from "styled-components";
import Button from "../Button";

export default function TrackPanel({ trackPanel, setTrackPanel }) {
  return trackPanel === true ? (
    <TrackPanelDiv>
      <Button onClick={() => setTrackPanel(false)}>X</Button>
      <TrackListDiv>123</TrackListDiv>
    </TrackPanelDiv>
  ) : null;
}

const TrackPanelDiv = styled.div`
  width: 700px;
  position: fixed;
  top: 200px;
  height: 300px;
  background: #333;
  border-radius: 8px;
`;

const TrackListDiv = styled.div``;
