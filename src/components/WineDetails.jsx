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
    console.log(favorites, "favorites");
    if (favorites && favorites.length) {
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].wine_id === wineID) {
          return true;
        }
      }
    }
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
      <div className="card-header d-flex justify-content-between align-items-start">
        <img
          src={`/images/${wine.image_url}`}
          alt="wine image"
          className="img-fluid"
          style={{
            maxHeight: "30%",
            maxWidth: "30%",
            padding: 5,
          }}
        />
        <div className="d-flex flex-column align-items-end">
          <div
            onClick={() => {
              if (checkOnFaves(wine.id)) {
                handleRemoveFavorite(wine.id);
              } else {
                addFavorite(user.id, wine.id);
              }
            }}
            className="custom-button"
            style={{
              marginBottom: "0.5rem",
              cursor: "pointer",
            }}
          >
            {checkOnFaves(wine.id) ? (
              <img
                src="/images/7-heartcheck.png"
                alt="heart"
                className="img-fluid"
                style={{ width: "25%", height: "auto", marginBottom: "-7px", marginRight:"-2px"}}
                title="Remove from Favorites"
              />
            ) : (
              <img
                src="/images/5-heart.png"
                alt="heart"
                className="img-fluid"
                style={{ width: "23%", height: "auto" }}
                title="Add To Favorites"
              />
            )}
          </div>

          <div
            onClick={() => {
              if (checkOnSaved(wine.id)) {
                handleRemoveSaved(wine.id);
              } else {
                addSaved(user.id, wine.id);
              }
            }}
            className="custom-button"
            style={{
              cursor: "pointer",
            }}
          >
            {checkOnSaved(wine.id) ? (
              <img
                src="/images/8-notepad_check.png"
                alt="notepad"
                className="img-fluid"
                style={{ width: "25%", height: "auto", marginTop: "-10px", marginRight:"-2px" }}
                title="Remove From My List"
              />
            ) : (
              <img
                src="/images/6-list.png"
                alt="savedPad"
                className="img-fluid"
                style={{ width: "25%", height: "auto" }}
                title="Add To My List"
              />
            )}
          </div>
        </div>
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
        }

export default WineDetails;
