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
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
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
        <Logo src="/images/logo/logo.png" alt={header.title} />
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--gray-light)' }}>
            {header.title.split('.')[0]}<span style={{ color: 'var(--gold)' }}>.{header.title.split('.')[1]}</span>
          </div>
          <Tagline>{header.tagline}</Tagline>
        </div>
      </LogoContainer>
      <Nav />
      <WalletButton>Connect Wallet</WalletButton>
    </HeaderContainer>
  );
};