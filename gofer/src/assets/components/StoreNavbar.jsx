import React from "react";
import { Home } from "lucide-react";
import "./StoreNavbar.css";

const StoreNavbar = ({ stores, onStoreSelect, selectedStore }) => {
  const activeStores = stores.filter(store => store.isActive === 1);

  return (
    <nav className="store-navbar">
      {/* Home icon */}
      <div
        className={`store-icon home-icon ${selectedStore === null ? 'active' : ''}`}
        onClick={() => onStoreSelect(null)}
        title="Home"
      >
        <Home size={24} />
      </div>

      {/* All Stores icon */}
      <div
        className={`store-icon ${selectedStore === "ALL" ? "active" : ""}`}
        onClick={() => onStoreSelect("ALL")}
        title="All Stores"
      >
        🛒
      </div>

      {/* Divider */}
      <div className="store-divider"></div>

      {/* Store icons */}
      {activeStores.map(store => (
        <div
          key={store.storeID}
          className={`store-icon ${selectedStore === store.storeName ? 'active' : ''}`}
          onClick={() => onStoreSelect(store.storeName)}  
          title={store.storeName}
        >
          <img
            src={`https://www.cheapshark.com${store.images.logo}`}
            alt={store.storeName}
            loading="lazy"
          />
        </div>
      ))}
    </nav>
  );
};

export default StoreNavbar;
