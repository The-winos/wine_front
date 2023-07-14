import React from "react";
import { useEffect } from "react";
import { useNavigate, useHref } from "react-router-dom";
import Rating from "react-rating-stars-component";
import { addFavorite, removeFavorite, removeSaved, addSaved } from "./API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const WineDetails = ({ wine, favorites, user, saved }) => {
  const navigate = useNavigate();
  const ref = useHref();

  function checkOnFaves(wineID) {
    if(favorites && favorites.length)
    {for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].wine_id === wineID) {
        return true;
      }
    }}
  }
  function checkOnSaved(wineID) {
    console.log(saved, "saved");
    if (saved && saved.length) {
      for (let i = 0; i < saved.length; i++) {
        if (saved[i].wine_id === wineID) {
          return true;
        }
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
  function handleRemoveSaved(wineID) {

    let savedId;
    for (let i = 0; i < saved.length; i++) {
      if (saved[i].wine_id === wineID) {
        savedId = saved[i].id;
        break;
      }
    }
    removeSaved(savedId);
  }

  return (
    <div className="card mb-3" style={{ maxWidth: "55%", margin: "0 auto" }}>
  <div className="card-header" style={{ position: "relative" }}>
    {console.log(wine, "wine obj")}
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={`/images/${wine.image_url}`}
        alt="wine image"
        className="img-fluid"
        style={{ maxHeight: "30%", maxWidth: "30%" }}
      />
      {checkOnFaves(wine.id) && (
        <img
          src="/images/5-heart.png"
          alt="heart"
          className="img-fluid position-absolute"
          style={{ top: "1em", right: "1em", width: "15%", height: "auto" }}
        />
      )}
      {checkOnSaved(wine.id) && (
        <img
          src="/images/6-list.png"
          alt="savedPad"
          className="img-fluid position-absolute"
          style={{ top: "3em", right: "1em", width: "15%", height: "auto" }}
        />
      )}
    </div>
    {checkOnFaves(wine.id) && (
      <FontAwesomeIcon
        icon={faCheck}
        className="checkmark-icon position-absolute"
        style={{
          top: "1em",
          left: "1em",
          fontSize: "1rem",
          color: "green",
        }}
      />
    )}
    {checkOnSaved(wine.id) && (
      <FontAwesomeIcon
        icon={faCheck}
        className="checkmark-icon position-absolute"
        style={{
          top: "3em",
          left: "1em",
          fontSize: "1rem",
          color: "green",
        }}
      />
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
