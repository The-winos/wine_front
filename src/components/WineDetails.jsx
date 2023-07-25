import React from "react";
import { useEffect, useState} from "react";
import { useNavigate, useHref } from "react-router-dom";
import Rating from "react-rating-stars-component";
import { addFavorite, removeFavorite, removeSaved, addSaved } from "./API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const WineDetails = ({ wine, favorites, user, saved }) => {
  const navigate = useNavigate();
  const ref = useHref();
  const [localFavorites, setLocalFavorites] = useState(favorites || []);
  const [localSaved, setLocalSaved] = useState(saved || []);

  useEffect(() => {
    setLocalFavorites(favorites || []);
    setLocalSaved(saved || []);
  }, [favorites, saved]);

  function checkOnFaves(wineID) {
    if(localFavorites.length>0){
      for(const favoriteItem of localFavorites){
        if(favoriteItem.wine_id===wineID){
          return favoriteItem.id;
        }
      }
    }
    return null;
    }



  function checkOnSaved(wineID) {
    if (localSaved.length > 0) {
      for (const savedItem of localSaved) {
        if (savedItem.wine_id === wineID) {
          return savedItem.id;
        }
      }
    }
    return null;
  }

  function handleRemoveFavorite(favoriteID) {
  const updateFavorite=localFavorites.filter(
    (favoriteItem)=>favoriteItem.id !== favoriteID
  );
  setLocalFavorites(updateFavorite);
  removeFavorite(favoriteID)
  }

  function handleRemoveSaved(savedId) {
    const updatedSaved = localSaved.filter(
      (savedItem) => savedItem.id !== savedId
    );
    setLocalSaved(updatedSaved);
    removeSaved(savedId);
  }

  function handleAddSaved(userId, wineId) {
    const newSavedItem = {
      id: Date.now(),
      user_id: userId,
      wine_id: wineId,
    };
    setLocalSaved([...localSaved, newSavedItem]);
    addSaved(userId, wineId);
  }

  function handleAddFavorite(userId, wineId) {
    const newFavItem = {
      id: Date.now(),
      user_id: userId,
      wine_id: wineId,
    };
    setLocalFavorites([...localFavorites, newFavItem]);
    addFavorite(userId, wineId);
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
              const favoriteId = checkOnFaves(wine.id);
              if (favoriteId) {
                handleRemoveFavorite(favoriteId);
              } else {
                handleAddFavorite(user.id, wine.id);
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
                style={{ width: "25%", height: "auto", marginBottom: "-5px", marginRight:"-2px"}}
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
            const savedId = checkOnSaved(wine.id);
            if (savedId) {
              handleRemoveSaved(savedId);
            } else {
              handleAddSaved(user.id, wine.id);
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
                style={{ width: "25%", height: "auto", marginTop: "-6px", marginRight:"-2px" }}
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
