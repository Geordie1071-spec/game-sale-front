import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import './styles.css';
import { Search } from 'lucide-react';
import ParticleBackground from './ParticleBackground'; // Import the particle background

const DealsGrid = ({ deals }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const dealsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [deals]);

  const indexOfLastDeal = currentPage * dealsPerPage;
  const indexOfFirstDeal = indexOfLastDeal - dealsPerPage;
  const flattenedDeals = Object.values(deals).flat();
  const filteredDeals = flattenedDeals.filter((deal) =>
    deal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentDeals = filteredDeals.slice(indexOfFirstDeal, indexOfLastDeal);
  const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginationRange = () => {
    const range = [];
    const maxPageNumbers = 5;

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      const left = Math.max(1, currentPage - 2);
      const right = Math.min(totalPages, currentPage + 2);

      if (left > 1) {
        range.push(1);
        if (left > 2) range.push('...');
      }

      for (let i = left; i <= right; i++) {
        range.push(i);
      }

      if (right < totalPages) {
        if (right < totalPages - 1) range.push('...');
        range.push(totalPages);
      }
    }
    return range;
  };

  const paginationNumbers = paginationRange().map((page) => (
    <button
      key={page}
      onClick={() => paginate(page)}
      className={`page-number ${currentPage === page ? 'active' : ''}`}
      disabled={typeof page === 'string'}
    >
      {page}
    </button>
  ));

  return (
    <div className="deals-page">
      <ParticleBackground /> {/* Add the particle background here */}
      <div className="container">
        <header className="header">
          <img src='./src/assets/logo.png' alt="Game Deals Logo" className="header-logo" />
          <p className="header-subtitle">Discover the best discounts on your favorite games</p>
        </header>

        <div className="filters">
          <div className="search-container">
            <div className="search-icon-container">
              <Search size={24} color="#fff" />
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search for a deal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="deals-grid">
          {currentDeals.map((game) => (
            <GameCard key={game.dealID} game={game} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button prev-next"
              aria-label="Previous page"
            >
              Previous
            </button>

            <div className="pagination-numbers">
              {paginationNumbers}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button prev-next"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsGrid;
