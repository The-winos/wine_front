import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFavorites, getWineById } from "./API";
import { WineDetails } from "./"

const FavoritesUserId = (props) => {
    const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [wines, setWines] = useState([]);
  const user = props.user;
  const setWineInfo = props.setWineInfo;

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const fetchedFavorites = await getFavorites(id);
        setFavorites(fetchedFavorites);
        console.log(favorites)
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserFavorites();
  }, [user]);

  useEffect(() => {
    const fetchWines = async () => {
        if (favorites.length) {
      const winePromises = favorites.map((favorite) => {
        return getWineById(favorite.wine_id);
      });
      const wines = await Promise.all(winePromises);
      setWines(wines);}
    };

    fetchWines();
  }, [favorites]);

  return (
    <div id="favorites">
      {wines && wines.length ? (
        wines.map((wine) => (
          <div key={`allWines-${wine.id}`}>
            <WineDetails wine={wine} setWineInfo={setWineInfo} user={user} />
          </div>
        ))
      ) : (
        <div>I have no favorites yet...</div>
      )}
    </div>
  );
};

export default FavoritesUserId;