import React, { useState, useEffect } from 'react';
import './Home.css';
import MWLogo from './MWLogo';

const Home = ({ onNavigateToAnalyzer, onNavigateToImageGenerator }) => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/home-data');
      const data = await response.json();
      setHomeData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching home data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading YouTubify AI...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          {/* MW Logo */}
          <MWLogo size="large" />
          
          <div className="hero-icon">🎬</div>
          <h1 className="hero-title">{homeData?.title}</h1>
          <h2 className="hero-subtitle">{homeData?.subtitle}</h2>
          <p className="hero-description">{homeData?.description}</p>
          <div className="hero-buttons">
            <button 
              className="cta-button"
              onClick={onNavigateToAnalyzer}
            >
              Get AI Advice Now
            </button>
            <button 
              className="cta-button secondary-cta"
              onClick={onNavigateToImageGenerator}
            >
              Generate Thumbnail Art
            </button>
          </div>
        </div>
        <div className="hero-background">
          <div className="floating-shape shape-1">📊</div>
          <div className="floating-shape shape-2">🚀</div>
          <div className="floating-shape shape-3">💡</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <h3>{homeData?.stats.creators.toLocaleString()}</h3>
            <p>Happy Creators</p>
          </div>
          <div className="stat-item">
            <h3>{homeData?.stats.videos_analyzed.toLocaleString()}</h3>
            <p>Videos Analyzed</p>
          </div>
          <div className="stat-item">
            <h3>{homeData?.stats.success_rate}%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>What Our AI Can Help You With</h2>
        <div className="features-grid">
          {homeData?.features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {index === 0 && '📈'}
                {index === 1 && '🎯'}
                {index === 2 && '💬'}
                {index === 3 && '🌟'}
              </div>
              <h3>{feature}</h3>
              <p>
                {index === 0 && 'Get personalized content strategies that resonate with your audience'}
                {index === 1 && 'Create compelling titles and thumbnails that boost click-through rates'}
                {index === 2 && 'Learn proven techniques to increase likes, comments, and subscriptions'}
                {index === 3 && 'Discover effective methods to grow your channel organically'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your YouTube Channel?</h2>
          <p>Join thousands of creators who have already improved their content with AI-powered insights.</p>
          <div className="cta-buttons">
            <button 
              className="cta-button secondary"
              onClick={onNavigateToAnalyzer}
            >
              Start Your Analysis
            </button>
            <button 
              className="cta-button secondary-cta"
              onClick={onNavigateToImageGenerator}
            >
              Create Thumbnail Art
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
