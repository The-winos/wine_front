import React, {useState, useEffect} from "react";
import { getAllWine } from "./API";
import WineDetails from "./WineDetails";

const WineList = ({allWine, setAllWine, setWineInfo, wineInfo, user}) => {
  const [filteredWines, setFilteredWines] = useState([]);

  useEffect(()=>{
    async function fetchAllWine(){
      const allTheWine = await getAllWine();
      console.log(allTheWine)
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
        filtered = allWine.filter(wine => wine.price >= 1 && wine.price <= 1000);
        break;
      case "11-20":
        filtered = allWine.filter(wine => wine.price >= 1100 && wine.price <= 2000);
        break;
      case "21-30":
        filtered = allWine.filter(wine => wine.price >= 2100 && wine.price <= 3000);
        break;
      case "30+":
        filtered = allWine.filter(wine => wine.price >= 3000);
        break;
      default:
        filtered = allWine;
        break;
    }
    setFilteredWines(filtered);
  }

  return(
    <div id="wineFeed">
      <h2 id="all-wine-title">Find new Wines!</h2>
      <div>
        <label htmlFor="price-filter">Filter by price: </label>
        <select id="price-filter" name="price-filter" onChange={handlePriceFilter}>
          <option value="all">All</option>
          <option value="1-10">$1 - $10</option>
          <option value="11-20">$11 - $20</option>
          <option value="21-30">$21 - $30</option>
          <option value="30+">$30+</option>
        </select>
      </div>
      {console.log(user, "user here?")}
      <div id="wines" className="wine">
        {filteredWines && filteredWines.length ? filteredWines.map((wine)=>{
          return(
            <div key={`allWines-${wine.id}`}>
              <WineDetails
                wine={wine}
                setWineInfo={setWineInfo}
                user={user}
              />
            </div>
          );
        }):null}
      </div>
    </div>
  );
};

export default WineList;
