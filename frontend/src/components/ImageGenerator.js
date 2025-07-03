import React, { useState } from 'react';
import './ImageGenerator.css';
import MWLogo from './MWLogo';

const ImageGenerator = ({ onNavigateToHome }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageHistory, setImageHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please describe what kind of thumbnail you want to create');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedImage(data.image);
        setImageHistory(prev => [data.image, ...prev.slice(0, 5)]); // Keep last 6 images
      } else {
        setError(data.error || 'Failed to generate image');
      }
    } catch (err) {
      setError('Failed to connect to the AI image generator. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewGeneration = () => {
    setPrompt('');
    setGeneratedImage(null);
    setError('');
  };

  const downloadImage = (imageUrl, filename = 'thumbnail.png') => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-generator">
      {/* Header */}
      <header className="generator-header">
        <div className="header-wrapper">
          <button className="back-button" onClick={onNavigateToHome}>
            ← Back to Home
          </button>
          <div className="header-content">
            <MWLogo size="medium" />
            <h1>AI Thumbnail Generator</h1>
            <p>Create stunning YouTube thumbnails with AI-powered image generation</p>
          </div>
        </div>
      </header>

      {/* Input Section */}
      <section className="input-section">
        <div className="input-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="imagePrompt">Describe your thumbnail idea</label>
              <textarea
                id="imagePrompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'A vibrant gaming thumbnail with neon colors, controller, and explosion effects' or 'Professional tech review thumbnail with laptop and clean background' or 'Cooking tutorial with delicious food and bright kitchen'"
                rows="4"
                disabled={loading}
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="button-group">
              <button 
                type="submit" 
                className="generate-button"
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <>
                    <div className="button-spinner"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    🎨 Generate Thumbnail
                    <span className="button-icon">✨</span>
                  </>
                )}
              </button>
              
              {generatedImage && (
                <button 
                  type="button" 
                  className="new-generation-button"
                  onClick={handleNewGeneration}
                >
                  🆕 New Generation
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Generated Image Section */}
      {generatedImage && (
        <section className="result-section">
          <div className="result-container">
            <div className="result-header">
              <h2>
                <span className="result-icon">🎨</span>
                Your AI-Generated Thumbnail
              </h2>
            </div>

            <div className="image-display">
              <img 
                src={generatedImage.url} 
                alt={generatedImage.description}
                className="generated-thumbnail"
              />
              <div className="image-info">
                <h3>{generatedImage.title}</h3>
                <p>{generatedImage.description}</p>
                <div className="image-meta">
                  <span>Resolution: {generatedImage.resolution}</span>
                  <span>Style: {generatedImage.style}</span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="download-button"
                onClick={() => downloadImage(generatedImage.url, generatedImage.filename)}
              >
                📥 Download Image
              </button>
              
              <button 
                className="copy-url-button"
                onClick={() => {
                  navigator.clipboard.writeText(generatedImage.url);
                  // You could add a toast notification here
                }}
              >
                📋 Copy URL
              </button>
              
              <button 
                className="share-button"
                onClick={() => {
                  // You could implement sharing functionality here
                  alert('Sharing feature coming soon!');
                }}
              >
                📤 Share
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Image History */}
      {imageHistory.length > 0 && (
        <section className="history-section">
          <h3>Recent Generations</h3>
          <div className="history-grid">
            {imageHistory.map((image, index) => (
              <div key={index} className="history-item">
                <img 
                  src={image.url} 
                  alt={image.description}
                  className="history-thumbnail"
                  onClick={() => setGeneratedImage(image)}
                />
                <div className="history-overlay">
                  <button 
                    className="history-download"
                    onClick={() => downloadImage(image.url, image.filename)}
                  >
                    📥
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tips Section */}
      <section className="tips-section">
        <h3>💡 Pro Tips for Better Thumbnails</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Be Specific</h4>
            <p>Include details about colors, style, objects, and mood you want</p>
          </div>
          <div className="tip-card">
            <h4>Mention Your Niche</h4>
            <p>Gaming, tech, cooking, vlog - the AI adapts to your content type</p>
          </div>
          <div className="tip-card">
            <h4>Add Keywords</h4>
            <p>Use words like "vibrant", "professional", "eye-catching", "dramatic"</p>
          </div>
          <div className="tip-card">
            <h4>Think YouTube</h4>
            <p>Consider thumbnail size, text readability, and mobile viewing</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageGenerator;
