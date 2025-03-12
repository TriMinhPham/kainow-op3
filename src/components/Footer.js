import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FooterColumn = styled.div`
  min-width: 200px;
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #1e88e5;
`;

const FooterLink = styled.a`
  display: block;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
  
  &:hover {
    color: #1e88e5;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: #ccc;
  font-size: 1rem;
  transition: color 0.3s;
  
  &:hover {
    color: #1e88e5;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #444;
  color: #999;
  font-size: 0.9rem;
`;

export const Footer = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <FooterContainer><div>Loading...</div></FooterContainer>;
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