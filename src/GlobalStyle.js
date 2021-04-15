import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: 0;
  }
  body {
    font-family: roboto;
    margin: 0;
    padding: 0;
  }
  html, body {
    min-height: 100vh;
    min-width: 100vw;
  }
  html {
    font-size: 16px;
  }

  #root {
    height: 100%;
    position: fixed;
    width: 100%;
	}

`;

export default GlobalStyle;
