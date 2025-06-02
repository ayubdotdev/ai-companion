const StaticBackgroundParticles = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-white">
        {/* Small subtle dots scattered around */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-200 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Medium dots with very subtle fade animation */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gray-300/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: '4s',
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        
        {/* Larger subtle circles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 border border-gray-200/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Very subtle geometric shapes */}
        <div className="absolute top-20 left-20 w-12 h-12 border border-gray-200/40 rotate-12 rounded-sm" />
        <div className="absolute top-40 right-32 w-6 h-6 border border-gray-300/40 rotate-45" />
        <div className="absolute bottom-40 left-40 w-10 h-10 border border-gray-200/30 rounded-full" />
        <div className="absolute bottom-20 right-20 w-16 h-16 border border-gray-200/20 rotate-45 rounded-sm" />
        <div className="absolute top-1/2 left-10 w-4 h-4 bg-gray-300/20 rounded-full" />
        <div className="absolute top-1/3 right-10 w-14 h-14 border border-gray-200/30 rounded-full" />
      </div>
    );
  };
  
  export default StaticBackgroundParticles;