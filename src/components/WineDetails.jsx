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
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: "55%",
          margin: "0 auto",
        }}
      >
        {console.log(wine, "wine obj")}
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
        <div className="d-flex justify-center flex-column align-items-end">
          {checkOnFaves(wine.id) ? (
            <div className="heartButton">
              <button
                onClick={() => {
                  handleRemoveFavorite(wine.id);
                }}
                className="bg-transparent p-0"
                style={{
                  border: "none",
                  marginBottom: "0.5rem",
                  padding: 0,
                }}
              >
                <img
                  src="/images/7-heartcheck.png"
                  alt="heart"
                  className="img-fluid"
                  style={{ width: "30%", height: "auto" }}
                />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                addFavorite(user.id, wine.id);
              }}
              className="bg-transparent p-0"
              style={{
                border: "none",
                marginBottom: "0.5rem",
              }}
            >
              <img
                src="/images/5-heart.png"
                alt="heart"
                className="img-fluid"
                style={{ width: "30%", height: "auto" }}
              />
            </button>
          )}

          {checkOnSaved(wine.id) ? (
            <button
              onClick={() => {
                handleRemoveSaved(wine.id);
              }}
              className="bg-transparent p-0"
              style={{
                border: "none",
              }}
            >
              <img
                src="/images/notepad-check.png"
                alt="notepad"
                className="img-fluid"
                style={{ width: "30%", height: "auto" }}
              />
            </button>
          ) : (
            <button
              onClick={() => {
                addSaved(user.id, wine.id);
              }}
              className="bg-transparent p-0"
              style={{
                border: "none",
              }}
            >
              <img
                src="/images/6-list.png"
                alt="savedPad"
                className="img-fluid"
                style={{ width: "30%", height: "auto" }}
              />
            </button>
          )}
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
};

export default WineDetails;
