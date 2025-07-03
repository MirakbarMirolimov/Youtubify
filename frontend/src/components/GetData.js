import React, { useState } from 'react';
import './GetData.css';
import MWLogo from './MWLogo';

// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
}

const GetData = ({ onNavigateToHome }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Please enter your question or description');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: input.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.response);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to the AI advisor. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      setError('Voice recognition is not supported in this browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    setError('');
    setIsListening(true);

    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError('Voice recognition error: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="get-data">
      {/* Header */}
      <header className="analyzer-header">
        <div className="header-wrapper">
          <button className="back-button" onClick={onNavigateToHome}>
            ← Back to Home
          </button>
          <div className="header-content">
            <MWLogo size="medium" />
            <h1>AI YouTube Advisor</h1>
            <p>Describe your YouTube challenge and get personalized advice</p>
          </div>
        </div>
      </header>

      {/* Input Form */}
      <section className="input-section">
        <div className="input-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="userInput">What do you need help with?</label>
              <textarea
                id="userInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 'How can I improve my video titles to get more views?' or 'I need help with thumbnail design' or 'My engagement is low, what should I do?'"
                rows="5"
                disabled={loading}
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="button-group">
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading || !input.trim()}
              >
                {loading ? (
                  <>
                    <div className="button-spinner"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Get AI Advice
                    <span className="button-icon">🚀</span>
                  </>
                )}
              </button>
              
              <button 
                type="button" 
                className={`voice-button ${isListening ? 'listening' : ''}`}
                onClick={handleVoiceInput}
                disabled={loading}
              >
                {isListening ? (
                  <>
                    <div className="voice-animation"></div>
                    Listening...
                  </>
                ) : (
                  <>
                    🎤 Voice Input
                  </>
                )}
              </button>
              
              {result && (
                <button 
                  type="button" 
                  className="new-analysis-button"
                  onClick={handleNewAnalysis}
                >
                  New Analysis
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="results-section">
          <div className="results-container">
            <div className="results-header">
              <h2>
                <span className="category-icon">💡</span>
                {result.category}
              </h2>
            </div>

            <div className="advice-section">
              <h3>Personalized Advice:</h3>
              <ul className="advice-list">
                {result.advice.map((advice, index) => (
                  <li key={index} className="advice-item">
                    <span className="advice-icon">✅</span>
                    {advice}
                  </li>
                ))}
              </ul>
            </div>

            {result.examples && result.examples.length > 0 && (
              <div className="examples-section">
                <h3>Examples:</h3>
                <ul className="examples-list">
                  {result.examples.map((example, index) => (
                    <li key={index} className="example-item">
                      <span className="example-icon">💡</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="action-buttons">
              <button 
                className="copy-button"
                onClick={() => {
                  const text = `${result.category}\n\nAdvice:\n${result.advice.join('\n')}\n\nExamples:\n${result.examples?.join('\n') || 'No examples provided'}`;
                  navigator.clipboard.writeText(text);
                  // You could add a toast notification here
                }}
              >
                📋 Copy Advice
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

      {/* Tips Section */}
      <section className="tips-section">
        <h3>💡 Pro Tips for Better Results</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Be Specific</h4>
            <p>Include details about your channel, niche, and specific challenges</p>
          </div>
          <div className="tip-card">
            <h4>Ask About Goals</h4>
            <p>Mention your objectives: more views, subscribers, engagement, etc.</p>
          </div>
          <div className="tip-card">
            <h4>Include Context</h4>
            <p>Share your current situation and what you've already tried</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetData;
