import React from "react";
import styled from "styled-components";

export default function NavBar() {
  return (
    <Nav>
      <Title>Djent</Title>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background: #151515;
  position: sticky;
  z-index: 10;
  top: 0;
`;

const Title = styled.p`
  color: var(--main-text-color);
  font-size: 30px;
`;
