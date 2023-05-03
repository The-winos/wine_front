import React, { useEffect, useState } from "react";
import { getFavorites, getWineById } from "./API";
import { WineDetails } from "./"

const Favorites = (props) => {
    const[favorites, setFavorites]=useState([])
    const user = props.user
    const setWineInfo = props.setWineInfo
    let wine

    useEffect(() => {
        const fetchUserFavorites = async () => {
          try {
            const fetchedFavorites = await getFavorites(user.id);
            setFavorites(fetchedFavorites);
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

      // async function getWine (id) {
      //   await getWineById(id)
      // }

  return <div id="favorites">
{/* {favorites && favorites.length */}
          {/* ? favorites.map(async (favoriteWine) => { */}

            {/* return( */}
              {/* <> */}
            {/* {console.log(favoriteWine)} */}
            {/* {console.log(favoriteWine.id)} */}
            {/* {wine = await getWineById(favoriteWine.wine_id)} */}
            {/* {console.log(wine)} */}
            {/* <div key={`allWines-${wine.id}`}> */}
                  {/* <WineDetails */}
                    {/* wine={wine} */}
                    {/* setWineInfo={setWineInfo} */}
                    {/* user={user} */}
                  {/* /> */}
                  {/* <div>We should have a wine!</div> */}
                {/* </div></>) */}
              
            {/* }) */}
          {/* : <div>Loading your favorites...</div>}   */}
          </div>;
};

export default Favorites;