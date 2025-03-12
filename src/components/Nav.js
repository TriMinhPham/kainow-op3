import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  gap: 2.5rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--gray-medium);
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  
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
`;

export const Nav = () => {
  return (
    <NavContainer>
      <NavLink href="#home">Home</NavLink>
      <NavLink href="#stake">Stake</NavLink>
      <NavLink href="#rewards">Claim Rewards</NavLink>
      <NavLink href="#booster">Booster Chip</NavLink>
    </NavContainer>
  );
};