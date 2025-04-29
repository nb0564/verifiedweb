import React, { useEffect, useRef, useState } from 'react';

const MatrixRain = ({ transitionProgress = 0 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binary = '10';
    const drops = [];
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Colors for multi-color transition effect
    const colors = [
      [0, 0, 0],         // Black (starting color)
      [0, 255, 157],     // Green (primary matrix color)
      [0, 157, 255],     // Blue
      [157, 0, 255],     // Purple
      [255, 157, 0]      // Orange
    ];
    
    // Character opacity will be controlled separately from color
    const characterOpacity = Math.max(0, 0.9 - transitionProgress * 0.9);

    // Initialize drops with random starting positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Calculate the bg color based on transition progress (0-1)
      // Yellow to black transition (smoother with cubic easing)
      const easeOutProgress = Math.min(1, transitionProgress * 1.2); // slightly faster progress for background
      const rValue = Math.floor(255 * Math.pow(1 - easeOutProgress, 1.5));
      const gValue = Math.floor(220 * Math.pow(1 - easeOutProgress, 1.5));
      const bValue = Math.floor(100 * Math.pow(1 - easeOutProgress, 1.5));
      
      // Background fade - reduced opacity for smoother transition
      ctx.fillStyle = `rgba(${rValue}, ${gValue}, ${bValue}, 0.03)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] * fontSize > 0) {
          const text = binary[Math.floor(Math.random() * binary.length)];
          
          // Multi-color effect based on position and transition
          const colorIndex = Math.floor((drops[i] + transitionProgress * 10) % colors.length);
          const nextColorIndex = (colorIndex + 1) % colors.length;
          const colorMixProgress = ((drops[i] + transitionProgress * 10) % 1);
          
          // Linear interpolation between colors
          const r = Math.floor(colors[colorIndex][0] * (1 - colorMixProgress) + colors[nextColorIndex][0] * colorMixProgress);
          const g = Math.floor(colors[colorIndex][1] * (1 - colorMixProgress) + colors[nextColorIndex][1] * colorMixProgress);
          const b = Math.floor(colors[colorIndex][2] * (1 - colorMixProgress) + colors[nextColorIndex][2] * colorMixProgress);
          
          // Apply character opacity based on transition progress
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${characterOpacity})`;
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }
        
        if (drops[i] * fontSize > canvas.height) {
          drops[i] = -Math.random() * 20;
        }
        
        // Speed of falling characters - slower for smoother effect
        drops[i] += 0.35 + (transitionProgress * 0.3); // Slightly increases speed during transition
      }
    };

    const interval = setInterval(draw, 25); // Faster refresh rate for smoother animation

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = canvas.width / fontSize;
      drops.length = 0;
      for (let i = 0; i < newColumns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [transitionProgress]);

  // Base background color transitions from yellow to black with smoother cubic easing
  const bgColorStyle = {
    backgroundColor: `rgba(${Math.floor(255 * Math.pow(1 - transitionProgress, 1.5))}, 
                           ${Math.floor(220 * Math.pow(1 - transitionProgress, 1.5))}, 
                           ${Math.floor(100 * Math.pow(1 - transitionProgress, 1.5))}, 0.8)`,
    transition: 'background-color 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full" style={bgColorStyle} />
      <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />
    </>
  );
};

const NetworkStateLanding = () => {
  const [opacity, setOpacity] = useState(1);
  const [transitionProgress, setTransitionProgress] = useState(0);
  
  useEffect(() => {
    // Start transition after 2 seconds
    const timer = setTimeout(() => {
      // Animate transition over 3 seconds (75 steps of 40ms for smoother animation)
      const transition = setInterval(() => {
        setTransitionProgress((prev) => {
          // Smoother easing function - ease-in-out cubic
          // Start slower, accelerate in the middle, and slow down at the end
          const step = 0.0133; // Smaller step for longer animation (~1.33% each step)
          const newProgress = prev + step;
          
          if (newProgress >= 1) {
            clearInterval(transition);
            return 1;
          }
          return newProgress;
        });
        
        // Fade out content with a more subtle curve
        // Start fading out after 40% of the transition has completed
        if (transitionProgress > 0.4) {
          setOpacity((prevOpacity) => {
            // Slower fade out rate
            const newOpacity = prevOpacity - 0.025;
            if (newOpacity <= 0) {
              return 0;
            }
            return newOpacity;
          });
        }
      }, 40);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [transitionProgress]);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        opacity, 
        transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)' 
      }}
    >
      <MatrixRain transitionProgress={transitionProgress} />
      
      {/* Content */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Checkmark Logo with enhanced depth */}
          <div className="relative mb-8">
            <svg 
              className="w-32 h-32 mx-auto filter drop-shadow-[0_0_8px_rgba(0,255,0,0.6)]" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#00FF9D' }} />
                  <stop offset="50%" style={{ stopColor: '#00CC7E' }} />
                  <stop offset="100%" style={{ stopColor: '#008F58' }} />
                </linearGradient>
              </defs>
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="url(#logoGradient)"
                strokeWidth="2.5" 
                fill="none" 
              />
              <path 
                d="M7.5 12l3 3 6-6" 
                stroke="url(#logoGradient)"
                strokeWidth="2.5" 
                fill="none" 
              />
            </svg>
          </div>
          
          {/* Title with enhanced depth */}
          <div className="relative mb-8">
            <h1 
              className="text-8xl font-black tracking-widest"
              style={{
                background: 'linear-gradient(180deg, #00FF9D 0%, #008F58 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `
                  2px 2px 0px rgba(0,0,0,0.2),
                  4px 4px 0px rgba(0,0,0,0.1),
                  0 0 10px rgba(0,255,157,0.5),
                  0 0 20px rgba(0,255,157,0.3)
                `,
                fontFamily: "'Arial Black', sans-serif"
              }}
            >
              VERIFIED
            </h1>
          </div>

          {/* Divider with glow */}
          <div 
            className="w-32 h-1 mx-auto my-8 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00FF9D, #008F58)',
              boxShadow: '0 0 10px rgba(0,255,157,0.5)'
            }}
          />

          {/* Subtitles with enhanced depth */}
          <div className="space-y-3">
            <h2 
              className="text-3xl font-black tracking-widest"
              style={{
                background: 'linear-gradient(180deg, #00FF9D 0%, #008F58 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `
                  2px 2px 0px rgba(0,0,0,0.2),
                  0 0 10px rgba(0,255,157,0.3)
                `,
                fontFamily: "'Arial Black', sans-serif"
              }}
            >
              PROVE YOUR AUTHENTICITY
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkStateLanding;