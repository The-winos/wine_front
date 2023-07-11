import React from "react";
import { useEffect } from "react";
import { useNavigate, useHref } from "react-router-dom";
import Rating from "react-rating-stars-component";
import { addFavorite, removeFavorite } from "./API";

const WineDetails = ({ wine, favorites, user }) => {
  const navigate = useNavigate();
  const ref = useHref();

  function checkOnFaves(wineID) {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].wine_id === wineID) {
        return true;
      }
    }
  }

  function handleRemoveFavorite(wineID) {

    let favoriteId;
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].wine_id === wineID) {
        favoriteId = favorites[i].id;
        break;
      }
    }
    removeFavorite(favoriteId);
  }

  return (
    <div className="card mb-3" style={{ maxWidth: "55%", margin: "0 auto" }}>
  <div className="card-header">
    {console.log(wine, "wine obj")}
    <img
      src={`/images/${wine.image_url}`}
      alt="wine image"
      className="img-fluid"
      style={{ maxHeight: "30%", maxWidth: "30%" }}
    />
    {checkOnFaves(wine.id) ? (
      <button
        onClick={() => {
          handleRemoveFavorite(wine.id);
        }}
        className="bg-transparent"
        style={{
          position: "absolute",
          border: "none",
          top: "1em",
          right: "1em",
        }}
      >
        <span className="material-symbols-outlined">heart_check</span>
      </button>
    ) : (
      <button
        onClick={() => {
          addFavorite(user.id, wine.id);
          navigate(`/favorites`);
        }}
        className="bg-transparent"
        style={{
          position: "absolute",
          border: "none",
          top: "1em",
          right: "1em",
        }}
      >
        <span className="material-symbols-outlined">favorite</span>
      </button>
    )}
  </div>
  <div className="card-body">
    <h5 className="card-title">{wine.name}</h5>
    <p className="card-text">
      <small className="text-muted">Type: {wine.flavor}</small>
    </p>
    <p className="card-text">
      <small className="text-muted">Region: {wine.region}</small>
    </p>
    <div className="card-text">
      <Rating
        value={wine.rating}
        edit={false}
        size={20}
        activeColor="#ffd700"
      />
    </div>
    <button
      onClick={() => {
        navigate(`/singlewine/${wine.id}`);
      }}
      className="btn btn-primary"
    >
      View Details
    </button>
  </div>
</div>

  );
};

export default WineDetails;
