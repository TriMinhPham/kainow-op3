import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageTransition from '../common/PageTransition';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: black;
  color: white;
  padding: 20px;
`;

const HomePage = () => {
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    // Fade in the home page
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HomeContainer>
      <PageTransition isActive={isTransitioning} />
      {/* Your existing HomePage content */}
    </HomeContainer>
  );
};

export default HomePage; 