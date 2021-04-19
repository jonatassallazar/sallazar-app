import React from 'react';
import styled from 'styled-components';

const LoadingScreen = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;

LoadingScreen.Gif = styled.img`
  width: 30%;
`;

const LoadingPage = () => (
  <LoadingScreen>
    <LoadingScreen.Gif src="/img/loading.gif"/>
  </LoadingScreen>
);

export default LoadingPage;