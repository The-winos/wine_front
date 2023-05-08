import React, { useEffect, useState } from "react";
import { getFavorites, getWineById } from "./API";
import { WineDetails } from "./"

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [wines, setWines] = useState([]);
  const user = props.user;
  const setWineInfo = props.setWineInfo;

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const fetchedFavorites = await getFavorites(user.id);
        setFavorites(fetchedFavorites);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserFavorites();
  }, [user]);

  useEffect(() => {
    const fetchWines = async () => {
      const winePromises = favorites.map((favorite) => {
        return getWineById(favorite.wine_id);
      });
      const wines = await Promise.all(winePromises);
      setWines(wines);
    };

    fetchWines();
  }, [favorites]);

  return (
    <div id="favorites">
              <h1>{user.username}'s Favorite Wines</h1>
      {wines && wines.length ? (
        wines.map((wine) => (
          <div key={`allWines-${wine.id}`}>
            <WineDetails wine={wine} setWineInfo={setWineInfo} user={user} />
          </div>
        ))
      ) : (
        <div>Loading your favorites...</div>
      )}
    </div>
  );
};

export default Favorites;