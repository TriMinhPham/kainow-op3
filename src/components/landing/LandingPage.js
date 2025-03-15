import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../common/PageTransition';

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
  opacity: 0;
  transition: opacity 0.5s ease;
  cursor: pointer;

  &.playing {
    opacity: 1;
  }
`;

const Logo = styled.img`
  width: 10vw;
  height: auto;
  position: absolute;
  z-index: 1;
  max-width: 300px;
  min-width: 150px;
  opacity: 1;
  transition: opacity 0.5s ease;

  &.hidden {
    opacity: 0;
  }
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

const PlayButton = styled.button`
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const SoundButton = styled.button`
  position: absolute;
  top: 20px;
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
  display: flex;
  align-items: center;
  gap: 8px;

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
  const navigate = useNavigate();
  const [showSkip, setShowSkip] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const logo = document.querySelector('.logo');

    const handleVideoError = (e) => {
      console.error('Video error:', e);
      console.error('Video error details:', video.error);
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
      if (logo) {
        logo.classList.add('hidden');
      }
    };

    const handleVideoCanPlay = () => {
      console.log('Video can play');
    };

    const startSequence = () => {
      console.log('Starting video sequence');
      // Start video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error('Error playing video:', err);
          setError('Could not play video. Please try again.');
        });
      }

      // Navigate when video ends
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          navigate('/home');
        }, 500); // Wait for transition to complete
      }, 7000);
    };

    video.addEventListener('error', handleVideoError);
    video.addEventListener('loadeddata', handleVideoLoad);
    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('canplay', handleVideoCanPlay);

    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    // Auto start the video after 1 second delay
    const startTimer = setTimeout(() => {
      startSequence();
    }, 1000);

    video.onended = () => {
      navigate('/home');
    };

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(startTimer);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('loadeddata', handleVideoLoad);
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('canplay', handleVideoCanPlay);
    };
  }, [navigate]);

  const handleToggleSound = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleSkip = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/home');
    }, 500); // Wait for transition to complete
  };

  return (
    <LandingContainer>
      <PageTransition isActive={isTransitioning} />
      <Logo 
        src="/assets/kardia-logo.jpg" 
        alt="Kardia Logo" 
        className="logo"
      />
      <CenterVideo
        ref={videoRef}
        playsInline
        loop={false}
        preload="auto"
        muted
      >
        <source src="/assets/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </CenterVideo>
      <SoundButton onClick={handleToggleSound}>
        {isMuted ? '🔇 Unmute' : '🔊 Mute'}
      </SoundButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {showSkip && <SkipButton onClick={handleSkip}>Skip Intro</SkipButton>}
    </LandingContainer>
  );
};

export default LandingPage; 