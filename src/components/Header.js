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
  position: relative;
  
  @media (max-width: 1024px) {
    padding: 1rem 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    justify-content: center;
  }
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 35px;
  }
  
  @media (max-width: 480px) {
    height: 30px;
  }
`;

const LogoText = styled.div`
  @media (max-width: 768px) {
    font-size: 1.5rem !important;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem !important;
    text-align: center;
  }
`;

const Tagline = styled.div`
  font-size: 0.8rem;
  color: var(--gray-medium);
  margin-top: 0.2rem;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
    text-align: center;
  }
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
  white-space: nowrap;

  &:hover {
    background-color: var(--gold-dark);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    width: 100%;
    max-width: 200px;
  }
`;

export const Header = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <HeaderContainer><LoadingSpinner text="Loading header..." /></HeaderContainer>;
  if (error) return <HeaderContainer><div>Error loading content</div></HeaderContainer>;
  if (!webContent) return <HeaderContainer><div>No content available</div></HeaderContainer>;
  
  const { header, navigation } = webContent;
  
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src="/images/logo/logo.png" alt={header.title} />
        <div>
          <LogoText style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--gray-light)' }}>
            {header.title.split('.')[0]}<span style={{ color: 'var(--gold)' }}>.{header.title.split('.')[1]}</span>
          </LogoText>
          <Tagline>{header.tagline}</Tagline>
        </div>
      </LogoContainer>
      <Nav />
      <WalletButton>{navigation.walletButton}</WalletButton>
    </HeaderContainer>
  );
};
