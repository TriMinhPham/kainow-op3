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
`;

const FooterColumn = styled.div`
  min-width: 200px;
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
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
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
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--gray-medium);
  font-size: 0.9rem;
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
          <FooterLink href="#/support">Contact Us</FooterLink>
          <FooterLink href="#/feedback">Feedback</FooterLink>
          <FooterLink href="#/issues">Report an Issue</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink href="#/terms">Terms of Service</FooterLink>
          <FooterLink href="#/privacy">Privacy Policy</FooterLink>
          <FooterLink href="#/cookies">Cookie Policy</FooterLink>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        {footer.copyright}
      </FooterBottom>
    </FooterContainer>
  );
};