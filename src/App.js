import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { FeatureSection } from './components/FeatureSection';
import { StakingSection } from './components/StakingSection';
import { BoosterSection } from './components/BoosterSection';
import { TokenomicsSection } from './components/TokenomicsSection';
import { HowToBuySection } from './components/HowToBuySection';
import { Footer } from './components/Footer';
import { DataProvider } from './components/DataContext';
import { RippleBackground } from './components/RippleBackground';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
`;

const HomePage = () => (
  <>
    <Header />
    <MainContent>
      <IntroSection />
      <FeatureSection />
      <StakingSection />
      <BoosterSection />
      <TokenomicsSection />
      <HowToBuySection />
    </MainContent>
    <Footer />
  </>
);

function App() {
  return (
    <DataProvider>
      <Router>
        <GlobalStyles />
        <AppContainer>
          <RippleBackground />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppContainer>
      </Router>
    </DataProvider>
  );
}

export default App;
