import React from "react";
import styled from "styled-components";

export default function CustomInput({
  type, name, onClick, className, checked,
}) {
  return (
    <CustomRadioInput
      type={type}
      name={name}
      onClick={onClick}
      className={className}
      checked={checked}
    />
  );
}

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
