import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans TC', sans-serif;
    font-weight:500;
    word-spacing: 3px;
  }
  body{
    background: var(--main-background-color);
  }
  :root {
    --note-color: #fff6ee;
    --note-selected-color: #F80;
    --note-sharp-color: #9F1;
    --note-flat-color: #F19;
    --main-background-color: #1E1E1E;
    --main-button-color: #666;
    --button-default-color:#666;
    --button-selected-color: #ff7a1f;
    --play-indicator-color: #A32A47;
    --waring-text-color: #A32A47;
    --main-text-color: #EEE;
  }
`;

export default GlobalStyle;
