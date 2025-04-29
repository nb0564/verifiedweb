import React from 'react';

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: true 
  };
  return new Date(dateString).toLocaleString('en-US', options);
};

const VerificationResult = ({ result, onBackToSearch }) => {
  if (!result) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div 
          className="p-8 rounded-lg text-center max-w-lg w-full"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid #FF3A3A',
            boxShadow: '0 0 20px rgba(255,58,58,0.3)'
          }}
        >
          <div className="text-6xl mb-4">❌</div>
          <h2 
            className="text-2xl font-bold mb-4"
            style={{
              color: '#FF3A3A',
              textShadow: '0 0 5px rgba(255,58,58,0.5)'
            }}
          >
            INVALID CODE
          </h2>
          <p className="text-gray-300 mb-8">
            The verification code you entered was not found in our system.
            Please check the code and try again.
          </p>
          <button
            onClick={onBackToSearch}
            className="py-2 px-6 rounded-md font-medium"
            style={{
              background: 'rgba(255, 58, 58, 0.1)',
              color: '#FF3A3A',
              border: '1px solid #FF3A3A',
              boxShadow: '0 0 10px rgba(255,58,58,0.2)',
              textShadow: '0 0 3px rgba(255,58,58,0.3)'
            }}
          >
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Verification Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-full mb-4"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid #52D3A6',
              boxShadow: '0 0 15px rgba(82, 211, 166, 0.5)'
            }}
          >
            <svg 
              className="w-12 h-12 mx-auto filter" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(82, 211, 166, 0.6))'
              }}
            >
              <path 
                d="M7.5 12l3 3 6-6" 
                stroke="#52D3A6"
                strokeWidth="2.5" 
                fill="none" 
              />
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="#52D3A6"
                strokeWidth="2" 
                fill="none" 
              />
            </svg>
          </div>
          <h1 
            className="text-4xl font-black tracking-wider mb-2"
            style={{
              background: 'linear-gradient(180deg, #52D3A6 0%, #38A89D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 10px rgba(82, 211, 166, 0.5)',
              fontFamily: "'Arial Black', sans-serif"
            }}
          >
            CONTENT VERIFIED
          </h1>
          <p 
            className="text-lg"
            style={{
              color: '#52D3A6',
              textShadow: '0 0 5px rgba(82, 211, 166, 0.3)'
            }}
          >
            This content has been verified as authentic in our database
          </p>
        </div>

        {/* Content Preview and Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Content Preview */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid #52D3A6',
              boxShadow: '0 0 10px rgba(82, 211, 166, 0.3)'
            }}
          >
            <h2 
              className="text-xl font-bold mb-4"
              style={{
                color: '#52D3A6',
                textShadow: '0 0 5px rgba(82, 211, 166, 0.3)'
              }}
            >
              CONTENT PREVIEW
            </h2>
            <div 
              className="aspect-w-16 aspect-h-9 w-full h-64 mb-4 rounded-lg overflow-hidden bg-black flex items-center justify-center relative group"
              style={{
                border: '1px solid rgba(82, 211, 166, 0.3)',
                boxShadow: '0 0 15px rgba(82, 211, 166, 0.2) inset',
                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))'
              }}
            >
              {/* Content preview placeholder with animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/20 to-transparent animate-scan-slow pointer-events-none"></div>
              
              <div className="text-center p-4 relative transform transition duration-300 group-hover:scale-105">
                {/* Show actual content if available, otherwise show placeholder */}
                {result?.contentPreview ? (
                  <div
                    className="w-full h-full rounded-md animate-fade-in"
                    style={{
                      background: `url(${result.contentPreview}) center/cover no-repeat`,
                    }}
                  />
                ) : (
                  <>
                    <div 
                      className="text-6xl mb-4 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(82, 211, 166, 0.3))'
                      }}
                    >
                      {result?.contentType === 'video' ? '🎬' : '🖼️'}
                    </div>
                    <p 
                      className="text-sm font-mono backdrop-blur bg-slate-900/50 py-2 px-3 rounded transition-all duration-300 group-hover:bg-slate-900/70"
                      style={{
                        color: '#52D3A6',
                        textShadow: '0 0 3px rgba(82, 211, 166, 0.5)',
                        boxShadow: '0 0 20px rgba(82, 211, 166, 0.1) inset',
                      }}
                    >
                      {result?.contentType === 'video' ? 
                        'verified_video_content.mp4' : 
                        'verified_image_content.png'}
                    </p>
                  </>
                )}
              </div>
              
              {/* Scan lines effect */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  background: 'linear-gradient(transparent, transparent 50%, rgba(82, 211, 166, 0.05) 50%, rgba(82, 211, 166, 0.05))',
                  backgroundSize: '100% 4px',
                  opacity: 0.4
                }}
              ></div>
            </div>
            <div className="flex items-center mt-4">
              <div 
                className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0"
                style={{
                  border: '2px solid #52D3A6',
                  boxShadow: '0 0 8px rgba(82, 211, 166, 0.4)'
                }}
              >
                <div 
                  className="w-full h-full flex items-center justify-center bg-gray-900"
                  style={{
                    boxShadow: '0 0 10px rgba(82, 211, 166, 0.2) inset'
                  }}
                >
                  👤
                </div>
              </div>
              <div>
                <p 
                  className="font-bold"
                  style={{
                    color: '#52D3A6',
                    textShadow: '0 0 3px rgba(82, 211, 166, 0.3)'
                  }}
                >
                  @{result.author.username}
                </p>
                <p className="text-sm text-gray-400">
                  {result.author.verified && (
                    <span className="inline-flex items-center">
                      <span>Verified Creator</span>
                      <svg 
                        className="w-4 h-4 ml-1" 
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M7.5 12l3 3 6-6" 
                          stroke="#52D3A6"
                          strokeWidth="2.5" 
                        />
                      </svg>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Verification Metadata */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid #52D3A6',
              boxShadow: '0 0 10px rgba(82, 211, 166, 0.3)'
            }}
          >
            <h2 
              className="text-xl font-bold mb-4"
              style={{
                color: '#52D3A6',
                textShadow: '0 0 5px rgba(82, 211, 166, 0.3)'
              }}
            >
              VERIFICATION METADATA
            </h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">CAMERA</p>
                <div 
                  className="flex items-center py-2 px-3 rounded-md relative overflow-hidden"
                  style={{
                    background: 'rgba(82, 211, 166, 0.05)',
                    border: '1px solid rgba(82, 211, 166, 0.2)',
                    boxShadow: '0 0 10px rgba(82, 211, 166, 0.1) inset'
                  }}
                >
                  <div className="scan-line"></div>
                  <span className="text-lg mr-2">📷</span>
                  <span 
                    className="font-mono"
                    style={{
                      color: '#52D3A6',
                      textShadow: '0 0 2px rgba(82, 211, 166, 0.3)'
                    }}
                  >
                    <span className="opacity-80">MODEL:</span> {result.camera}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">LOCATION</p>
                <div 
                  className="flex items-center py-2 px-3 rounded-md relative overflow-hidden"
                  style={{
                    background: 'rgba(82, 211, 166, 0.05)',
                    border: '1px solid rgba(82, 211, 166, 0.2)',
                    boxShadow: '0 0 10px rgba(82, 211, 166, 0.1) inset'
                  }}
                >
                  <div className="scan-line"></div>
                  <span className="text-lg mr-2">📍</span>
                  <span 
                    className="font-mono"
                    style={{
                      color: '#52D3A6',
                      textShadow: '0 0 2px rgba(82, 211, 166, 0.3)'
                    }}
                  >
                    <span className="opacity-80">GPS:</span> {result.location}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">TIMESTAMP</p>
                <div 
                  className="flex items-center py-2 px-3 rounded-md relative overflow-hidden"
                  style={{
                    background: 'rgba(82, 211, 166, 0.05)',
                    border: '1px solid rgba(82, 211, 166, 0.2)',
                    boxShadow: '0 0 10px rgba(82, 211, 166, 0.1) inset'
                  }}
                >
                  <div className="scan-line"></div>
                  <span className="text-lg mr-2">🕒</span>
                  <span 
                    className="font-mono"
                    style={{
                      color: '#52D3A6',
                      textShadow: '0 0 2px rgba(82, 211, 166, 0.3)'
                    }}
                  >
                    <span className="opacity-80">UTC:</span> {formatDate(result.timestamp)}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1">VERIFICATION ID</p>
                <div 
                  className="py-2 px-3 rounded-md overflow-hidden"
                  style={{
                    background: 'rgba(82, 211, 166, 0.05)',
                    border: '1px solid rgba(82, 211, 166, 0.2)',
                  }}
                >
                  <p 
                    className="font-mono text-sm truncate"
                    style={{
                      color: '#52D3A6',
                      textShadow: '0 0 2px rgba(82, 211, 166, 0.3)'
                    }}
                  >
                    {/* Verification database ID */}
                    NS-728495-VID-1138224-2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back to Search Button */}
        <div className="text-center mt-12">
          <button
            onClick={onBackToSearch}
            className="py-2 px-6 rounded-md font-medium"
            style={{
              background: 'rgba(82, 211, 166, 0.1)',
              color: '#52D3A6',
              border: '1px solid #52D3A6',
              boxShadow: '0 0 10px rgba(82, 211, 166, 0.2)',
              textShadow: '0 0 3px rgba(82, 211, 166, 0.3)'
            }}
          >
            BACK TO SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationResult;