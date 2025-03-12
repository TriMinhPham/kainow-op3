import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s;
  
  &:hover {
    color: #1e88e5;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #1e88e5;
    transition: width 0.3s;
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