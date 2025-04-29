import React, { useState } from 'react';

const NavBar = ({ onLogoClick }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black z-50 border-b border-[#00FF9D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={onLogoClick}>
              <svg 
                className="h-8 w-8 mr-2" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00FF9D' }} />
                    <stop offset="50%" style={{ stopColor: '#00CC7E' }} />
                    <stop offset="100%" style={{ stopColor: '#008F58' }} />
                  </linearGradient>
                </defs>
                <circle 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="url(#navLogoGradient)"
                  strokeWidth="2.5" 
                  fill="none" 
                />
                <path 
                  d="M7.5 12l3 3 6-6" 
                  stroke="url(#navLogoGradient)"
                  strokeWidth="2.5" 
                  fill="none" 
                />
              </svg>
              <span 
                className="text-2xl font-bold tracking-wider"
                style={{
                  background: 'linear-gradient(180deg, #00FF9D 0%, #008F58 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 5px rgba(0,255,157,0.5)',
                  fontFamily: "'Arial Black', sans-serif"
                }}
              >
                VERIFIED
              </span>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center">
              <button 
                className="ml-4 px-4 py-2 border border-[#00FF9D] rounded-md text-sm font-medium"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,255,157,0.1), rgba(0,143,88,0.1))',
                  boxShadow: '0 0 5px rgba(0,255,157,0.5)',
                  color: '#00FF9D',
                  textShadow: '0 0 3px rgba(0,255,157,0.5)'
                }}
                onClick={() => setShowLoginModal(true)}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div 
            className="bg-black p-8 rounded-lg border-2 max-w-md w-full mx-4"
            style={{
              borderImage: 'linear-gradient(90deg, #00FF9D, #008F58) 1',
              boxShadow: '0 0 20px rgba(0,255,157,0.3)'
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-2xl font-bold"
                style={{
                  background: 'linear-gradient(180deg, #00FF9D 0%, #008F58 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 5px rgba(0,255,157,0.3)',
                  fontFamily: "'Arial Black', sans-serif"
                }}
              >
                LOGIN
              </h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowLoginModal(false)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#00FF9D' }}
                >
                  EMAIL
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-3 py-2 bg-black border rounded-md focus:outline-none focus:ring-2" 
                  style={{ 
                    borderColor: '#00CC7E',
                    color: 'white',
                    boxShadow: '0 0 5px rgba(0,255,157,0.3)',
                    textShadow: '0 0 2px rgba(0,255,157,0.2)'
                  }}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#00FF9D' }}
                >
                  PASSWORD
                </label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full px-3 py-2 bg-black border rounded-md focus:outline-none focus:ring-2" 
                  style={{ 
                    borderColor: '#00CC7E',
                    color: 'white',
                    boxShadow: '0 0 5px rgba(0,255,157,0.3)',
                    textShadow: '0 0 2px rgba(0,255,157,0.2)'
                  }}
                />
              </div>
              
              <div>
                <button
                  type="button"
                  className="w-full py-2 px-4 border rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background: 'linear-gradient(90deg, #00FF9D, #008F58)',
                    color: 'black',
                    fontWeight: 'bold',
                    boxShadow: '0 0 10px rgba(0,255,157,0.5)',
                    textShadow: '0 0 3px rgba(255,255,255,0.5)'
                  }}
                  onClick={() => setShowLoginModal(false)}
                >
                  LOG IN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;