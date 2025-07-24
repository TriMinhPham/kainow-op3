import React from 'react';
import styled from 'styled-components';
import { useWebContent } from './DataContext';
import { LoadingSpinner } from './LoadingSpinner';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  
  /* Responsive aspect ratios for different screen sizes */
  @media (max-width: 1024px) {
    aspect-ratio: 2.5 / 1;
  }
  
  @media (max-width: 768px) {
    aspect-ratio: 2 / 1;
  }
  
  @media (max-width: 480px) {
    aspect-ratio: 1.5 / 1;
    min-height: 400px;
  }
  
  /* Fallback for browsers that don't support aspect-ratio */
  @supports not (aspect-ratio: 3 / 1) {
    height: 33.33vw;
    min-height: 300px;
    
    @media (max-width: 1024px) {
      height: 40vw;
    }
    
    @media (max-width: 768px) {
      height: 50vw;
    }
    
    @media (max-width: 480px) {
      height: 66.67vw;
      min-height: 400px;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--gold), var(--green-dark), var(--red));
    z-index: 3;
    
    @media (max-width: 480px) {
      height: 4px;
    }
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  
  @media (max-width: 768px) {
    object-position: right center;
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const LaunchButton = styled.button`
  background: linear-gradient(135deg, #e8e8e8, #c0c0c0, #a8a8a8, #d3d3d3);
  color: #2c2c2c;
  border: 2px solid #b8b8b8;
  border-radius: 8px;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 
    0 6px 20px rgba(192, 192, 192, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
  
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
      rgba(255, 255, 255, 0.6),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    height: 40%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent);
    border-radius: 6px 6px 0 0;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, #f0f0f0, #c8c8c8, #b0b0b0, #dbdbdb);
    box-shadow: 
      0 8px 25px rgba(192, 192, 192, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    
    &::before {
      transform: translateX(100%);
    }
  }
  
  &:active {
    transform: translateY(-1px);
    background: linear-gradient(135deg, #d0d0d0, #a8a8a8, #909090, #c3c3c3);
    box-shadow: 
      0 4px 15px rgba(192, 192, 192, 0.3),
      inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.9rem 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;

export const IntroSection = () => {
  const { webContent, loading, error } = useWebContent();
  
  if (loading) return <HeroContainer id="home"><LoadingSpinner text="Loading intro..." /></HeroContainer>;
  if (error) return <HeroContainer id="home"><div>Error loading content</div></HeroContainer>;
  if (!webContent) return <HeroContainer id="home"><div>No content available</div></HeroContainer>;
  
  const { intro } = webContent;
  
  return (
    <HeroContainer id="home">
      <VideoBackground
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <VideoOverlay />
      <HeroContent>
        <HeroTitle>{intro.heading}</HeroTitle>
        <HeroTagline>{intro.description}</HeroTagline>
        <LaunchButton>{intro.buttonText}</LaunchButton>
      </HeroContent>
    </HeroContainer>
  );
};
