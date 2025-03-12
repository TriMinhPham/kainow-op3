import React from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { StakingSection } from './components/StakingSection';
import { RewardsSection } from './components/RewardsSection';
import { BoosterSection } from './components/BoosterSection';
import { Footer } from './components/Footer';
import { DataProvider } from './components/DataContext';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <DataProvider>
      <AppContainer>
        <Header />
        <MainContent>
          <IntroSection />
          <StakingSection />
          <RewardsSection />
          <BoosterSection />
        </MainContent>
        <Footer />
      </AppContainer>
    </DataProvider>
  );
}

export default App;
