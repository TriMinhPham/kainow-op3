import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const FooterContainer = styled.footer`
  background-color: var(--gray-darkest);
  color: var(--gray-light);
  padding: 3.5rem 2rem 2.5rem;
  margin-top: auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1rem 1.5rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--gold), var(--green-dark), var(--red));
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 3rem;
  
  @media (max-width: 1024px) {
    gap: 2.5rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const FooterColumn = styled.div`
  min-width: 200px;
  
  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--gold);
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 30px;
    height: 2px;
    background-color: var(--gold);
    
    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const FooterLink = styled.a`
  display: block;
  color: var(--gray-medium);
  text-decoration: none;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  padding: 0.2rem 0;
  
  &:hover {
    color: var(--gold);
    transform: translateX(3px);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const SocialLink = styled.a`
  color: var(--gray-medium);
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  
  &:hover {
    color: var(--gold);
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--gray-medium);
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    margin-top: 2.5rem;
    padding-top: 1.25rem;
  }
  
  @media (max-width: 480px) {
    margin-top: 2rem;
    padding-top: 1rem;
    font-size: 0.85rem;
  }
`;

export const Footer = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <FooterContainer><LoadingSpinner text="Loading footer..." /></FooterContainer>;
  if (error) return <FooterContainer><div>Error loading content</div></FooterContainer>;
  if (!webContent) return <FooterContainer><div>No content available</div></FooterContainer>;
  
  const { footer } = webContent;
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>Resources</FooterTitle>
          {footer.links.map((link, index) => (
            <FooterLink key={index} href={link.url}>{link.name}</FooterLink>
          ))}
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Community</FooterTitle>
          <SocialLinks>
            {footer.socialMedia.map((social, index) => (
              <SocialLink key={index} href={social.url}>
                {social.name}
              </SocialLink>
            ))}
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Support</FooterTitle>
          {footer.supportLinks.map((link, index) => (
            <FooterLink key={index} href={link.url}>{link.name}</FooterLink>
          ))}
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Legal</FooterTitle>
          {footer.legalLinks.map((link, index) => (
            <FooterLink key={index} href={link.url}>{link.name}</FooterLink>
          ))}
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        {footer.copyright}
      </FooterBottom>
    </FooterContainer>
  );
};
