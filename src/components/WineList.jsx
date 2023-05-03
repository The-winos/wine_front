import React, { useState, useEffect } from "react";
import { getAllWine } from "./API";
import { handlePriceFilter, handleRatingFilter, handleSearch } from "./SearchBar";
import WineDetails from "./WineDetails";

const WineList = ({ allWine, setAllWine, setWineInfo, wineInfo, user }) => {
  const [filteredWines, setFilteredWines] = useState([]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [searchName, setSearchName] = useState("");
  const [searchRegion, setSearchRegion] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchAllWine() {
      const allTheWine = await getAllWine();
      console.log(allTheWine);
      setAllWine(allTheWine);
      setFilteredWines(allTheWine); // initialize filteredWines with all wines
    }
    fetchAllWine();
  }, []);

  useEffect(() => {
    const results = allWine.filter((wine) => {
      const nameMatch = wine.name && wine.name.toLowerCase().includes(searchName.toLowerCase());
      const regionMatch = wine.region && wine.region.toLowerCase().includes(searchRegion.toLowerCase());
      const typeMatch = wine.type && wine.type.toLowerCase().includes(searchType.toLowerCase());
      return nameMatch || regionMatch || typeMatch;
    });
    console.log(results, "results")
    setFilteredWines(results);
  }, [searchName, searchRegion, searchType, allWine]);


  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <div id="wineFeed">
      <h2 id="all-wine-title">Find new Wines!</h2>
      <div className="search-bars-container">
        <label htmlFor="name-filter">Find a wine by name: </label>
        <input
          type="text"
          id="name-filter"
          name="search-name"
          value={searchName}
          onChange={(event)=> handleSearch(event, setSearchName)}
        />

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
