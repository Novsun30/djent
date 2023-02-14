import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: var(--main-background-color);
  }
  :root {
    --note-color: #fff6ee;
    --note-selected-color: #F91;
    --main-background-color: #1E1E1E;
    --main-button-color: #666;
    --play-indicator-color: #A32A47;
    --main-text-color: #EEE;
  }
  button.eighth-note {
    position: absolute;
    z-index: 2;
    left:0;
    width: 30px;
    height: 70px;
    cursor: pointer;
    margin: 5px 10px;
    background: var(--note-selected-color);
    border-radius: 5px;
  }
  button.eighth-note-longer {
    height: 90px;
  }

  button.quarter-note {
    position: absolute;
    z-index: 2;
    left:0;
    width: 30px;
    height: 150px;
    cursor: pointer;
    margin: 5px 10px;
    background: var(--note-selected-color);
    border-radius: 5px;
  }
  button.quarter-note-longer {
    height: 170px;
  }

  button.half-note {
    position: absolute;
    z-index: 2;
    left:0;
    width: 30px;
    height: 330px;
    cursor: pointer;
    margin: 5px 10px;
    background: var(--note-selected-color);
    border-radius: 5px;
  }
  button.half-note-longer {
    height: 350px;
  }

  
  button.whole-note {
    position: absolute;
    z-index: 2;
    left:0;
    width: 30px;
    height: 690px;
    cursor: pointer;
    margin: 5px 10px;
    background: var(--note-selected-color);
    border-radius: 5px;
  }
  button.whole-note-longer {
    height: 710px;
  }
`;

export default GlobalStyle;
