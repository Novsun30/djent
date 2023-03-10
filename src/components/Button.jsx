import React from "react";
import styled from "styled-components";

export default function Button({
  children, onClick, className, myref,
}) {
  return (
    <StyledButton onClick={onClick} ref={myref} className={className}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: var(--main-button-color);
  padding: 5px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
`;
