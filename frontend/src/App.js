import React, { useState } from 'react';
import Home from './components/Home';
import GetData from './components/GetData';
import ImageGenerator from './components/ImageGenerator';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToAnalyzer = () => {
    setCurrentPage('analyzer');
  };

  const navigateToImageGenerator = () => {
    setCurrentPage('imageGenerator');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home 
          onNavigateToAnalyzer={navigateToAnalyzer} 
          onNavigateToImageGenerator={navigateToImageGenerator}
        />
      )}
      
      {currentPage === 'analyzer' && (
        <GetData onNavigateToHome={navigateToHome} />
      )}
      
      {currentPage === 'imageGenerator' && (
        <ImageGenerator onNavigateToHome={navigateToHome} />
      )}
    </div>
  );
}

export default App;
