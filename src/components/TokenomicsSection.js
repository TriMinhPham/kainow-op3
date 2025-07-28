import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 20px;
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 60px;
  font-weight: 700;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
`;

const TokenomicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  width: 800px;
  height: 800px;
  gap: 0;
  border: 2px solid #ffffff;
  
  @media (max-width: 768px) {
    width: 600px;
    height: 600px;
  }
  
  @media (max-width: 480px) {
    width: 400px;
    height: 400px;
  }
`;

const HoverPercentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  color: ${props => props.$index % 2 === 0 ? '#000000' : '#ffffff'};
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 20;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const TokenCard = styled.div`
  background: ${props => props.$index % 2 === 0 ? '#ffffff' : '#000000'};
  color: ${props => props.$index % 2 === 0 ? '#000000' : '#ffffff'};
  border: 1px solid ${props => props.$index % 2 === 0 ? '#000000' : '#ffffff'};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 0;
  
  /* Grid area assignments - ALL 144 cells filled (scaled up after removing unallocated) */
  ${props => {
    const gridAreas = [
      'grid-column: 1 / 7; grid-row: 1 / 7;',   // 31.02% - Retail Holders (6x6 = 36 cells)
      'grid-column: 7 / 13; grid-row: 1 / 5;',  // 18.68% - Reserve (6x4 = 24 cells)
      'grid-column: 7 / 11; grid-row: 5 / 9;',  // 11.74% - Ecosystem (4x4 = 16 cells)
      'grid-column: 1 / 4; grid-row: 7 / 11;',  // 9.98% - CEX (3x4 = 12 cells)
      'grid-column: 4 / 7; grid-row: 7 / 10;',  // 7.83% - Team (3x3 = 9 cells)
      'grid-column: 11 / 13; grid-row: 5 / 9;', // 7.56% - Staking (2x4 = 8 cells)
      'grid-column: 4 / 7; grid-row: 10 / 13;', // 4.50% - Discovery Reward (3x3 = 9 cells)
      'grid-column: 1 / 4; grid-row: 11 / 13;', // 3.20% - Burned (3x2 = 6 cells, expanded)
      'grid-column: 7 / 10; grid-row: 9 / 13;', // 2.39% - HOK (3x4 = 12 cells)
      'grid-column: 10 / 13; grid-row: 9 / 12;', // 1.52% - DeFi Protocols (3x3 = 9 cells, expanded)
      'grid-column: 10 / 13; grid-row: 12 / 13;', // 0.20% - Revenue Aggregator (3x1 = 3 cells, adjusted)
    ];
    return gridAreas[props.$index] || '';
  }}
  
  &:hover {
    transform: scale(1.02);
    z-index: 10;
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
    
    ${HoverPercentage} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const ImageSection = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => {
    // Try PNG first, then JPG as fallback, then solid color
    return `
      url('/images/tokenomics/${props.$image}.png'),
      url('/images/tokenomics/${props.$image}.jpg'),
      ${props.$index % 2 === 0 ? '#000000' : '#ffffff'}
    `;
  }};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin: 0;
`;

const ContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: clamp(8px, 2vw, 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Number = styled.div`
  font-size: clamp(0.6rem, 1.5vw, 0.9rem);
  font-weight: 700;
  line-height: 1.2;
  color: #000000;
  text-align: center;
  margin-bottom: 2px;
`;

const CardTitle = styled.h3`
  font-size: clamp(0.7rem, 1.6vw, 1.0rem);
  font-weight: 600;
  text-align: center;
  margin: 0;
  line-height: 1.3;
  color: #000000;
`;

const tokenomicsData = [
  {
    image: 'retail-holders',
    number: '1,551,183,860',
    percentage: '31.02%',
    title: 'Retail Holders',
    description: 'Community-owned tokens distributed to retail investors'
  },
  {
    image: 'reserve',
    number: '934,000,000',
    percentage: '18.68%',
    title: 'Reserve',
    description: 'Strategic reserve fund for future development'
  },
  {
    image: 'ecosystem',
    number: '587,005,975',
    percentage: '11.74%',
    title: 'Ecosystem',
    description: 'Supporting ecosystem projects and grants'
  },
  {
    image: 'cex',
    number: '498,875,854',
    percentage: '9.98%',
    title: 'CEX',
    description: 'Centralized exchange listings and liquidity'
  },
  {
    image: 'team',
    number: '391,552,280',
    percentage: '7.83%',
    title: 'Team',
    description: 'Core team and strategic advisors allocation'
  },
  {
    image: 'staking',
    number: '377,840,453',
    percentage: '7.56%',
    title: 'Staking',
    description: 'Incentives for network validators and stakers'
  },
  {
    image: 'discovery-reward',
    number: '225,000,000',
    percentage: '4.50%',
    title: 'Discovery Reward',
    description: 'Rewards for network discovery and participation'
  },
  {
    image: 'burned',
    number: '160,059,961',
    percentage: '3.20%',
    title: 'Burned',
    description: 'Tokens permanently removed from circulation'
  },
  {
    image: 'hok',
    number: '119,263,367',
    percentage: '2.39%',
    title: 'HOK',
    description: 'HOK protocol integration and rewards'
  },
  {
    image: 'defi-protocols',
    number: '76,218,251',
    percentage: '1.52%',
    title: 'DeFi Protocols',
    description: 'Decentralized finance protocol integrations'
  },
  {
    image: 'revenue-aggregator',
    number: '10,000,000',
    percentage: '0.20%',
    title: 'Revenue Aggregator',
    description: 'Revenue aggregation and distribution mechanism'
  }
];

export const TokenomicsSection = () => {
  return (
    <Section>
      <Title>KAI Tokenomics</Title>
      <TokenomicsGrid>
        {tokenomicsData.map((item, index) => (
          <TokenCard 
            key={index} 
            $index={index} 
            $percentage={item.percentage}
          >
            <ImageSection 
              $image={item.image}
              $index={index} 
              $percentage={item.percentage}
            >
              <HoverPercentage $index={index}>
                {item.percentage}
              </HoverPercentage>
            </ImageSection>
            <ContentOverlay>
              <Number>{item.number}</Number>
              <CardTitle>{item.title}</CardTitle>
            </ContentOverlay>
          </TokenCard>
        ))}
      </TokenomicsGrid>
    </Section>
  );
};
