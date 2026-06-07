import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  return (
    <div className={`app-container ${showLanding ? 'landing-mode' : 'shop-mode'}`}>
      {showLanding ? (
        <div className="landing-page">
          <div className="landing-content">
            <div className="landing-card">
              <h1 className="landing-title">Paradise Nursery</h1>
              <p className="landing-tagline">Where Green Dreams Come Alive</p>
              <div className="divider"></div>
              <p className="landing-description">
                Welcome to your premier destination for exceptional houseplants. We cultivate, 
                curate, and deliver fresh, healthy, and organic plants right to your doorstep. 
                Whether you're looking to purify your air, soothe your senses with natural aromatherapy, 
                or explore ancient herbal remedies, we have the perfect green companion for you.
              </p>
              <button id="get-started-btn" className="get-started-btn" onClick={handleGetStarted}>
                Get Started <span className="btn-arrow">→</span>
              </button>
            </div>
            
            {/* About Us section embedded on the landing page */}
            <div className="landing-about">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <ProductList setShowLanding={setShowLanding} />
      )}
    </div>
  );
}

export default App;
