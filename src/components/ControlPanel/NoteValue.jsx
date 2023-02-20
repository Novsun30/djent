import React from "react";
import styled from "styled-components";
import Button from "../Button";

export default function NoteValue({ noteValue, setNoteValue, stopHandler }) {
  const noteValueSelector = (inputValue) => () => {
    stopHandler();
    setNoteValue(inputValue);
  };
  const noteValueArray = ["1n", "2n", "4n", "8n", "16n"];
  const noteValueButtons = noteValueArray.map((inputNoteValue) => (noteValue === inputNoteValue ? (
    <SelectedNoteValue key={`${inputNoteValue}`} onClick={noteValueSelector(inputNoteValue)}>
      {`${inputNoteValue.replace("n", "")}` === "1"
        ? "1"
        : `1/${inputNoteValue.replace("n", "")}`}
    </SelectedNoteValue>
  ) : (
    <NoteValueButton key={`${inputNoteValue}`} onClick={noteValueSelector(inputNoteValue)}>
      {`${inputNoteValue.replace("n", "")}` === "1"
        ? "1"
        : `1/${inputNoteValue.replace("n", "")}`}
    </NoteValueButton>
  )));
  return (
    <NoteValueDiv>
      <NoteValueTitle>Note Value</NoteValueTitle>
      <NoteValueButtonDiv>{noteValueButtons}</NoteValueButtonDiv>
    </NoteValueDiv>
  );
}

const NoteValueButton = styled(Button)`
  width: 55px;
  height: 45px;
  margin: 2px;
`;

const SelectedNoteValue = styled(NoteValueButton)`
  background: #aaa;
`;

const NoteValueButtonDiv = styled.div`
  display: flex;
`;

const NoteValueDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;
const NoteValueTitle = styled.p`
  color: var(--main-text-color);
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
`;
