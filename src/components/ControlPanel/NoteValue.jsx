import React from "react";
import styled from "styled-components";
import Button from "../Button";

export default function NoteValue({
  noteValue, setNoteValue, stopHandler, className,
}) {
  const noteValueSelector = (inputValue) => () => {
    stopHandler();
    setNoteValue(inputValue);
  };
  const noteValueArray = ["16n", "8n", "8n.", "4n", "4n.", "2n", "2n.", "1n"];
  const noteValueButtons = noteValueArray.map((inputNoteValue) => {
    let showValue;
    if (inputNoteValue.match(/(n\.)/) !== null) {
      showValue = (1 / Number(inputNoteValue.replace("n.", ""))) * 16 * 1.5;
    } else {
      showValue = (1 / Number(inputNoteValue.replace("n", ""))) * 16;
    }
    return noteValue === inputNoteValue ? (
      <SelectedNoteValue
        title="拍子長度"
        key={`${inputNoteValue}`}
        onClick={noteValueSelector(inputNoteValue)}
        className={className}
      >
        {`x${showValue}`}
      </SelectedNoteValue>
    ) : (
      <NoteValueButton
        title="拍子長度"
        key={`${inputNoteValue}`}
        onClick={noteValueSelector(inputNoteValue)}
        className={className}
      >
        {`x${showValue}`}
      </NoteValueButton>
    );
  });
  return (
    <NoteValueDiv title="拍子長度" className={className}>
      <NoteValueButtonDiv>{noteValueButtons}</NoteValueButtonDiv>
    </NoteValueDiv>
  );
}

const NoteValueButton = styled(Button)`
  width: 50px;
  height: 40px;
  margin: 2px;
  @media screen and (max-width: 750px) {
    width: 40px;
    height: 32px;
    margin: 1px;
  }
  @media screen and (max-width: 750px) {
    width: 40px;
    height: 32px;
    margin: 1px;
    font-size: 18px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
    width: 34px;
    height: 28px;
  }
`;

const SelectedNoteValue = styled(NoteValueButton)`
  background: var(--button-selected-color);
`;

const NoteValueButtonDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 216px;
  @media screen and (max-width: 750px) {
    width: 340px;
  }
  @media screen and (max-width: 480px) {
    width: 300px;
  }
`;

const NoteValueDiv = styled.div`
  display: flex;
  @media screen and (max-width: 750px) {
    position: absolute;
    display: flex;
    top: 108px;
    left: calc(50% - 166px);
  }
  @media screen and (max-width: 480px) {
    left: calc(50% - 143px);
  }
`;
