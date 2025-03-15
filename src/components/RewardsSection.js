import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const RewardsSectionContainer = styled.section`
  padding: 5rem 2rem;
  background-color: var(--gray-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: #000000;
  text-align: center;
  margin-bottom: 2.5rem;
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
    background-color: #000000;
  }
`;

const RewardsCard = styled.div`
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 100%;
  max-width: 550px;
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;
  margin-bottom: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: #000000;
  }
`;

const RewardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const RewardsDescription = styled.p`
  color: #333333;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

const RewardsInfo = styled.div`
  margin: 2rem 0;
`;

const RewardsLabel = styled.p`
  color: #333333;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
`;

const RewardsValue = styled.h3`
  color: #000000;
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const TokenLabel = styled.span`
  font-size: 1.2rem;
  color: #000000;
  font-weight: 700;
`;

const BoosterTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #000000, #333333);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const UnstakingInfo = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
  font-size: 0.95rem;
  color: #666666;
  font-weight: 500;
`;

const ClaimButton = styled.button`
  background: linear-gradient(145deg, #000000, #333333);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 1.1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    
    &::before {
      transform: translateX(100%);
    }
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const RewardsSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <RewardsSectionContainer id="rewards"><LoadingSpinner text="Loading rewards..." /></RewardsSectionContainer>;
  if (error) return <RewardsSectionContainer id="rewards"><div>Error loading content</div></RewardsSectionContainer>;
  if (!webContent) return <RewardsSectionContainer id="rewards"><div>No content available</div></RewardsSectionContainer>;
  
  const { rewards } = webContent;
  
  return (
    <RewardsSectionContainer id="rewards">
      <SectionTitle>Claim Rewards</SectionTitle>
      
      <RewardsContainer>
        {rewards.rewardTypes.map((reward) => (
          <RewardsCard key={reward.id} variant={reward.token.toLowerCase()}>
            <BoosterTag>+{reward.boosterBonus} Booster Bonus</BoosterTag>
            
            <RewardsDescription>
              {reward.description}
            </RewardsDescription>
            
            <RewardsInfo>
              <RewardsLabel>Available Rewards</RewardsLabel>
              <RewardsValue>
                {reward.amount} <TokenLabel variant={reward.token.toLowerCase()}>${reward.token}</TokenLabel>
              </RewardsValue>
            </RewardsInfo>
            
            <ClaimButton variant={reward.token.toLowerCase()}>
              Claim {reward.token} Rewards
            </ClaimButton>
          </RewardsCard>
        ))}
      </RewardsContainer>
      
      <UnstakingInfo>
        {rewards.unstakingPeriod}
      </UnstakingInfo>
    </RewardsSectionContainer>
  );
};