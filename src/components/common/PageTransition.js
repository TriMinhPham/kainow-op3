import React from 'react';
import styled from 'styled-components';

const TransitionContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
`;

const PageTransition = ({ isActive }) => {
  return (
    <TransitionContainer className={isActive ? 'active' : ''}>
      <div style={{ color: 'white', fontSize: '24px' }}>Loading...</div>
    </TransitionContainer>
  );
};

export default PageTransition; 