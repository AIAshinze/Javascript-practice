import React from 'react';
import './App.css';

function AboutUs() {
  return (
    <div className="about-container">
      <h2 className="about-title">Who We Are</h2>
      <p className="about-subtitle">Welcome to Paradise Nursery, where green dreams come alive.</p>
      
      <p className="about-text">
        At Paradise Nursery, we are passionate about bringing the beauty and benefits of nature 
        directly into your living spaces. Our curated collection of indoor plants is hand-selected 
        to ensure the highest quality, health, and vitality for your home or office.
      </p>
      
      <div className="about-cards">
        <div className="about-card">
          <div className="about-icon">🌱</div>
          <h3>Our Mission</h3>
          <p>To connect people with plants, fostering healthier, happier, and more vibrant environments.</p>
        </div>
        
        <div className="about-card">
          <div className="about-icon">🍃</div>
          <h3>Our Quality</h3>
          <p>We source only from trusted local growers, ensuring every plant is organic, robust, and pest-free.</p>
        </div>
        
        <div className="about-card">
          <div className="about-icon">💚</div>
          <h3>Our Commitment</h3>
          <p>From air-purifying wonders to soothing aromatics, we provide expert care tips to help your green friends thrive.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
