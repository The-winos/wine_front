import React, { useState, useEffect } from "react";
import { getWineById, getAllWine } from "./API";
import Rating from "react-rating-stars-component";

const Home = ({ allWine, setAllWine }) => {
  const [filteredWines, setFilteredWines] = useState([]);

  useEffect(() => {
    async function fetchAllWine() {
      const allTheWine = await getAllWine();
      setAllWine(allTheWine);
    }
    fetchAllWine();
  }, [setAllWine]); // Make sure to include setAllWine in the dependency array

  const findRandomFiveStarWine = (allWines) => {
    const filtered = allWines.filter((wine) => parseInt(wine.rating) === 5);

    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      const randomWine = filtered[randomIndex];
      console.log(randomWine, "randomw wine in function")
      setFilteredWines([randomWine]);
    } else {
      setFilteredWines([]);
    }
  };

  const formattedPrice = filteredWines[0]
  ? (filteredWines[0].price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    })
  : null;

  useEffect(() => {
    findRandomFiveStarWine(allWine);
  }, [allWine]);


  return (
    <div id="Home" className="text-center pt-5 pb-5">
      {console.log(filteredWines, "filteredWines")}
      <div className="home-header">
        <img
          src="/images/4-wine_glass.png"
          alt="Wine Glass"
          className="home-image"
        />
        <h2>C.O.R.K.S</h2>
        <img
          src="/images/4-wine_glass.png"
          alt="Wine Glass"
          className="home-image"
        />
      </div>
      <h5>Community of Reviews & Knowledgeable Sippers</h5>
      {/* corks logo goes here */}
      {filteredWines.length > 0 ? <>
      <h5>Featured Wine</h5>
      <div className="col-md-9">
      <div className="card-body">
      <h4 className="wine-name">{filteredWines[0].name}
  <small className="wine-flavor muted">   {filteredWines[0].flavor}</small>
</h4>

        <Rating
                  value={filteredWines[0].rating}
                  edit={false}
                  size={20}
                  activeColor="#ffd700"
                />
        <p className="card-text">
          <small className="text-muted">Average Price: <small className="text-muted"> {filteredWines[0].price !== 0 && filteredWines[0].price !== null ? formattedPrice : "N/A" }</small>
</small> <br />

        </p>

<button onClick={()=>{
        navigate(`/singlewine/${filteredWines[0].id}`);
      }} className="btn btn-primary"> Check out this wine</button>
      </div>


     </div>
     </>:null}
    </div>
  );
};

export default Home;
