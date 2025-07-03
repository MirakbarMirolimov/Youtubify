import React from 'react';
import './MWLogo.css';

const MWLogo = ({ size = 'large' }) => {
  return (
    <div className={`mw-logo ${size}`}>
      <div className="logo-container">
        {/* Main MW Text */}
        <div className="mw-text">
          <span className="letter-m">M</span>
          <span className="letter-w">W</span>
        </div>
        
        {/* Brain Icon */}
        <div className="brain-icon">
          <svg viewBox="0 0 100 100" className="brain-svg">
            {/* Brain outline */}
            <path
              d="M20 35 C20 15, 40 10, 50 15 C60 10, 80 15, 80 35 C85 40, 85 60, 75 65 C80 75, 70 85, 50 80 C30 85, 20 75, 25 65 C15 60, 15 40, 20 35 Z"
              className="brain-outline"
            />
            {/* Brain lines */}
            <path d="M30 25 Q50 30 70 25" className="brain-line" />
            <path d="M25 35 Q50 40 75 35" className="brain-line" />
            <path d="M30 45 Q50 50 70 45" className="brain-line" />
            <path d="M35 55 Q50 60 65 55" className="brain-line" />
            <path d="M40 65 Q50 70 60 65" className="brain-line" />
            
            {/* AI Neural nodes */}
            <circle cx="35" cy="30" r="2" className="neural-node" />
            <circle cx="50" cy="35" r="2" className="neural-node" />
            <circle cx="65" cy="30" r="2" className="neural-node" />
            <circle cx="40" cy="50" r="2" className="neural-node" />
            <circle cx="60" cy="50" r="2" className="neural-node" />
            
            {/* Neural connections */}
            <line x1="35" y1="30" x2="50" y2="35" className="neural-connection" />
            <line x1="50" y1="35" x2="65" y2="30" className="neural-connection" />
            <line x1="35" y1="30" x2="40" y2="50" className="neural-connection" />
            <line x1="65" y1="30" x2="60" y2="50" className="neural-connection" />
            <line x1="40" y1="50" x2="60" y2="50" className="neural-connection" />
          </svg>
        </div>
        
        {/* AI Circuit Elements */}
        <div className="circuit-elements">
          <div className="circuit-dot circuit-1"></div>
          <div className="circuit-dot circuit-2"></div>
          <div className="circuit-dot circuit-3"></div>
          <div className="circuit-line line-1"></div>
          <div className="circuit-line line-2"></div>
        </div>
        
        {/* Glowing particles */}
        <div className="particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>
      </div>
      
      {/* Brand text */}
      <div className="brand-text">
        <span className="brand-main">MW</span>
        <span className="brand-sub">AI Labs</span>
      </div>
    </div>
  );
};

export default MWLogo;
