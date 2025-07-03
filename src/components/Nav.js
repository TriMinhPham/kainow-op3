import React, { useState } from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const NavContainer = styled.nav`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    position: relative;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  
  @media (max-width: 1024px) {
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    right: 0;
    flex-direction: column;
    background-color: var(--gray-darkest);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    min-width: 200px;
    gap: 0.5rem;
    z-index: 1000;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--gray-medium);
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  white-space: nowrap;
  
  &:hover {
    color: var(--gold);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--gold);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    border-radius: 4px;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    &::after {
      display: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--gray-medium);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--gold);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Nav = () => {
  const { webContent, loading, error } = useWebContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  if (loading) return <LoadingSpinner text="Loading navigation..." />;
  if (error) return <div>Error loading navigation</div>;
  if (!webContent) return <div>No navigation available</div>;
  
  const { navigation } = webContent;
  
  return (
    <NavContainer>
      <NavLinks $isOpen={isMenuOpen}>
        {navigation.links.map((link, index) => (
          <NavLink 
            key={index}
            href={link.href} 
            onClick={closeMenu}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.name}
          </NavLink>
        ))}
      </NavLinks>
      <MobileMenuButton onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </MobileMenuButton>
    </NavContainer>
  );
};
