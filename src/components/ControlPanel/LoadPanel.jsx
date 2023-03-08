import { async } from "@firebase/util";
import {
  collection, deleteDoc, doc, getDoc, getDocs,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../config/firebase";
import UserContext from "../../contexts/UserContext";
import Button from "../Button";
import ButtonOrange from "../ButtonOrange";
import CustomInput from "../CustomInput";

export default function LoadPanel({
  setSequence, setSetting, setLoadPanel, setTotalBars,
}) {
  const { user, setUser } = useContext(UserContext);
  const [selectSong, setSelectSong] = useState(null);
  const allProject = user.song.map((project) => (
    <SongDiv key={project.id}>
      <CustomInput
        type="radio"
        name="song"
        songId={project.id}
        onClick={() => {
          setSelectSong(project.id);
        }}
      />
      <SongTitle>{project.setting.song}</SongTitle>
    </SongDiv>
  ));

  return (
    <LoadPanelDiv>
      <LoadTitle>專案</LoadTitle>
      <ProjectDiv>{allProject}</ProjectDiv>
      {selectSong === null ? null : (
        <ButtonDiv>
          <StyledButton
            onClick={async () => {
              const result = user.song.find((project) => project.id === selectSong);
              await deleteDoc(doc(db, "user", auth.currentUser.uid, "song", result.id));
              const colRef = collection(db, "user", auth.currentUser.uid, "song");
              const songSnap = await getDocs(colRef);
              setUser({
                ...user,
                song: songSnap.docs.map((data) => ({ ...data.data() })),
              });
            }}
          >
            刪除
          </StyledButton>
          <StyledButton
            onClick={() => {
              const result = user.song.find((project) => project.id === selectSong);
              setUser({
                ...user,
                currentSong: result.id,
              });
              setSequence(result.sequence);
              setSetting(result.setting);
              setLoadPanel(false);
              setTotalBars(result.setting.bar);
            }}
          >
            讀取
          </StyledButton>
        </ButtonDiv>
      )}
    </LoadPanelDiv>
  );
}

const LoadPanelDiv = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  position: fixed;
  top: 200px;
  background: #111;
  border-radius: 8px;
  z-index: 4;
`;
const LoadTitle = styled.p`
  font-size: 24px;
  color: var(--main-text-color);
`;

const SongDiv = styled.div`
  display: flex;
  height: 28px;
  margin: 5px 0;
`;
const SongTitle = styled.p`
  font-size: 20px;
  color: var(--main-text-color);
  margin-left: 18px;
`;
const ProjectDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;
const ButtonDiv = styled.div`
  display: flex;
  margin: 20px 0;
`;
const StyledButton = styled(ButtonOrange)`
  margin: 0 10px;
`;
