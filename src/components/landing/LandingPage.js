import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingContainer = styled.div`
  margin: 0;
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const CenterVideo = styled.video`
  width: 10vw;
  height: auto;
  position: relative;
  z-index: 1;
  max-width: 300px;
  min-width: 150px;
  opacity: 0.3;
  transition: opacity 0.5s ease;
  cursor: pointer;

  &.playing {
    opacity: 1;
  }
`;

const RippleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const SkipButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: white;
  text-align: center;
  z-index: 2;
`;

const LandingPage = () => {
  const videoRef = useRef(null);
  const rippleContainerRef = useRef(null);
  const navigate = useNavigate();
  const [showSkip, setShowSkip] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const sequenceTimerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const rippleContainer = rippleContainerRef.current;

    const handleVideoError = (e) => {
      console.error('Video error:', e);
      setError('Error loading video. Please try again.');
    };

    const handleVideoLoad = () => {
      console.log('Video loaded successfully');
      setError(null);
      // Set the video to the first frame
      video.currentTime = 0;
    };

    const handleVideoPlay = () => {
      console.log('Video started playing');
      setIsPlaying(true);
      video.classList.add('playing');
    };

    const handleVideoCanPlay = () => {
      console.log('Video can play');
    };

    const handleMouseEnter = () => {
      if (!isPlaying) {
        startSequence();
      }
    };

    const startSequence = () => {
      // Clear any existing timers
      if (sequenceTimerRef.current) {
        clearTimeout(sequenceTimerRef.current);
      }

      // Start video
      video.play().catch(err => {
        console.error('Error playing video:', err);
        setError('Could not play video. Please try again.');
      });

      // Create ripple after 3 seconds
      sequenceTimerRef.current = setTimeout(() => {
        createRipple();
      }, 3000);

      // Navigate after 7 seconds (3s wait + 4s ripple)
      sequenceTimerRef.current = setTimeout(() => {
        navigate('/home');
      }, 7000);
    };

    const createRipple = () => {
      // Clear existing ripples
      rippleContainer.innerHTML = '';
      
      // Create multiple ripples with different delays
      for (let i = 0; i < 3; i++) {
        const ripple = document.createElement('div');
        const videoRect = video.getBoundingClientRect();
        const rippleSize = Math.max(window.innerWidth, window.innerHeight) * 2;
        
        ripple.style.width = ripple.style.height = `${rippleSize}px`;
        ripple.style.left = `${videoRect.left + videoRect.width / 2 - rippleSize / 2}px`;
        ripple.style.top = `${videoRect.top + videoRect.height / 2 - rippleSize / 2}px`;
        ripple.style.background = '#333333';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = `wave 4s ease-out ${i * 0.2}s forwards`;
        rippleContainer.appendChild(ripple);
      }
    };

    video.addEventListener('error', handleVideoError);
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('mouseenter', handleMouseEnter);

    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    video.onended = () => {
      navigate('/home');
    };

    return () => {
      clearTimeout(skipTimer);
      if (sequenceTimerRef.current) {
        clearTimeout(sequenceTimerRef.current);
      }
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [navigate, isPlaying]);

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <LandingContainer>
      <RippleContainer ref={rippleContainerRef} />
      <CenterVideo
        ref={videoRef}
        muted
        playsInline
        loop={false}
        preload="auto"
      >
        <source src="/assets/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </CenterVideo>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {showSkip && <SkipButton onClick={handleSkip}>Skip Intro</SkipButton>}
    </LandingContainer>
  );
};

export default LandingPage; 