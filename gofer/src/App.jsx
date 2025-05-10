import React, { useEffect, useState } from "react";
import StoreNavbar from "./assets/components/StoreNavbar";
import DealsGrid from "./assets/components/DealsGrid";
import HomePage from "./assets/components/HomePage"; 
import "./App.css"; 

const App = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreName, setSelectedStoreName] = useState(null);
  const [deals, setDeals] = useState([]);
  const [topDeals, setTopDeals] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    fetch("web-production-450ff.up.railway.app/stores")
      .then((res) => res.json())
      .then((data) => {
        setStores(data.stores);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stores:", err);
        setIsLoading(false);
      });
  }, []);

  
  useEffect(() => {
    setIsLoading(true);
    fetch("web-production-450ff.up.railway.app/deals/top") 
      .then((res) => res.json())
      .then((data) => {
        console.log("Top Deals:", data.deals);
        setTopDeals(data.deals || []); 
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top deals:", err);
        setTopDeals([]);
        setIsLoading(false);
      });
  }, []);

  
  useEffect(() => {
    setIsLoading(true);
    const url = selectedStoreName && selectedStoreName !== "ALL"
      ? `web-production-450ff.up.railway.app/?store_name=${encodeURIComponent(selectedStoreName)}`
      : "web-production-450ff.up.railway.app/deals/";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDeals(data.deals || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deals:", err);
        setDeals([]);
        setIsLoading(false);
      });
  }, [selectedStoreName]);

  const handleStoreSelect = (storeName) => {
    setSelectedStoreName(storeName);
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    
  
      <div className="relative z-10 flex" style={{ minHeight: "100vh" }}>
        <StoreNavbar
          stores={stores}
          onStoreSelect={handleStoreSelect}
          selectedStore={selectedStoreName}
        />
        <div className="main-content flex-1 p-5 overflow-y-auto">
          {selectedStoreName === null ? (
            <HomePage topDeals={topDeals} />
          ) : isLoading ? (
            <LoadingSpinner />
          ) : (
            <DealsGrid deals={deals} />
          )}
        </div>
      </div>
    
  );
  
  
  
};

export default App;
