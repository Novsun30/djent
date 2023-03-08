import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import ButtonOrange from "../ButtonOrange";
import CustomInput from "../CustomInput";
import Mask from "../Mask";

export default function TrackPanel({
  trackPanel,
  setTrackPanel,
  setting,
  setSetting,
  setSequence,
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
        [track]: { ...setting.track[track], add: false, display: false },
      },
    });
    setSequence((prevSequence) => prevSequence);
    setSelectedTrack(null);
  };
  const tracks = Object.keys(setting.track).map((track) => (setting.track[track].add ? (
    <TrackDiv key={track}>
      <TrackTitle>{track.replaceAll("_", " ")}</TrackTitle>
      <DeleteButton onClick={removeTrack(track)}>X</DeleteButton>
    </TrackDiv>
  ) : null));
  const TrackList = Object.keys(setting.track).map((track) => (setting.track[track].add ? null : (
    <TrackInputDiv key={track}>
      <CustomInput type="radio" name="track" onClick={selectTrack(track)} />
      {track === selectedTrack ? (
        <SelectedTrackTitle>{track.replaceAll("_", " ")}</SelectedTrackTitle>
      ) : (
        <TrackInputTitile>{track.replaceAll("_", " ")}</TrackInputTitile>
      )}
    </TrackInputDiv>
  )));
  return trackPanel === true ? (
    <>
      <TrackPanelDiv>
        <MyTracksDiv>
          <ContainerTitle>刪除音軌</ContainerTitle>
          {tracks}
        </MyTracksDiv>
        <TrackListDiv>
          <ContainerTitle>新增音軌</ContainerTitle>
          {TrackList}
          {selectedTrack !== null ? <AddButton onClick={addTrack}>新增</AddButton> : null}
        </TrackListDiv>
      </TrackPanelDiv>
      <Mask
        onClick={() => {
          setTrackPanel(false);
          setSelectedTrack(null);
        }}
      />
    </>
  ) : null;
}

const TrackPanelDiv = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-around;
  width: 500px;
  position: fixed;
  z-index: 4;
  top: 200px;
  height: 500px;
  background: #111;
  border-radius: 8px;
`;

const ContainerTitle = styled.p`
  font-size: 18px;
  color: var(--main-text-color);
  margin-bottom: 10px;
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
const AddButton = styled(ButtonOrange)`
  margin-top: 20px;
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
