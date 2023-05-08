import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFavorites, getWineById, getUserById } from "./API";
import { WineDetails } from "./"

const FavoritesUserId = (props) => {
    const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [wines, setWines] = useState([]);
  const user = props.user;
  const setWineInfo = props.setWineInfo;
  const [theUser, setTheUser]= useState({})


  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const fetchedFavorites = await getFavorites(id);
        setFavorites(fetchedFavorites);
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

  useEffect(()=>{
    async function fetchGetUserById(){
      const person= await getUserById(id)
      setTheUser(person);
}
fetchGetUserById();
  }, []);

  return (
    <div id="favorites">
        <h1>{theUser.username}'s Favorite Wines</h1>
      {wines && wines.length ? (
        wines.map((wine) => (
          <div key={`allWines-${wine.id}`}>
            <WineDetails wine={wine} setWineInfo={setWineInfo} user={user} />
          </div>
        ))
      ) : (
        <div>{theUser.username} has no favorites yet...</div>
      )}
    </div>
  );
};

export default FavoritesUserId;