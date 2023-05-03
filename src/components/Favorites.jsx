import React, { useEffect, useState } from "react";
import { getFavorites, getWineById } from "./API";
import { WineDetails } from "./"

const Favorites = (props) => {
    const[favorites, setFavorites]=useState([])
    const user = props.user
    const setWineInfo = props.setWineInfo


    useEffect(() => {
        const fetchUserFavorites = async () => {
          try {
            const favorites = await getFavorites(user.id);
            setFavorites(favorites);
            {
              console.log(user, "this is user");
            }
            console.log(favorites, "user favorites");
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUserFavorites();
      }, [user]);

      async function getWine (id) {
        await getWineById(id)
      }

      console.log(favorites)

  return <div id="favorites">
{favorites && favorites.length
          ? favorites.map((favoriteWine) => {
            let wine = getWine(favoriteWine.id);
            console.log(wine);
            {wine ? <div key={`allWines-${wine.id}`}>
                  <WineDetails
                    wine={wine}
                    setWineInfo={setWineInfo}
                    user={user}
                  />
                </div>: <div>Loading wine...</div>}
              
            })
          : <div>Loading your favorites...</div>}  </div>;
};

export default Favorites;