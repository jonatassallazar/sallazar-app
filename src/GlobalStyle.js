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
    font-size: 10px;
  }

  #root {
    height: 100%;
    position: fixed;
    width: 100%;
}

.app {
    height: 100%;
}

.header {
    height: 5rem;
    position: relative;
    display: flex;
    padding: 0.8rem;
    box-shadow: #ececec 0px 4px 5px;
    justify-content: flex-end;
    z-index: 3;
}

.headerProfile {
    flex-direction: column;
    justify-content: center;
    display: flex;
}

.headerProfile h3{
    font-size: 1.6rem;
    margin: 0;
}

.headerProfile p{
    font-size: 1rem;
    margin: 0;
}

.header img{
    border-radius: 50px;
    margin-left: 0.8rem;
}

.menu-lateral {
    display: flex;
    position: relative;
    width: 200px;
    min-height: 100%;
    flex-direction: column;
    background-color: #f9f9f9;
    box-shadow: #d2d2d2 3px 6px 6px;
    z-index: 2;
}

.menu-lateral-paginacao a.active {
    background-color: #f1f1f1;
}

.conteudo-app {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    left: 0;
    right: 0;
}

.conteudo-page {
    margin: 2rem;
}

.general-form {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
}

.form-inside-field {
    margin: 1.2rem 0.8rem !important;
    flex-grow: 1;
}

.form-item-p {
    flex-grow: 1;
}

.form-item-m {
    flex-grow: 3;
}

.form-item-g {
    flex-grow: 5;
}

.form-item-gg {
    flex-grow: 10;
}

.lista-itens-janela {
    width: 100%;
    display: flex;
    flex-flow: column;
}

.lista-itens {
    background-color: white;
    border-radius: 10px;
    padding: 1rem 2rem;
    margin: 0.4rem 0;
    box-shadow: #b3b3b3 1px 1px 3px;
}

.lista-itens a {
    color: #1d1d1d;
    text-decoration: none;
    font-size: 1.4rem;
}
`;

export default GlobalStyle;
