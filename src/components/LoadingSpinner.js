import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.85);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.85);
    opacity: 0.7;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  gap: 1.5rem;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  border-top: 4px solid var(--gold);
  border-right: 4px solid var(--green-dark);
  border-bottom: 4px solid var(--red);
  width: 50px;
  height: 50px;
  animation: ${spin} 1.2s ease-in-out infinite;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const LoadingText = styled.div`
  color: var(--text);
  font-size: 1rem;
  font-weight: 500;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
  );
};