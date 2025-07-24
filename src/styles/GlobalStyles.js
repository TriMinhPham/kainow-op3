import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 1024px) {
      font-size: 15px;
    }
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
    
    @media (max-width: 480px) {
      font-size: 13px;
    }
  }

  body {
    margin: 0;
    padding: 0;
    background: black;
    overflow-x: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
  }

  /* Responsive images */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Responsive videos */
  video {
    max-width: 100%;
    height: auto;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }

  /* Hide focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }

  /* Responsive container utility */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1.5rem;
    }
    
    @media (max-width: 480px) {
      padding: 0 1rem;
    }
  }

  /* Responsive text utilities */
  .text-responsive {
    font-size: clamp(0.875rem, 2.5vw, 1.125rem);
  }

  .heading-responsive {
    font-size: clamp(1.5rem, 4vw, 3rem);
  }

  /* Prevent horizontal scroll on mobile */
  body, html {
    overflow-x: hidden;
  }
`;

export default GlobalStyles;
