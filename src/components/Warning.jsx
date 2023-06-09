import React from "react";
import styled from "styled-components";
import warningImage from "../assets/images/icons/warning.svg";

export default function Warning({
  children, className, messageRef, warningDivRef,
}) {
  return (
    <WarningDiv ref={warningDivRef} className={className}>
      <WarningImage src={warningImage} alt="warning" />
      <WarningMessage ref={messageRef}>{children}</WarningMessage>
    </WarningDiv>
  );
}

const WarningDiv = styled.div`
  display: flex;
`;

const WarningImage = styled.img`
  width: 20px;
  margin-right: 5px;
`;

const WarningMessage = styled.p`
  color: var(--waring-text-color);
  text-align: center;
  max-width: 250px;
`;
