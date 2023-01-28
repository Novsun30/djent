import React from "react";
import styled from "styled-components";

export default function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  background: #666;
  padding: 5px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
`;
