import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const StakingSectionContainer = styled.section`
  padding: 5rem 2rem;
  background-color: var(--gray-light);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, var(--green-dark), var(--gold), var(--red));
    opacity: 0.7;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: var(--gray-darkest);
  text-align: center;
  margin-bottom: 3.5rem;
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
    background-color: var(--gold);
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  width: 400px;
  min-height: 450px;
  transition: all 0.4s ease;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  }
`;

const StakingCard = styled(Card)`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--green-dark);
  }
  
  &:hover {
    border-color: var(--green);
  }
`;

const RewardsCard = styled(Card)`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: #000000;
  }
  
  &:hover {
    border-color: #333333;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const StakingTitle = styled(CardTitle)`
  color: var(--green-dark);
`;

const RewardsTitle = styled(CardTitle)`
  color: #000000;
`;

const CardDescription = styled.p`
  color: var(--gray-dark);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const StakingDetail = styled.div`
  margin: 0.8rem 0;
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--border);
  
  &:last-of-type {
    border-bottom: none;
    margin-bottom: 1.2rem;
  }
`;

const DetailLabel = styled.span`
  color: var(--text-light);
  font-weight: 400;
  font-size: 0.9rem;
`;

const DetailValue = styled.span`
  color: var(--text);
  font-weight: 600;
  font-size: 0.9rem;
`;

const StakingActions = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: auto;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.8rem 0;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
`;

const StakeButton = styled(ActionButton)`
  background-color: var(--green-dark);
  color: white;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--green);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const UnstakeButton = styled(ActionButton)`
  background-color: transparent;
  color: var(--green-dark);
  border: 1px solid var(--green-dark);
  
  &:hover {
    background-color: rgba(107, 142, 102, 0.1);
    transform: translateY(-2px);
  }
`;


const RewardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const RewardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;

const RewardAmount = styled.span`
  font-weight: 600;
  color: #000000;
`;

const BoosterTag = styled.span`
  background: linear-gradient(135deg, #000000, #333333);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
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
  margin-top: auto;

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

const UnstakingInfo = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
  font-size: 0.85rem;
  color: #666666;
  font-weight: 500;
  text-align: center;
`;

export const StakingSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <StakingSectionContainer id="stake"><LoadingSpinner text="Loading staking..." /></StakingSectionContainer>;
  if (error) return <StakingSectionContainer id="stake"><div>Error loading content</div></StakingSectionContainer>;
  if (!webContent) return <StakingSectionContainer id="stake"><div>No content available</div></StakingSectionContainer>;
  
  const { stakingNodes, rewards } = webContent;
  const node = stakingNodes[0]; // Use the first staking node
  
  return (
    <StakingSectionContainer id="stake">
      <SectionTitle>Staking</SectionTitle>
      
      <CardsContainer>
        {/* Staking Card */}
        <StakingCard>
          <div>
            <StakingTitle>{node.name}</StakingTitle>
            <CardDescription>{node.description}</CardDescription>
            
            <StakingDetail>
              <DetailLabel>Staking Status</DetailLabel>
              <DetailValue>Active</DetailValue>
            </StakingDetail>
            
            <StakingDetail>
              <DetailLabel>Total Staked</DetailLabel>
              <DetailValue>0 KAI</DetailValue>
            </StakingDetail>
            
            <StakingDetail>
              <DetailLabel>Minimum Stake</DetailLabel>
              <DetailValue>{node.minStake}</DetailValue>
            </StakingDetail>
            
            <StakingDetail>
              <DetailLabel>APY</DetailLabel>
              <DetailValue>{node.apy}</DetailValue>
            </StakingDetail>
          </div>
          
          <StakingActions>
            <StakeButton>Stake</StakeButton>
            <UnstakeButton>Unstake</UnstakeButton>
          </StakingActions>
        </StakingCard>

        {/* Rewards Card */}
        <RewardsCard>
          <div>
            <RewardsTitle>Claim Rewards</RewardsTitle>
            <CardDescription>{rewards.claimDescription}</CardDescription>
            
            <RewardsList>
              {rewards.rewardTypes.map((reward) => (
                <RewardItem key={reward.id}>
                  <div>
                    <RewardAmount>{reward.amount} ${reward.token}</RewardAmount>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.2rem' }}>
                      {reward.description}
                    </div>
                  </div>
                  <BoosterTag>+{reward.boosterBonus}</BoosterTag>
                </RewardItem>
              ))}
            </RewardsList>
          </div>
          
          <ClaimButton>
            Claim All Rewards
          </ClaimButton>
        </RewardsCard>
      </CardsContainer>
      
      <UnstakingInfo>
        {rewards.unstakingPeriod}
      </UnstakingInfo>
    </StakingSectionContainer>
  );
};
