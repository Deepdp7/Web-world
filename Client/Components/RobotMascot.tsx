import React from 'react';

const RobotMascot = () => {
  return (
    <div className="robot-mascot-wrapper" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Speech Bubble */}
      <div className="robot-speech shadow-glass" style={{
        padding: '0.8rem 1.5rem',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: '1rem',
        animation: 'float 3s ease-in-out infinite',
        position: 'relative',
        fontSize: '1.2rem',
        whiteSpace: 'nowrap'
      }}>
        Hello! 👋
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '10px 10px 0',
          borderStyle: 'solid',
          borderColor: 'rgba(255, 255, 255, 0.2) transparent transparent transparent',
          display: 'block',
          width: 0,
        }}></div>
      </div>

      {/* SVG Robot */}
      <svg width="200" height="250" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="robotScreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left Arm (Stationary) */}
        <g stroke="#6366f1" strokeWidth="15" strokeLinecap="round">
          <path d="M 50 140 Q 20 160 30 200" fill="none" />
          <circle cx="30" cy="200" r="10" fill="#a5b4fc" stroke="none" />
        </g>

        {/* Right Arm (Waving) */}
        <g className="waving-arm" style={{ transformOrigin: '150px 140px' }}>
          <path d="M 150 140 Q 180 110 190 70" fill="none" stroke="#6366f1" strokeWidth="15" strokeLinecap="round" />
          <circle cx="190" cy="70" r="10" fill="#a5b4fc" stroke="none" />
        </g>

        {/* Legs */}
        <rect x="70" y="210" width="15" height="30" rx="7.5" fill="#4f46e5" />
        <rect x="115" y="210" width="15" height="30" rx="7.5" fill="#4f46e5" />

        {/* Body */}
        <rect x="50" y="110" width="100" height="110" rx="20" fill="url(#robotBodyGrad)" />
        
        {/* Core Screen */}
        <rect x="65" y="130" width="70" height="70" rx="10" fill="url(#robotScreen)" />
        <circle cx="100" cy="165" r="20" fill="#38bdf8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Neck */}
        <rect x="90" y="90" width="20" height="25" fill="#6366f1" />

        {/* Head */}
        <rect x="40" y="20" width="120" height="80" rx="25" fill="url(#robotBodyGrad)" />
        
        {/* Face Screen */}
        <rect x="55" y="35" width="90" height="50" rx="15" fill="#0f172a" />
        
        {/* Eyes */}
        <g fill="#38bdf8" filter="url(#glow)">
          <circle cx="75" cy="55" r="8">
            <animate attributeName="ry" values="8;1;8" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="125" cy="55" r="8">
            <animate attributeName="ry" values="8;1;8" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Smile */}
        <path d="M 80 70 Q 100 80 120 70" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />

        {/* Antenna */}
        <line x1="100" y1="20" x2="100" y2="0" stroke="#6366f1" strokeWidth="5" />
        <circle cx="100" cy="0" r="6" fill="#38bdf8" filter="url(#glow)">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default RobotMascot;
