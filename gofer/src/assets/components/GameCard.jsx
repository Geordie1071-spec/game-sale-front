import React from 'react';

const GameCard = ({ game }) => {
  if (!game) return null;
  const {
    title = "Unknown Game",
    thumb = "",
    salePrice = "0.00",
    normalPrice = "0.00",
    dealRating = "0",
    steamRatingText = "No Reviews",
    steamRatingPercent = "0",
    savings = "0",
    dealID = ""
  } = game;

  const buyUrl = `https://www.cheapshark.com/redirect?dealID=${dealID}`;
  const savingsPercentage = Math.floor(parseFloat(savings));
  const dealRatingValue = parseFloat(dealRating) || 0;
  const steamRatingValue = parseFloat(steamRatingPercent) || 0;

  const getRatingColor = (rating) => {
    if (rating >= 70) return 'bg-green-500';
    if (rating >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="game-card">
      <div className="game-image-container">
        <img
          src={thumb.replace('capsule_sm_120', 'header')}
          alt={title}
          className="game-image"
          onError={(e) => {
            e.target.src = '/image.png';
          }}
        />
        <div className="discount-badge">
          {savingsPercentage}% OFF
        </div>
      </div>

      <div className="game-details">
        <h3 className="game-title" title={title}>
          {title}
        </h3>

        <div className="rating-container">
          <div className={`rating-indicator ${getRatingColor(steamRatingValue)}`} />
          <span className="rating-text">
            {steamRatingText || 'No ratings'} ({steamRatingValue}%)
          </span>
        </div>

        <div className="price-section">
          <div className="price-container">
            <div>
              <span className="original-price">${normalPrice}</span>
              <span className="sale-price">${salePrice}</span>
            </div>
            <div className="deal-rating">
              <span className="star">★</span> {dealRatingValue.toFixed(1)}/10
            </div>
          </div>
          <div className="savings-bar-container">
            <div 
              className="savings-bar" 
              style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="deal-info">
            <span className="discount-percent">
              💰 {savingsPercentage}% OFF
            </span>
          </div>
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="buy-button"
          >
            View Deal
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameCard;