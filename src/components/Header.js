import React from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { useWebContent } from './DataContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  
  span {
    color: #1e88e5;
  }
`;

const Tagline = styled.div`
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.2rem;
`;

const WalletButton = styled.button`
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1976d2;
  }
`;

export const Header = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <HeaderContainer><div>Loading...</div></HeaderContainer>;
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