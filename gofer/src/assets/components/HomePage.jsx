import React from 'react';
import GameCard from './GameCard';
import './HomePage.css';

const Homepage = ({ topDeals }) => {
  return (
    <div className="homepage">
     
      <div className="bg-grid"></div>
      <div className="bg-particles"></div>
      
      <header className="homepage-header">
        <div className="logo-container">
          <img src='./src/assets/logo.png' alt="Game Deals Logo" className="homepage-logo" />
          <div className="logo-glow"></div>
        </div>
        <h1 className="homepage-title">
          <span className="title-gradient">Welcome to</span>
          <span className="title-main">Loot Drop</span>
        </h1>
        <p className="homepage-subtitle">
          Discover the best discounts on your favorite games, updated daily.
        </p>
        <div className="header-scroll-indicator">
          <span className="scroll-dot"></span>
        </div>
      </header>

      <section className="top-deals">
        <h2 className="section-title">
          <span className="title-accent">Top 3</span> Deals of the Day
        </h2>
        <div className="deals-grid">
          {topDeals.map((deal) => (
            <GameCard key={deal.dealID} game={deal} />
          ))}
        </div>
      </section>

      <section className="about">
        <h2 className="section-title">
          <span className="title-accent">About</span> Us
        </h2>
        <div className="about-content">
          <p className="about-text">
            Loot Drop is your premier destination for finding the best discounts on video games. 
            We track prices across all major platforms to bring you the most competitive offers.
          </p>
          <p className="about-text">
            Our mission is to help gamers save money while enjoying their favorite titles. 
            We ensure you never miss a deal again.
          </p>
          <div className="tech-stack">
            <div className="tech-item">GET DEALS FAST</div>
            <div className="tech-item">FAST & RELIABLE</div>
            <div className="tech-item">EASY TO USE</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;