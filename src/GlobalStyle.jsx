import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: #1E1E1E;
  }
  :root {
    --primary-color: #fff6ee;
}
`;

export default GlobalStyle;
