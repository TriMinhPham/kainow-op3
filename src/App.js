import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { StakingSection } from './components/StakingSection';
import { RewardsSection } from './components/RewardsSection';
import { BoosterSection } from './components/BoosterSection';
import { Footer } from './components/Footer';
import { DataProvider } from './components/DataContext';
import { RippleBackground } from './components/RippleBackground';
import LandingPage from './components/landing/LandingPage';
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
      <StakingSection />
      <RewardsSection />
      <BoosterSection />
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppContainer>
      </Router>
    </DataProvider>
  );
}

export default App;
