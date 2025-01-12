const NetworkStateLanding = () => {
    return (
      <div className="min-h-screen bg-black relative">
        {/* Map Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("${mapBase64}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(100%)'
          }}
        />
  
        {/* Content */}
        <div className="relative z-10 h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-6xl font-light tracking-widest mb-8">
              Network State Live
            </h1>
            <div className="w-24 h-px bg-blue-500 mx-auto my-8 opacity-50" />
            <h2 className="text-gray-400 text-2xl font-light tracking-wider">
              Network State Ranking, Launch, and Logistics Coming February 2025
            </h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default NetworkStateLanding;