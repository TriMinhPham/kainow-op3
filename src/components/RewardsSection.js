import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const RewardsSectionContainer = styled.section`
  padding: 5rem 2rem;
  background-color: var(--beige);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: var(--gray-darkest);
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
    background-color: var(--red);
  }
`;

const RewardsCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 100%;
  max-width: 550px;
  text-align: center;
  position: relative;
  border: 1px solid var(--border);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--red);
  }
`;

const RewardsDescription = styled.p`
  color: var(--gray-dark);
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`;

const RewardsInfo = styled.div`
  margin: 2rem 0;
`;

const RewardsLabel = styled.p`
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
`;

const RewardsValue = styled.h3`
  color: var(--red);
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const UnstakingInfo = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.95rem;
  color: var(--text-light);
  font-weight: 500;
`;

const ClaimButton = styled.button`
  background-color: var(--red);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 1.1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 10px rgba(194, 78, 74, 0.2);

  &:hover {
    background-color: var(--red-dark);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(194, 78, 74, 0.3);
  }
  
  &:disabled {
    background-color: var(--gray-medium);
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