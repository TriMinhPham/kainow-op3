import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--beige-light);
  background-image: 
    linear-gradient(45deg, var(--gold) 0.5%, transparent 0.75%),
    linear-gradient(135deg, var(--green-dark) 0.5%, transparent 0.75%),
    linear-gradient(225deg, var(--earth) 0.5%, transparent 0.75%),
    linear-gradient(315deg, var(--red) 0.5%, transparent 0.75%),
    radial-gradient(circle at 25% 25%, var(--gold) 1%, transparent 5%),
    radial-gradient(circle at 75% 75%, var(--green) 1%, transparent 5%),
    radial-gradient(circle at 50% 50%, var(--red-light) 1%, transparent 8%);
  background-size: 150px 150px, 150px 150px, 150px 150px, 150px 150px, 
                  200px 200px, 200px 200px, 300px 300px;
  opacity: 0.05;
`;

const RippleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    var(--beige-light) 70%
  );
  mix-blend-mode: multiply;
`;

export const RippleBackground = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ripples = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Add a few initial ripples for effect
    for (let i = 0; i < 3; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      ripples.current.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 100 + 50,
        alpha: 0.7,
        speed: Math.random() * 1 + 1
      });
    }
    
    // Create periodic random ripples
    const autoRippleInterval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      ripples.current.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 80 + 40,
        alpha: 0.5,
        speed: Math.random() * 1 + 0.5
      });
    }, 3000);
    
    const lastTriggerRef = { current: 0 };
    
    const handleMouseMove = (e) => {
      // Only create a new ripple every 100ms to avoid too many ripples
      if (Date.now() - lastTriggerRef.current > 100) {
        lastTriggerRef.current = Date.now();
        
        // Add a new ripple
        ripples.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: Math.random() * 80 + 40,
          alpha: 1,
          speed: Math.random() * 2 + 2
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
      clearInterval(autoRippleInterval);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw ripples
      for (let i = 0; i < ripples.current.length; i++) {
        const ripple = ripples.current[i];
        
        ripple.radius += ripple.speed;
        ripple.alpha -= ripple.alpha > 0.3 ? 0.01 : 0.005; // Slow down fade for a longer trail
        
        if (ripple.alpha <= 0 || ripple.radius > ripple.maxRadius) {
          ripples.current.splice(i, 1);
          i--;
          continue;
        }
        
        // Draw golden ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 180, 131, ${ripple.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw green inner ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(107, 142, 102, ${ripple.alpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Add red accent ripple with different timing
        if (ripple.radius > 10) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(194, 78, 74, ${ripple.alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        // Add faint glow
        const gradient = ctx.createRadialGradient(
          ripple.x, ripple.y, 0,
          ripple.x, ripple.y, ripple.radius * 1.2
        );
        gradient.addColorStop(0, `rgba(212, 180, 131, 0)`);
        gradient.addColorStop(0.7, `rgba(212, 180, 131, ${ripple.alpha * 0.05})`);
        gradient.addColorStop(1, `rgba(212, 180, 131, 0)`);
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      requestRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions]);

  return (
    <BackgroundContainer>
      <BackgroundImage />
      <RippleCanvas ref={canvasRef} />
      <Overlay />
    </BackgroundContainer>
  );
};