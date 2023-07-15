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
              top: "0.5rem",
              right: "0.5rem",
              zIndex: 0,
            }}
          >
            <img
              src="/images/7-heartcheck.png"
              alt="heart"
              className="img-fluid"
              style={{ width: "20%", height: "auto" }}
            />
          </button>
        ) : (
          <button
            onClick={() => {
              addFavorite(user.id, wine.id);
            }}
            className="bg-transparent"
            style={{
              position: "absolute",
              border: "none",
              top: "0.5rem",
              right: "0.5rem",
              zIndex: 0,
            }}
          >
            <img
              src="/images/5-heart.png"
              alt="heart"
              className="img-fluid"
              style={{ width: "15%", height: "auto" }}
            />
          </button>
        )}


    {checkOnSaved(wine.id) ? (
      <div
        className="position-absolute"
        style={{ top: "3em", right: "1em" }}
      >
        <img
          src="/images/6-list.png"
          alt="savedPad"
          className="img-fluid"
          style={{ width: "15%", height: "auto" }}
        />
        <FontAwesomeIcon
          icon={faCheck}
          className="checkmark-icon"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1rem",
            color: "green",
          }}
        />
      </div>
    ) : (
      <button
        onClick={() => {
          addSaved(user.id, wine.id);
        }}
        className="bg-transparent position-absolute"
        style={{ border: "none", top: "3em", right: "1em" }}
      >
        <img
          src="/images/6-list.png"
          alt="savedPad"
          className="img-fluid"
          style={{ width: "15%", height: "auto" }}
        />
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
