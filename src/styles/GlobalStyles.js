import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    25% {
      transform: scale(2.5);
      opacity: 0.3;
    }
    50% {
      transform: scale(5);
      opacity: 0.5;
    }
    75% {
      transform: scale(7.5);
      opacity: 0.7;
    }
    100% {
      transform: scale(10);
      opacity: 1;
    }
  }

  @keyframes wave {
    0% {
      transform: scale(0) translate(0, 0);
      opacity: 0;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
    }
    25% {
      transform: scale(2.5) translate(-5%, 5%);
      opacity: 0.4;
      box-shadow: 0 0 30px 15px rgba(255, 255, 255, 0.3);
    }
    50% {
      transform: scale(5) translate(5%, -5%);
      opacity: 0.6;
      box-shadow: 0 0 40px 20px rgba(255, 255, 255, 0.4);
    }
    75% {
      transform: scale(7.5) translate(-5%, 5%);
      opacity: 0.8;
      box-shadow: 0 0 50px 25px rgba(255, 255, 255, 0.5);
    }
    100% {
      transform: scale(10) translate(0, 0);
      opacity: 1;
      box-shadow: 0 0 60px 30px rgba(255, 255, 255, 0.6);
    }
  }

  body {
    margin: 0;
    padding: 0;
    background: black;
    overflow-x: hidden;
  }

  body.white-bg {
    background: linear-gradient(135deg, 
      #c8d4de 0%,
      #ecfbfe 25%,
      #bcc8d4 50%,
      #cbe0ed 75%,
      #c8d4de 100%
    );
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles; 