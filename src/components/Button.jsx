import React from "react";
import styled from "styled-components";

export default function Button({
  children, onClick, className, myref, title,
}) {
  return (
    <StyledButton title={title} onClick={onClick} ref={myref} className={className}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main-button-color);
  padding: 5px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
`;
