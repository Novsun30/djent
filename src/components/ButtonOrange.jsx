import React from "react";
import styled from "styled-components";
import Button from "./Button";

export default function ButtonOrange({ children, onClick, className }) {
  return (
    <CustomButton onClick={onClick} className={className}>
      {children}
    </CustomButton>
  );
}

const CustomButton = styled(Button)`
  border: none;
  font-weight: 600;
  border-radius: 20px;
  background: #db7202;
  width: 110px;
  height: 45px;
  &:hover {
    background: #f91;
  }
`;
