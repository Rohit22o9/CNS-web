import React from 'react';

export const NetworkAnimation: React.FC = () => {
  return (
    <div className="network-animation-container" style={{ width: '100%', height: '100%', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 600 450"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F9DFF" />
            <stop offset="100%" stopColor="#EAF4FF" />
          </linearGradient>
          <linearGradient id="serverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A5F" />
            <stop offset="100%" stopColor="#2C5282" />
          </linearGradient>
          <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EAF4FF" />
          </linearGradient>
          
          {/* Dropshadow Filter */}
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#4F9DFF" floodOpacity="0.12" />
          </filter>
          <filter id="serverShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#1E3A5F" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* CSS for animations */}
        <style>{`
          .net-line {
            stroke: #4F9DFF;
            stroke-width: 2.5;
            stroke-linecap: round;
            opacity: 0.65;
          }
          .net-flow {
            stroke: #1E3A5F;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-dasharray: 10, 15;
            animation: flow 4s linear infinite;
          }
          .net-flow-reverse {
            stroke: #4F9DFF;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-dasharray: 8, 12;
            animation: flowReverse 3.5s linear infinite;
          }
          @keyframes flow {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes flowReverse {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: 100; }
          }
          .pulse-node {
            animation: nodePulse 3s ease-in-out infinite;
          }
          .pulse-node-delayed {
            animation: nodePulse 3s ease-in-out infinite;
            animation-delay: 1.5s;
          }
          @keyframes nodePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .led-green {
            fill: #27AE60;
            animation: blink 1s steps(2, start) infinite;
          }
          .led-amber {
            fill: #F39C12;
            animation: blink 1.5s steps(2, start) infinite;
            animation-delay: 0.5s;
          }
          @keyframes blink {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .packet-dot {
            fill: #4F9DFF;
            animation: packetMove 5s linear infinite;
          }
          @keyframes packetMove {
            0% { motion-offset: 0%; }
            100% { motion-offset: 100%; }
          }
          .radar-wave {
            stroke: #4F9DFF;
            stroke-width: 1.5;
            fill: none;
            opacity: 0.8;
            animation: radar 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
            transform-origin: 300px 220px;
          }
          @keyframes radar {
            0% { r: 10px; opacity: 0.8; }
            100% { r: 60px; opacity: 0; }
          }
          .float-element {
            animation: float 6s ease-in-out infinite;
          }
          .float-element-delayed {
            animation: float 6s ease-in-out infinite;
            animation-delay: 3s;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}</style>

        {/* Background Network Lines (Grid and Waves) */}
        <g opacity="0.15">
          <circle cx="300" cy="220" r="180" fill="none" stroke="#4F9DFF" strokeWidth="1" strokeDasharray="5, 5" />
          <circle cx="300" cy="220" r="100" fill="none" stroke="#4F9DFF" strokeWidth="1" strokeDasharray="3, 6" />
        </g>

        {/* Radar waves from central router */}
        <circle cx="300" cy="220" className="radar-wave" />
        <circle cx="300" cy="220" className="radar-wave" style={{ animationDelay: '1.25s' }} />

        {/* Network Connection Cables (Static and Dash-Animated Packets) */}
        <g>
          {/* PC 1 (Left Top) -> Switch */}
          <line x1="120" y1="120" x2="230" y2="220" className="net-line" />
          <line x1="120" y1="120" x2="230" y2="220" className="net-flow" />

          {/* PC 2 (Left Bottom) -> Switch */}
          <line x1="120" y1="320" x2="230" y2="220" className="net-line" />
          <line x1="120" y1="320" x2="230" y2="220" className="net-flow-reverse" />

          {/* Switch -> Router (Center) */}
          <line x1="230" y1="220" x2="300" y2="220" className="net-line" />
          <line x1="230" y1="220" x2="300" y2="220" className="net-flow" />

          {/* Router -> Cloud (Top Center) */}
          <line x1="300" y1="220" x2="300" y2="100" className="net-line" />
          <line x1="300" y1="220" x2="300" y2="100" className="net-flow-reverse" />

          {/* Router -> Server (Right Center) */}
          <line x1="300" y1="220" x2="480" y2="220" className="net-line" strokeWidth="3" />
          <line x1="300" y1="220" x2="480" y2="220" className="net-flow" />

          {/* Cloud -> Server */}
          <path d="M 360,90 Q 480,90 480,180" className="net-line" fill="none" />
          <path d="M 360,90 Q 480,90 480,180" className="net-flow-reverse" fill="none" />
        </g>

        {/* NODES REPRESENTATION */}

        {/* 1. Client PC 1 (Top Left) */}
        <g transform="translate(120, 120)" filter="url(#shadow)">
          <g className="pulse-node float-element">
            <circle cx="0" cy="0" r="32" fill="url(#nodeGrad)" stroke="#4F9DFF" strokeWidth="2" />
            {/* Laptop Screen Icon */}
            <rect x="-14" y="-12" width="28" height="18" rx="2" fill="#1E3A5F" />
            <rect x="-11" y="-9" width="22" height="12" fill="#EAF4FF" />
            <line x1="-18" y1="9" x2="18" y2="9" stroke="#1E3A5F" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="4" r="1.5" fill="#4F9DFF" />
            <text x="0" y="24" fontFamily="Poppins" fontSize="10" fontWeight="600" fill="#1E3A5F" textAnchor="middle">PC A</text>
          </g>
        </g>

        {/* 2. Client PC 2 (Bottom Left) */}
        <g transform="translate(120, 320)" filter="url(#shadow)">
          <g className="pulse-node-delayed float-element-delayed">
            <circle cx="0" cy="0" r="32" fill="url(#nodeGrad)" stroke="#4F9DFF" strokeWidth="2" />
            {/* Desktop Monitor Icon */}
            <rect x="-15" y="-14" width="30" height="18" rx="2" fill="#1E3A5F" />
            <rect x="-12" y="-11" width="24" height="12" fill="#EAF4FF" />
            <polygon points="-4,4 4,4 6,11 -6,11" fill="#1E3A5F" />
            <line x1="-10" y1="11" x2="10" y2="11" stroke="#1E3A5F" strokeWidth="2" />
            <text x="0" y="25" fontFamily="Poppins" fontSize="10" fontWeight="600" fill="#1E3A5F" textAnchor="middle">PC B</text>
          </g>
        </g>

        {/* 3. Switch (Layer 2 - Left Center) */}
        <g transform="translate(230, 220)" filter="url(#shadow)">
          <g className="float-element">
            <circle cx="0" cy="0" r="28" fill="url(#nodeGrad)" stroke="#4F9DFF" strokeWidth="2" />
            {/* Switch Box Icon */}
            <rect x="-16" y="-8" width="32" height="16" rx="2" fill="#1E3A5F" />
            {/* LAN Ports */}
            <circle cx="-10" cy="0" r="2" fill="#EAF4FF" />
            <circle cx="-5" cy="0" r="2" fill="#EAF4FF" />
            <circle cx="0" cy="0" r="2" fill="#EAF4FF" />
            <circle cx="5" cy="0" r="2" fill="#EAF4FF" />
            <circle cx="10" cy="0" r="2" fill="#EAF4FF" />
            {/* Bidirectional arrows */}
            <path d="M -10,-4 L -4,-4 M -4,-4 L -6,-6 M -4,-4 L -6,-2" stroke="#4F9DFF" strokeWidth="1" fill="none" />
            <path d="M 10,4 L 4,4 M 4,4 L 6,6 M 4,4 L 6,2" stroke="#4F9DFF" strokeWidth="1" fill="none" />
            <text x="0" y="23" fontFamily="Poppins" fontSize="9" fontWeight="600" fill="#1E3A5F" textAnchor="middle">Switch</text>
          </g>
        </g>

        {/* 4. Central Router (Layer 3 - Center) */}
        <g transform="translate(300, 220)" filter="url(#shadow)">
          <g className="pulse-node">
            <circle cx="0" cy="0" r="35" fill="url(#nodeGrad)" stroke="#4F9DFF" strokeWidth="2.5" />
            {/* Router Circle Symbol */}
            <circle cx="0" cy="0" r="20" fill="#1E3A5F" />
            {/* 4 Cross Arrows */}
            <path d="M -12,0 L 12,0 M 0,-12 L 0,12" stroke="#EAF4FF" strokeWidth="2" strokeLinecap="round" />
            <path d="M -12,0 L -8,-4 M -12,0 L -8,4" stroke="#EAF4FF" strokeWidth="2" fill="none" />
            <path d="M 12,0 L 8,-4 M 12,0 L 8,4" stroke="#EAF4FF" strokeWidth="2" fill="none" />
            <path d="M 0,-12 L -4,-8 M 0,-12 L 4,-8" stroke="#EAF4FF" strokeWidth="2" fill="none" />
            <path d="M 0,12 L -4,8 M 0,12 L 4,8" stroke="#EAF4FF" strokeWidth="2" fill="none" />
            
            {/* Blinking LEDs */}
            <circle cx="-8" cy="-25" r="2" className="led-green" />
            <circle cx="0" cy="-27" r="2" className="led-green" />
            <circle cx="8" cy="-25" r="2" className="led-amber" />
            
            <text x="0" y="27" fontFamily="Poppins" fontSize="10" fontWeight="700" fill="#1E3A5F" textAnchor="middle">Router</text>
          </g>
        </g>

        {/* 5. Cloud Network (Top Center) */}
        <g transform="translate(300, 80)" filter="url(#shadow)">
          <g className="float-element-delayed">
            <path
              d="M -30,10 A 15,15 0 0,1 -20,-15 A 25,25 0 0,1 20,-15 A 20,20 0 0,1 30,10 A 12,12 0 0,1 25,20 L -25,20 A 12,12 0 0,1 -30,10 Z"
              fill="url(#cloudGrad)"
              stroke="#4F9DFF"
              strokeWidth="2"
            />
            {/* Network symbols in cloud */}
            <path d="M -10,5 L 10,5 M 0,-5 L 0,10" stroke="#1E3A5F" strokeWidth="1.5" strokeDasharray="3, 2" />
            <circle cx="0" cy="5" r="2" fill="#1E3A5F" />
            <circle cx="-10" cy="5" r="2" fill="#1E3A5F" />
            <circle cx="10" cy="5" r="2" fill="#1E3A5F" />
            <circle cx="0" cy="-5" r="2" fill="#1E3A5F" />
            <text x="0" y="32" fontFamily="Poppins" fontSize="10" fontWeight="600" fill="#1E3A5F" textAnchor="middle">Cloud</text>
          </g>
        </g>

        {/* 6. Database / Server Rack (Right Center) */}
        <g transform="translate(480, 200)" filter="url(#serverShadow)">
          <g className="pulse-node-delayed">
            <rect x="-24" y="-30" width="48" height="65" rx="5" fill="url(#serverGrad)" stroke="#4F9DFF" strokeWidth="2.5" />
            {/* Racks */}
            <rect x="-18" y="-22" width="36" height="10" rx="1" fill="#2D3748" />
            <rect x="-18" y="-8" width="36" height="10" rx="1" fill="#2D3748" />
            <rect x="-18" y="6" width="36" height="10" rx="1" fill="#2D3748" />
            
            {/* Server lights */}
            <circle cx="-12" cy="-17" r="1.5" className="led-green" />
            <circle cx="-8" cy="-17" r="1.5" className="led-green" />
            <circle cx="12" cy="-17" r="1.5" className="led-green" />
            
            <circle cx="-12" cy="-3" r="1.5" className="led-green" />
            <circle cx="-8" cy="-3" r="1.5" className="led-amber" />
            <circle cx="12" cy="-3" r="1.5" className="led-green" />

            <circle cx="-12" cy="11" r="1.5" className="led-green" />
            <circle cx="-8" cy="11" r="1.5" className="led-green" />
            <circle cx="12" cy="11" r="1.5" className="led-amber" />

            {/* Disc plates lines */}
            <line x1="-2" y1="-17" x2="6" y2="-17" stroke="#EAF4FF" strokeWidth="1" opacity="0.6" />
            <line x1="-2" y1="-3" x2="6" y2="-3" stroke="#EAF4FF" strokeWidth="1" opacity="0.6" />
            <line x1="-2" y1="11" x2="6" y2="11" stroke="#EAF4FF" strokeWidth="1" opacity="0.6" />

            <text x="0" y="48" fontFamily="Poppins" fontSize="10" fontWeight="700" fill="#1E3A5F" textAnchor="middle">Main Server</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
