import React, { useState, useEffect } from "react";
import { getAllWine } from "./API";
import WineDetails from "./WineDetails";
import Rating from "react-rating-stars-component";

const WineList = ({ allWine, setAllWine, setWineInfo, wineInfo, user }) => {
  const [filteredWines, setFilteredWines] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchAllWine() {
      const allTheWine = await getAllWine();
      console.log(allTheWine);
      setAllWine(allTheWine);
      setFilteredWines(allTheWine); // initialize filteredWines with all wines
    }
    fetchAllWine();
  }, []);

  const handlePriceFilter = (event) => {
    const priceRange = event.target.value;
    let filtered = [];

    // filter wines based on price
    switch (priceRange) {
      case "1-10":
        filtered = allWine.filter(
          (wine) => wine.price >= 1 && wine.price <= 1000
        );
        break;
      case "11-20":
        filtered = allWine.filter(
          (wine) => wine.price >= 1100 && wine.price <= 2000
        );
        break;
      case "21-30":
        filtered = allWine.filter(
          (wine) => wine.price >= 2100 && wine.price <= 3000
        );
        break;
      case "30+":
        filtered = allWine.filter((wine) => wine.price >= 3000);
        break;
      default:
        filtered = allWine;
        break;
    }
    setFilteredWines(filtered);
  };
  const handleRatingFilter = (event) => {
    const ratingRange = event.target.value;
    let filtered = [];
    switch (ratingRange) {
      case "5":
        filtered = allWine.filter((wine) => parseInt(wine.rating) === 5);
        break;
      case "4":
        filtered = allWine.filter((wine) => parseInt(wine.rating) === 4);
        break;
      case "3":
        filtered = allWine.filter((wine) => parseInt(wine.rating) === 3);
        break;
      case "2":
        filtered = allWine.filter((wine) => parseInt(wine.rating) === 2);
        break;
      case "1":
        filtered = allWine.filter((wine) => parseInt(wine.rating) === 1);
        break;
      default:
        filtered = allWine;
        break;
    }
    setSelectedRating(ratingRange);
    setFilteredWines(filtered);
  };

  useEffect(() => {
    const results = allWine.filter((wine) =>
      wine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredWines(results);
  }, [searchQuery, allWine]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div id="wineFeed">
      <h2 id="all-wine-title">Find new Wines!</h2>
      <div className="search-bars-container">
        <label htmlFor="name-filter">Find a wine: </label>
        <input type="text" value={searchQuery} onChange={handleChange} />
        {/* {filteredWines.length > 0 && filteredWines.map((wine) => (
        <div key={wine.id}>
          <p>{wine.name}</p>
        </div>
      ))} */}

        <label htmlFor="price-filter">Sort by price: </label>
        <select
          id="price-filter"
          name="price-filter"
          onChange={handlePriceFilter}
        >
          <option value="all">All</option>
          <option value="1-10">$1 - $10</option>
          <option value="11-20">$11 - $20</option>
          <option value="21-30">$21 - $30</option>
          <option value="30+">$30+</option>
        </select>

        <label htmlFor="rating-filter">Filter by rating:</label>
        <select
          id="rating-filter"
          name="rating-filter"
          value={selectedRating}
          onChange={handleRatingFilter}
        >
          <option value="all">All</option>
          <option value="5">★★★★★</option>
          <option value="4">★★★★</option>
          <option value="3">★★★</option>
          <option value="2">★★</option>
          <option value="1">★</option>
        </select>
      </div>
      <div id="wines" className="wine">
        {filteredWines && filteredWines.length
          ? filteredWines.map((wine) => {
              return (
                <div key={`allWines-${wine.id}`}>
                  <WineDetails
                    wine={wine}
                    setWineInfo={setWineInfo}
                    user={user}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default WineList;
