import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";

export default function TrackPanel({
  trackPanel, setTrackPanel, setting, setSetting,
}) {
  useEffect(() => {
    const showTrack = document.querySelector("div.show");
    if (showTrack !== null) {
      showTrack.style.display = "block";
    }
  }, [setting]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const selectTrack = (track) => () => {
    setSelectedTrack(track);
  };
  const addTrack = () => {
    if (selectedTrack === null) {
      return;
    }
    setSetting({
      ...setting,
      track: {
        ...setting.track,
        [selectedTrack]: { ...setting.track[selectedTrack], add: true, display: false },
      },
    });
    setSelectedTrack(null);
  };
  const removeTrack = (track) => () => {
    setSetting({
      ...setting,
      track: {
        ...setting.track,
        [track]: { ...setting.track[selectedTrack], add: false, display: false },
      },
    });
    setSelectedTrack(null);
  };
  const tracks = Object.keys(setting.track).map((track) => (setting.track[track].add ? (
    <TrackDiv key={track}>
      <TrackTitle>{track}</TrackTitle>
      <DeleteButton onClick={removeTrack(track)}>X</DeleteButton>
    </TrackDiv>
  ) : null));
  const TrackList = Object.keys(setting.track).map((track) => (setting.track[track].add ? null : (
    <TrackInputDiv key={track}>
      <CustomRadioInput type="radio" name="track" onClick={selectTrack(track)} />
      {track === selectedTrack ? (
        <SelectedTrackTitle>{track.replace("_", " ")}</SelectedTrackTitle>
      ) : (
        <TrackInputTitile>{track.replace("_", " ")}</TrackInputTitile>
      )}
    </TrackInputDiv>
  )));
  return trackPanel === true ? (
    <TrackPanelDiv>
      <CloseButton
        onClick={() => {
          setTrackPanel(false);
          setSelectedTrack(null);
        }}
      >
        X
      </CloseButton>
      <MyTracksDiv>
        <ContainerTitle> Tracks</ContainerTitle>
        {tracks}
      </MyTracksDiv>
      <TrackListDiv>
        <ContainerTitle>Add new Track</ContainerTitle>
        {TrackList}
        {selectedTrack !== null ? <Button onClick={addTrack}>Add</Button> : null}
      </TrackListDiv>
    </TrackPanelDiv>
  ) : null;
}

const TrackPanelDiv = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-around;
  width: 500px;
  position: fixed;
  top: 200px;
  height: 500px;
  background: #111;
  border-radius: 8px;
`;

const ContainerTitle = styled.p`
  color: var(--main-text-color);
`;

const TrackDiv = styled.div`
  display: flex;
  margin: 5px 0;
`;
const TrackTitle = styled.div`
  color: var(--note-selected-color);
  font-size: 20px;
`;

const DeleteButton = styled(Button)`
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background: #a32a47;
  margin: 4px 0 0 5px;
`;
const CloseButton = styled(DeleteButton)`
  margin: 0;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const MyTracksDiv = styled.div``;

const TrackListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const TrackInputDiv = styled.div`
  display: flex;
  height: 28px;
  margin: 5px 0;
`;
const TrackInputTitile = styled.p`
  font-size: 20px;
  margin-left: 18px;
  color: #666;
`;
const SelectedTrackTitle = styled(TrackInputTitile)`
  color: var(--note-selected-color);
`;
const CustomRadioInput = styled.input`
  cursor: pointer;
  position: relative;
  top: 5px;
  &:after {
    display: block;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    background: #111;
    border-radius: 100%;
    border: 2px solid #666;
  }
  &:checked:after {
    border: 2px solid var(--note-selected-color);
  }
  &:checked:before {
    display: block;
    position: absolute;
    z-index: 10;
    top: 6px;
    left: 6px;
    content: "";
    height: 12px;
    width: 12px;
    background: var(--note-selected-color);
    border-radius: 100%;
  }
`;
