import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const BoosterSectionContainer = styled.section`
  padding: 5.5rem 2rem;
  background-color: var(--gray-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--green-dark));
    opacity: 0.7;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: var(--gray-darkest);
  text-align: center;
  margin-bottom: 1.8rem;
  position: relative;
  font-weight: 700;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--green-dark);
  }
`;

const BoosterDescription = styled.p`
  font-size: 1.1rem;
  color: var(--gray-dark);
  max-width: 800px;
  text-align: center;
  line-height: 1.7;
  margin-bottom: 3.5rem;
`;

const BoosterCard = styled.div`
  background: linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%);
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(107, 142, 102, 0.25);
  padding: 3rem;
  width: 100%;
  max-width: 550px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--green-light);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }
`;

const BoosterTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
`;

const BoosterInfoContainer = styled.div`
  margin: 2.5rem 0;
`;

const BoosterInfo = styled.div`
  margin: 1.2rem 0;
`;

const BoosterLabel = styled.p`
  font-size: 1.05rem;
  opacity: 0.9;
  margin-bottom: 0.4rem;
  font-weight: 500;
`;

const BoosterValue = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 0.7rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
`;

const BenefitsList = styled.ul`
  text-align: left;
  margin: 2.5rem 0;
  padding-left: 1.5rem;
`;

const BenefitItem = styled.li`
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 1.05rem;
  position: relative;
  padding-left: 0.5rem;
  
  &::marker {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const PurchaseButton = styled.button`
  background-color: var(--gold);
  color: var(--gray-darkest);
  border: none;
  border-radius: 6px;
  padding: 1.1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;

  &:hover {
    background-color: var(--gold-dark);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const BoosterSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <BoosterSectionContainer id="booster"><LoadingSpinner text="Loading booster chip..." /></BoosterSectionContainer>;
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