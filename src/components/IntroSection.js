import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';

const IntroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f5f8ff;
`;

const IntroTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const IntroDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 800px;
  line-height: 1.6;
  margin-bottom: 2rem;
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
  padding: 1.5rem;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  color: #1e88e5;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

export const IntroSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <IntroContainer id="home"><div>Loading...</div></IntroContainer>;
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