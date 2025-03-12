import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';

const BoosterSectionContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const BoosterDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  max-width: 800px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 3rem;
`;

const BoosterCard = styled.div`
  background: #1e88e5;
  background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(30, 136, 229, 0.3);
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  color: white;
`;

const BoosterTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const BoosterInfoContainer = styled.div`
  margin: 2rem 0;
`;

const BoosterInfo = styled.div`
  margin: 1rem 0;
`;

const BoosterLabel = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 0.3rem;
`;

const BoosterValue = styled.h4`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const BenefitsList = styled.ul`
  text-align: left;
  margin: 2rem 0;
  padding-left: 1.5rem;
`;

const BenefitItem = styled.li`
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const PurchaseButton = styled.button`
  background-color: white;
  color: #1e88e5;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }
`;

export const BoosterSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <BoosterSectionContainer id="booster"><div>Loading...</div></BoosterSectionContainer>;
  if (error) return <BoosterSectionContainer id="booster"><div>Error loading content</div></BoosterSectionContainer>;
  if (!webContent) return <BoosterSectionContainer id="booster"><div>No content available</div></BoosterSectionContainer>;
  
  const { boosterChip } = webContent;
  
  return (
    <BoosterSectionContainer id="booster">
      <SectionTitle>Booster Chip</SectionTitle>
      <BoosterDescription>
        {boosterChip.description}
      </BoosterDescription>
      
      <BoosterCard>
        <BoosterTitle>{boosterChip.name}</BoosterTitle>
        
        <BoosterInfoContainer>
          <BoosterInfo>
            <BoosterLabel>Price</BoosterLabel>
            <BoosterValue>{boosterChip.price}</BoosterValue>
          </BoosterInfo>
        </BoosterInfoContainer>
        
        <BenefitsList>
          {boosterChip.benefits.map((benefit, index) => (
            <BenefitItem key={index}>{benefit}</BenefitItem>
          ))}
        </BenefitsList>
        
        <PurchaseButton>Purchase Booster Chip</PurchaseButton>
      </BoosterCard>
    </BoosterSectionContainer>
  );
};