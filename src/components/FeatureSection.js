import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const Section = styled.section`
  padding: 60px 20px;
  background: #f8f9fa;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 16px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const StackContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Layer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.$backgroundImage});
    background-size: contain;
    background-position: left center;
    background-repeat: no-repeat;
    opacity: 0.2;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const LayerTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 6px;
  font-weight: 600;
`;

const LayerDescription = styled.p`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 12px;
`;

const ComponentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 8px;
  margin-top: 12px;
`;

const Component = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 8px;
  text-align: center;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  
  &:hover {
    ${props => props.$clickable && `
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      border-color: #007bff;
    `}
  }
`;

const ComponentIcon = styled.div`
  font-size: 1.2rem;
  margin-bottom: 4px;
`;

const ComponentName = styled.div`
  font-size: 0.75rem;
  color: #333;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  margin-top: 4px;
  background: ${props => props.$status === 'live' ? '#d4edda' : '#fff3cd'};
  color: ${props => props.$status === 'live' ? '#155724' : '#856404'};
`;

export const FeatureSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <Section><LoadingSpinner text="Loading features..." /></Section>;
  if (error) return <Section><div>Error loading content</div></Section>;
  if (!webContent) return <Section><div>No content available</div></Section>;
  
  const { featureSection } = webContent;
  
  const handleComponentClick = (component) => {
    if (component.url) {
      window.open(component.url, '_blank');
    }
  };
  
  return (
    <Section>
      <Title>{featureSection.title}</Title>
      <Subtitle>{featureSection.subtitle}</Subtitle>
      
      <StackContainer>
        {featureSection.stackLayers.map((layer, index) => {
          const backgroundImage = `/images/feature-${index + 1}.png`;
          return (
            <Layer key={index} $backgroundImage={backgroundImage}>
              <LayerTitle>{layer.title}</LayerTitle>
              <LayerDescription>{layer.description}</LayerDescription>
              
              <ComponentsGrid>
                {layer.components.map((component, componentIndex) => (
                  <Component 
                    key={componentIndex}
                    $clickable={!!component.url}
                    onClick={() => handleComponentClick(component)}
                    title={component.url ? `Visit ${component.name}` : component.name}
                  >
                    <ComponentIcon>{component.icon}</ComponentIcon>
                    <ComponentName>{component.name}</ComponentName>
                    {component.status && (
                      <StatusBadge $status={component.status}>
                        {component.status === 'live' ? 'Live' : 'Coming Soon'}
                      </StatusBadge>
                    )}
                  </Component>
                ))}
              </ComponentsGrid>
            </Layer>
          );
        })}
      </StackContainer>
    </Section>
  );
};
