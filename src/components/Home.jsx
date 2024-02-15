import React, { useState, useEffect } from "react";
import { getWineById, getAllWine } from "./API";
import Rating from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

const Home = ({ allWine, setAllWine, user }) => {
  const navigate = useNavigate();
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
      <h5>Community Of Reviews & Knowledgeable Sippers</h5>
      {/* corks logo goes here */}
      {filteredWines.length > 0 ? (
        <>
          <div>
            <div className="card col-md-9 d-flex justify-content-center custom-centered-card">
              <h5>Featured Wine</h5>
              <h4 className="wine-name">
                {filteredWines[0].name}
                <small className="wine-flavor muted">
                  {" "}
                  {filteredWines[0].flavor}
                </small>
              </h4>
              <div className="d-flex justify-content-center">
                <Rating
                  value={filteredWines[0].rating}
                  edit={false}
                  size={20}
                  activeColor="#ffd700"
                />
              </div>
              <p className="card-text">
                <small className="text-muted">
                  Average Price:{" "}
                  <small className="text-muted">
                    {" "}
                    {filteredWines[0].price !== 0 &&
                    filteredWines[0].price !== null
                      ? formattedPrice
                      : "N/A"}
                  </small>
                </small>{" "}
                <br />
              </p>

              <button
                onClick={() => {
                  navigate(`/singlewine/${filteredWines[0].id}`);
                }}
                className="btn btn-primary"
              >
                {" "}
                Check out this wine
              </button>
            </div>
          </div>
          <div className="pt-4">
          <h6>

Please note that this website is currently in beta testing. While we've worked hard to ensure a smooth experience, you may encounter occasional glitches or issues as we continue to improve and refine our platform. Your feedback is invaluable to us, so if you encounter any problems or have suggestions for improvement, please don't hesitate to reach out to us. Thank you for your understanding and support!

</h6>
<h6>
-The Corks Team</h6></div>
        </>
      ) : null}
      {user ? null : (<div style={{ textAlign: 'center', marginTop: '10px' }}>
  <button
    onClick={() => {
      navigate(`/login`);
    }}
    className="btn btn-primary"
  >
    Login
  </button>

  <button
    onClick={() => {
      navigate(`/register`);
    }}
    className="btn btn-primary"
    style={{ marginLeft: '10px' }}
  >
    Sign Up
  </button>



</div>



)}
    </div>
  );
};

export default Home;
