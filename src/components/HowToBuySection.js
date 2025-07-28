import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 20px;
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 60px;
  text-align: center;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
  }
`;

const ExchangeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 800px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 400px;
  }
`;

const ExchangeCard = styled.a`
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
    background: #f8f8f8;
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  height: 80px;
  width: 100%;
`;

const ExchangeLogo = styled.img`
  max-height: 60px;
  max-width: 120px;
  object-fit: contain;
  margin: 0 10px;
`;

const ExchangeName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 10px;
  text-align: center;
`;

const ExchangeType = styled.span`
  font-size: 0.9rem;
  color: #666666;
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 15px;
`;

const ExchangeDescription = styled.p`
  font-size: 1rem;
  color: #333333;
  text-align: center;
  line-height: 1.5;
  margin: 0;
`;

const exchanges = [
  {
    name: 'Gate.io',
    type: 'CEX',
    description: 'Trade KAI/USDT on one of the world\'s leading cryptocurrency exchanges',
    logo: '/images/logo/gate-logo.png',
    url: 'https://www.gate.com/trade/KAI_USDT'
  },
  {
    name: 'Uniswap',
    type: 'DEX',
    description: 'Swap KAI tokens on Arbitrum network via Uniswap decentralized exchange',
    logo: ['/images/logo/uniswap-uni-logo.png', '/images/logo/arbitrum-arb-logo.png'],
    url: 'https://app.uniswap.org/explore/tokens/arbitrum/0xa891B374942cdE9061e044c1D19c5b5dE06a68e1'
  },
  {
    name: 'CoinMarketCap',
    type: 'Information',
    description: 'Check KAI price and find markets to buy on CoinMarketCap',
    logo: '/images/logo/CoinMarketCap-Logo.png',
    url: 'https://coinmarketcap.com/currencies/kardiachain/'
  }
];

export const HowToBuySection = () => {
  return (
    <Section id="how-to-buy">
      <Title>How to Buy $KAI</Title>
      <Subtitle>
        Purchase $KAI tokens on these trusted exchanges
      </Subtitle>
      <ExchangeGrid>
        {exchanges.map((exchange, index) => (
          <ExchangeCard 
            key={exchange.name}
            href={exchange.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LogoContainer>
              {Array.isArray(exchange.logo) ? (
                exchange.logo.map((logo, logoIndex) => (
                  <ExchangeLogo 
                    key={logoIndex}
                    src={logo} 
                    alt={`${exchange.name} logo ${logoIndex + 1}`}
                  />
                ))
              ) : (
                <ExchangeLogo 
                  src={exchange.logo} 
                  alt={`${exchange.name} logo`}
                />
              )}
            </LogoContainer>
            <ExchangeName>{exchange.name}</ExchangeName>
            <ExchangeType>{exchange.type}</ExchangeType>
            <ExchangeDescription>{exchange.description}</ExchangeDescription>
          </ExchangeCard>
        ))}
      </ExchangeGrid>
    </Section>
  );
};
