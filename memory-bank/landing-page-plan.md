Implementation Plan for React-Based Landing Page
Objective
Create a React landing page for kai.now with:

Initial black background.
A centered video (10% of viewport width, 5 seconds, auto-playing).
At 3 seconds, a ripple effect transitions the background from black to white, starting from the video’s center.
Tools & Technologies
Frontend: React (functional components, hooks).
Styling: CSS (or styled-components if preferred).
Video: HTML5 <video> tag via React.
Dependencies: No external animation libraries needed (pure CSS for ripple).
Hosting: Assumes deployment via Vercel/Netlify with existing React setup.
Step-by-Step Plan
1. Planning & Asset Preparation
Assets:
Prepare a 5-second video (intro.mp4):
Resolution: ~300x300px (optimized for 10% screen size).
Compress: <5MB using HandBrake or similar.
Place in /public/assets/ folder (React’s public directory).
2. Setup Project Structure
Directory:
Add to existing React project (assumes src/ structure):
src/components/LandingPage.jsx (main component).
src/components/LandingPage.css (styles).
Routing:
If using React Router, add a route (e.g., <Route path="/landing" element={<LandingPage />} /> in App.jsx).
Otherwise, replace the root component or link to it.
3. Build the Landing Page
Component (src/components/LandingPage.jsx):
jsx

Collapse

Wrap

Copy
import React, { useEffect, useRef } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const videoRef = useRef(null);
  const rippleContainerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const rippleContainer = rippleContainerRef.current;

    const createRipple = () => {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');

      // Center ripple on video
      const videoRect = video.getBoundingClientRect();
      const rippleSize = Math.max(window.innerWidth, window.innerHeight) * 2;
      ripple.style.width = ripple.style.height = `${rippleSize}px`;
      ripple.style.left = `${videoRect.left + videoRect.width / 2 - rippleSize / 2}px`;
      ripple.style.top = `${videoRect.top + videoRect.height / 2 - rippleSize / 2}px`;

      rippleContainer.appendChild(ripple);

      // Change background to white after ripple completes
      setTimeout(() => {
        document.body.style.background = 'white';
      }, 2000); // Matches ripple animation duration
    };

    // Trigger ripple at 3 seconds
    const timer = setTimeout(createRipple, 3000);

    // Hide video after it ends
    video.onended = () => {
      video.style.display = 'none';
    };

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div className="landing-container">
      <div className="ripple-container" ref={rippleContainerRef}></div>
      <video
        ref={videoRef}
        className="center-video"
        autoPlay
        muted
        playsInline
      >
        <source src="/assets/intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LandingPage;
Styles (src/components/LandingPage.css):
css

Collapse

Wrap

Copy
.landing-container {
  margin: 0;
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.center-video {
  width: 10vw; /* 10% of viewport width */
  height: auto;
  position: relative;
  z-index: 1;
}
.ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.ripple {
  position: absolute;
  border-radius: 50%;
  background: white;
  transform: scale(0);
  animation: ripple 2s linear forwards;
  z-index: 0;
}
@keyframes ripple {
  to {
    transform: scale(10); /* Covers screen */
    opacity: 1;
  }
}
4. Integrate with Existing React App
App.jsx (if using React Router):
jsx

Collapse

Wrap

Copy
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
Link from Homepage:
Add <Link to="/landing">Enter</Link> in your current homepage component.
5. Testing & Optimization
Cross-Browser Testing:
Test on Chrome, Firefox, Safari, and mobile devices.
Verify ripple scales correctly across screen sizes.
Performance:
Ensure intro.mp4 is optimized (<5MB).
Check for React re-render issues (use useEffect dependencies correctly).
Debug:
Confirm video auto-plays and ripple triggers at 3 seconds.
Test cleanup (no duplicate ripples on component unmount).