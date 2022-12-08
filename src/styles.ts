import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #222;
    color: #ffffff;
  }
  
  body, input {
    font-family: 'Roboto', sans-serif;
  }
`