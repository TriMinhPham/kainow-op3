import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';

const RewardsSectionContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #f5f8ff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const RewardsCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const RewardsDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const RewardsInfo = styled.div`
  margin: 1.5rem 0;
`;

const RewardsLabel = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const RewardsValue = styled.h3`
  color: #1e88e5;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const UnstakingInfo = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #777;
`;

const ClaimButton = styled.button`
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #1976d2;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const RewardsSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <RewardsSectionContainer id="rewards"><div>Loading...</div></RewardsSectionContainer>;
  if (error) return <RewardsSectionContainer id="rewards"><div>Error loading content</div></RewardsSectionContainer>;
  if (!webContent) return <RewardsSectionContainer id="rewards"><div>No content available</div></RewardsSectionContainer>;
  
  const { rewards } = webContent;
  
  return (
    <RewardsSectionContainer id="rewards">
      <SectionTitle>Claim Rewards</SectionTitle>
      
      <RewardsCard>
        <RewardsDescription>
          {rewards.claimDescription}
        </RewardsDescription>
        
        <RewardsInfo>
          <RewardsLabel>Available Rewards</RewardsLabel>
          <RewardsValue>0 KAI</RewardsValue>
        </RewardsInfo>
        
        <ClaimButton disabled>Claim Rewards</ClaimButton>
        
        <UnstakingInfo>
          Unstaking Period: {rewards.unstakingPeriod}
        </UnstakingInfo>
      </RewardsCard>
    </RewardsSectionContainer>
  );
};