import { useState, useEffect } from 'react';

const StarLogo = ({ size = 'large' }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  return (
    <div className={`relative ${sizeClasses[size] || sizeClasses.large}`}>
      {/* Star Shape */}
      <svg
        viewBox="0 0 24 24"
        className={`w-full h-full transform transition-all duration-1000 ${
          isAnimating ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
        }`}
      >
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF6347" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main Star */}
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.87L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#starGradient)"
          filter="url(#glow)"
          className="drop-shadow-2xl"
        />
        
        {/* Inner Star Glow */}
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.87L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="none"
          stroke="#FFD700"
          strokeWidth="0.5"
          opacity="0.6"
          className={`transition-all duration-1000 ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </svg>
      
      {/* Spinning Particles */}
      {isAnimating && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </>
      )}
      
      {/* Orbiting Elements */}
      <div className="absolute inset-0">
        <div className={`absolute w-full h-full transition-all duration-2000 ${
          isAnimating ? 'rotate-360' : 'rotate-0'
        }`}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 120}deg) translateY(-30px)`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarLogo;
