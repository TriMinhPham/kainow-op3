import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const IntroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem 5rem;
  background-color: var(--beige-light);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--gold), var(--green-dark), var(--red));
  }
`;

const IntroTitle = styled.h1`
  font-size: 2.8rem;
  color: var(--gray-darkest);
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--gold);
  }
`;

const IntroDescription = styled.p`
  font-size: 1.2rem;
  color: var(--gray-dark);
  max-width: 800px;
  line-height: 1.7;
  margin-bottom: 3rem;
`;

const GraphicsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  width: 250px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: var(--primary);
  }
`;

const FeatureTitle = styled.h3`
  color: var(--primary-dark);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const IntroSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <IntroContainer id="home"><LoadingSpinner text="Loading introduction..." /></IntroContainer>;
  if (error) return <IntroContainer id="home"><div>Error loading content</div></IntroContainer>;
  if (!webContent) return <IntroContainer id="home"><div>No content available</div></IntroContainer>;
  
  const { intro } = webContent;
  
  const featureTitles = [
    "Simplified Staking",
    "Flexible Rewards",
    "Booster Enhancement",
    "Transparent Tracking"
  ];
  
  return (
    <IntroContainer id="home">
      <IntroTitle>{intro.heading}</IntroTitle>
      <IntroDescription>
        {intro.description}
      </IntroDescription>
      
      <GraphicsContainer>
        {intro.features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureTitle>{featureTitles[index]}</FeatureTitle>
            <FeatureDescription>
              {feature}
            </FeatureDescription>
          </FeatureCard>
        ))}
      </GraphicsContainer>
    </IntroContainer>
  );
};