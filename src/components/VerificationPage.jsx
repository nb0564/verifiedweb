import React, { useRef, useEffect } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binary = '10';
    const drops = [];
    const fontSize = 12; // Smaller font for more cohesive code appearance
    const letterSpacing = -1; // Negative letter spacing for cohesiveness
    const columns = canvas.width / (fontSize + letterSpacing);

    // Initialize drops with random starting positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Create gradient background
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)'); // Deep blue-black
      gradient.addColorStop(1, 'rgba(13, 17, 23, 0.8)'); // Slightly different deep blue-black
      return gradient;
    };

    // Array of colors for a more interesting matrix rain
    const colors = [
      [52, 211, 153, 0.8],  // Teal
      [56, 189, 248, 0.8],  // Sky blue
      [167, 139, 250, 0.8], // Purple
      [251, 191, 36, 0.8]   // Amber
    ];

    const draw = () => {
      // Semi-transparent gradient background for trail effect
      ctx.fillStyle = 'rgba(10, 15, 30, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Varied text styles with slight glow effect
      ctx.shadowBlur = 6;
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.letterSpacing = `${letterSpacing}px`;

      for (let i = 0; i < drops.length; i++) {
        const text = binary[Math.floor(Math.random() * binary.length)];
        
        // Vary the color based on position and time for visual interest
        const colorIndex = Math.floor((i / columns * 4 + Date.now() / 3000) % colors.length);
        const color = colors[colorIndex];
        
        // Brighter at the top of each drop, fading as it falls
        const distanceFromTop = drops[i] <= 1 ? 1 : Math.min(drops[i] / 5, 1);
        const alpha = Math.max(1 - distanceFromTop, 0.3);
        
        ctx.shadowColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`;
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        
        // Slight horizontal wobble for organic feel
        const wobble = Math.sin(i + Date.now() / 1000) * 0.5;
        
        ctx.fillText(text, i * (fontSize + letterSpacing) + wobble, drops[i] * fontSize);
        
        // Reset drops with varied timing
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        
        // Varied drop speeds
        drops[i] += Math.random() * 0.4 + 0.2;
      }
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 30); // Slightly faster refresh for smoother animation

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = canvas.width / (fontSize + letterSpacing);
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
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 to-gray-900 opacity-90" />
      <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />
    </>
  );
};

const VerificationPage = ({ onVerify, verificationCode, setVerificationCode }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationCode.trim()) {
      onVerify(verificationCode.trim());
    }
  };

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      <MatrixBackground />
      
      <div className="max-w-4xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-black tracking-widest mb-4"
            style={{
              background: 'linear-gradient(180deg, #52D3A6 0%, #38A89D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `
                2px 2px 0px rgba(0,0,0,0.2),
                0 0 10px rgba(82, 211, 166, 0.5),
                0 0 20px rgba(82, 211, 166, 0.3)
              `,
              fontFamily: "'Arial Black', sans-serif"
            }}
          >
            VERIFY CONTENT
          </h1>
          
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{
              color: '#52D3A6',
              textShadow: '0 0 5px rgba(82, 211, 166, 0.5)'
            }}
          >
            Enter the 6-character verification code to confirm the authenticity of content and view metadata
          </p>
        </div>
        
        <div 
          className="max-w-lg mx-auto p-8 rounded-lg"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid #52D3A6',
            boxShadow: '0 0 20px rgba(82, 211, 166, 0.3)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="verification-code" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#52D3A6' }}
              >
                VERIFICATION CODE
              </label>
              <div className="relative">
                <div 
                  className="flex justify-center space-x-1 md:space-x-2"
                >
                  {Array(6).fill(0).map((_, index) => {
                    const char = verificationCode[index] || '';
                    return (
                      <div 
                        key={index} 
                        className="flex-1 max-w-[45px] aspect-square relative"
                      >
                        <input
                          type="text"
                          className="sr-only"
                          readOnly
                        />
                        <div 
                          className="w-full h-full flex items-center justify-center text-xl font-mono tracking-tight bg-opacity-70 border rounded-md transition-all duration-300 transform"
                          style={{
                            background: char ? 'rgba(10, 17, 30, 0.9)' : 'rgba(10, 17, 30, 0.7)',  
                            borderColor: char ? '#52D3A6' : '#38A89D',
                            borderWidth: '2px',
                            color: char ? '#52D3A6' : 'rgba(82, 211, 166, 0.5)',
                            boxShadow: char 
                              ? '0 0 10px rgba(82, 211, 166, 0.5), 0 0 20px rgba(82, 211, 166, 0.2) inset' 
                              : '0 0 5px rgba(82, 211, 166, 0.2) inset',
                            textShadow: char ? '0 0 5px rgba(82, 211, 166, 0.7)' : 'none',
                            transform: char ? 'translateY(-2px)' : 'translateY(0)',
                            letterSpacing: '-1px' // Make characters more cohesive
                          }}
                        >
                          {char}
                        </div>
                        {index < 5 && (
                          <div 
                            className="absolute top-1/2 -right-1 md:-right-2 h-[2px] w-[4px] z-0 md:w-[6px] transition-all duration-300"
                            style={{
                              backgroundColor: char ? '#52D3A6' : '#38A89D',
                              transform: 'translateY(-50%)',
                              boxShadow: '0 0 4px rgba(82, 211, 166, 0.7)',
                              opacity: char ? 1 : 0.5
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <input 
                  type="text" 
                  id="verification-code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                  placeholder=""
                  maxLength={6}
                  className="absolute inset-0 opacity-0 w-full h-full text-center bg-transparent cursor-pointer z-10" 
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!verificationCode.trim()}
              className="w-full py-3 px-4 mt-6 border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
              style={{
                background: verificationCode.trim() ? 'linear-gradient(90deg, #52D3A6, #38A89D)' : 'rgba(82, 211, 166, 0.1)', 
                color: verificationCode.trim() ? 'black' : 'rgba(82, 211, 166, 0.5)',
                fontWeight: 'bold',
                boxShadow: verificationCode.trim() ? '0 0 15px rgba(82, 211, 166, 0.5)' : 'none',
                textShadow: verificationCode.trim() ? '0 0 3px rgba(255,255,255,0.5)' : 'none',
                borderColor: '#38A89D'
              }}
            >
              VERIFY
            </button>
          </form>
        </div>
        
        <div className="mt-16 text-center">
          <h2 
            className="text-2xl font-bold mb-8"
            style={{
              color: '#52D3A6',
              textShadow: '0 0 8px rgba(82, 211, 166, 0.5)'
            }}
          >
            HOW IT WORKS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="p-6 rounded-lg"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid #38A89D',
                boxShadow: '0 0 10px rgba(82, 211, 166, 0.2)'
              }}
            >
              <div className="text-4xl mb-4 mx-auto"
                style={{
                  color: '#52D3A6',
                  textShadow: '0 0 10px rgba(82, 211, 166, 0.6)'
                }}
              >
                📸
              </div>
              <h3 
                className="text-lg font-bold mb-2"
                style={{
                  color: '#52D3A6',
                  textShadow: '0 0 5px rgba(82, 211, 166, 0.5)'
                }}
              >
                CREATE CONTENT
              </h3>
              <p className="text-gray-300">
                Capture photos or videos with our app to create verified 
                content with unique identifiers
              </p>
            </div>
            
            <div 
              className="p-6 rounded-lg"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid #38A89D',
                boxShadow: '0 0 10px rgba(82, 211, 166, 0.2)'
              }}
            >
              <div className="text-4xl mb-4 mx-auto"
                style={{
                  color: '#52D3A6',
                  textShadow: '0 0 10px rgba(82, 211, 166, 0.6)'
                }}
              >
                🔐
              </div>
              <h3 
                className="text-lg font-bold mb-2"
                style={{
                  color: '#52D3A6',
                  textShadow: '0 0 5px rgba(82, 211, 166, 0.5)'
                }}
              >
                GET VERIFICATION CODE
              </h3>
              <p className="text-gray-300">
                Each verified piece of content receives a unique 6-character code 
                that proves its origin
              </p>
            </div>
            
            <div 
              className="p-6 rounded-lg"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid #38A89D',
                boxShadow: '0 0 10px rgba(82, 211, 166, 0.2)'
              }}
            >
              <div className="text-4xl mb-4 mx-auto"
                style={{
                  color: '#52D3A6',
                  textShadow: '0 0 10px rgba(82, 211, 166, 0.6)'
                }}
              >
                ✅
              </div>
              <h3 
                className="text-lg font-bold mb-2"
                style={{
                  color: '#52D3A6',
                  textShadow: '0 0 5px rgba(82, 211, 166, 0.5)'
                }}
              >
                VERIFY AUTHENTICITY
              </h3>
              <p className="text-gray-300">
                Anyone can verify content is authentic by entering the code on this site
                to view metadata
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;