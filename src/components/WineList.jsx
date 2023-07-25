import React, { useState, useEffect } from "react";
import { getAllWine } from "./API";
import {
  handlePriceFilter,
  handleRatingFilter,
  handleSearch,
} from "./SearchBar";
import WineDetails from "./WineDetails";

const WineList = ({ allWine, setAllWine, setWineInfo, wineInfo, user, favorites, saved }) => {
  const [filteredWines, setFilteredWines] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [searchName, setSearchName] = useState("");
  const [searchRegion, setSearchRegion] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    async function fetchAllWine() {
      const allTheWine = await getAllWine();
      setAllWine(allTheWine);
      setFilteredWines(allTheWine); // initialize filteredWines with all wines
    }
    fetchAllWine();
  }, []);

  useEffect(() => {
    const results = allWine.filter((wine) => {
      if (wine.name.toLowerCase().includes(searchName.toLowerCase())) {
        return wine;
      }
    });

    setFilteredWines(results);
  }, [searchName]);

  useEffect(() => {
    const results = allWine.filter((wine) => {
      if (wine.region.toLowerCase().includes(searchRegion.toLowerCase())) {
        return wine;
      }
    });
    setFilteredWines(results);
  }, [searchRegion]);

  useEffect(() => {
    const results = allWine.filter((wine) => {
      if (wine.flavor.toLowerCase().includes(searchType.toLowerCase())) {
        return wine;
      }
    });
    setFilteredWines(results);
  }, [searchType]);

  return (
    <div id="wineFeed">
      <div id="all-wine-title">
      <h2 >Wines</h2>
      <h5>All the wines reviewed by our amazing wine sippers!</h5>
      </div>
      {searchOpen ? (
        <div className="search-bars-container">
          <div className="search-box p-3">
            <h3>You can search wines by their name, their type or where they're made</h3>
            <label htmlFor="name-filter">Find a wine by name: </label>
            <input
              type="text"
              id="name-filter"
              name="search-name"
              value={searchName}
              onChange={(event) => {
                handleSearch(event, setSearchName);
              }}
            />
            <label htmlFor="region-filter">Find a wine by region: </label>
            <input
              type="text"
              id="region-filter"
              name="search-region"
              value={searchRegion}
              onChange={(event) => {
                handleSearch(event, setSearchRegion);
              }}
            />
            <label htmlFor="type-filter">Wine by type: </label>
            <input
              type="text"
              id="type-filter"
              name="search-type"
              value={searchType}
              onChange={(event) => {
                handleSearch(event, setSearchType);
              }}
            />
          </div>
          <div className="sort-filter-box p-3">
            <h3>Or you can search by price or rating</h3>
            <label htmlFor="price-filter">Sort by price: </label>
            <select
              id="price-filter"
              name="price-filter"
              onChange={(event) =>
                handlePriceFilter(event, allWine, setFilteredWines)
              }
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
              onChange={(event) =>
                handleRatingFilter(
                  event,
                  allWine,
                  setFilteredWines,
                  setSelectedRating
                )
              }
            >
              <option value="all">All</option>
              <option value="5">★★★★★</option>
              <option value="4">★★★★</option>
              <option value="3">★★★</option>
              <option value="2">★★</option>
              <option value="1">★</option>
            </select>
          </div>
          <button
            onClick={() => {
              setSearchOpen(false);
            }}
            className="btn btn-primary pb-2"
          >
            Close Search
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center p-2">
  <button
    onClick={() => {
      setSearchOpen(true);
    }}
    className="btn btn-primary"
  >
    Search Wines
  </button>
</div>
      )}

      <div id="wines" className="wine">
      <div className="container">
  <div className="row ">
    {filteredWines && filteredWines.length ? (
      filteredWines.map((wine) => (
        <div className="col-md-4" key={`allWines-${wine.id}`}>
          <WineDetails
            wine={wine}
            setWineInfo={setWineInfo}
            user={user}
            favorites={favorites}
            saved={saved}
          />
        </div>
      ))
    ) : (
      <p>No wines found.</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default WineList;
