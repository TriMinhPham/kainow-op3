import React from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--gray-darkest);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--gray-light);
  
  span {
    color: var(--gold);
  }
`;

const Tagline = styled.div`
  font-size: 0.8rem;
  color: var(--gray-medium);
  margin-top: 0.2rem;
  letter-spacing: 0.5px;
`;

const WalletButton = styled.button`
  background-color: var(--gold);
  color: var(--gray-darkest);
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--gold-dark);
    transform: translateY(-2px);
  }
`;

export const Header = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <HeaderContainer><LoadingSpinner text="Loading header..." /></HeaderContainer>;
  if (error) return <HeaderContainer><div>Error loading content</div></HeaderContainer>;
  if (!webContent) return <HeaderContainer><div>No content available</div></HeaderContainer>;
  
  const { header } = webContent;
  
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo>{header.title.split('.')[0]}<span>.{header.title.split('.')[1]}</span></Logo>
        <Tagline>{header.tagline}</Tagline>
      </LogoContainer>
      <Nav />
      <WalletButton>Connect Wallet</WalletButton>
    </HeaderContainer>
  );
};