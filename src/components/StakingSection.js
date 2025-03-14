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

const StakingNodesContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const StakingNodeCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 400px;
  height: 400px;
  transition: all 0.4s ease;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
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
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
    border-color: var(--green);
  }
`;

const NodeTitle = styled.h3`
  font-size: 1.6rem;
  color: var(--green-dark);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const NodeDescription = styled.p`
  color: var(--gray-dark);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const StakingDetail = styled.div`
  margin: 1.2rem 0;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
  
  &:last-of-type {
    border-bottom: none;
    margin-bottom: 1.8rem;
  }
`;

const DetailLabel = styled.span`
  color: var(--text-light);
  font-weight: 400;
`;

const DetailValue = styled.span`
  color: var(--text);
  font-weight: 600;
`;

const StakingActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.9rem 0;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
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

export const StakingSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <StakingSectionContainer id="stake"><LoadingSpinner text="Loading staking nodes..." /></StakingSectionContainer>;
  if (error) return <StakingSectionContainer id="stake"><div>Error loading content</div></StakingSectionContainer>;
  if (!webContent) return <StakingSectionContainer id="stake"><div>No content available</div></StakingSectionContainer>;
  
  const { stakingNodes } = webContent;
  const node = stakingNodes[0]; // Keep only the first node
  
  return (
    <StakingSectionContainer id="stake">
      <SectionTitle>Staking</SectionTitle>
      
      <StakingNodesContainer>
        <StakingNodeCard>
          <div>
            <NodeTitle>{node.name}</NodeTitle>
            <NodeDescription>{node.description}</NodeDescription>
            
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
        </StakingNodeCard>
      </StakingNodesContainer>
    </StakingSectionContainer>
  );
};