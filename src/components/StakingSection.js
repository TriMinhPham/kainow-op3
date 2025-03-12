import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';

const StakingSectionContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #ffffff;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 3rem;
`;

const StakingNodesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const StakingNodeCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 350px;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #eaeaea;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
`;

const NodeTitle = styled.h3`
  font-size: 1.5rem;
  color: #1e88e5;
  margin-bottom: 1rem;
`;

const NodeDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const StakingDetail = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #666;
  font-weight: 400;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 600;
`;

const StakingActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem 0;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
`;

const StakeButton = styled(ActionButton)`
  background-color: #1e88e5;
  color: white;
  border: none;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const UnstakeButton = styled(ActionButton)`
  background-color: transparent;
  color: #1e88e5;
  border: 1px solid #1e88e5;
  
  &:hover {
    background-color: rgba(30, 136, 229, 0.1);
  }
`;

export const StakingSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <StakingSectionContainer id="stake"><div>Loading...</div></StakingSectionContainer>;
  if (error) return <StakingSectionContainer id="stake"><div>Error loading content</div></StakingSectionContainer>;
  if (!webContent) return <StakingSectionContainer id="stake"><div>No content available</div></StakingSectionContainer>;
  
  const { stakingNodes } = webContent;
  
  return (
    <StakingSectionContainer id="stake">
      <SectionTitle>Staking Nodes</SectionTitle>
      
      <StakingNodesContainer>
        {stakingNodes.map(node => (
          <StakingNodeCard key={node.id}>
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
            
            <StakingActions>
              <StakeButton>Stake</StakeButton>
              <UnstakeButton>Unstake</UnstakeButton>
            </StakingActions>
          </StakingNodeCard>
        ))}
      </StakingNodesContainer>
    </StakingSectionContainer>
  );
};