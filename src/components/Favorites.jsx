import React, { useEffect, useState } from "react";
import { getFavorites } from "./API";

const Favorites = (props) => {
    const[favorites, setFavorites]=useState([])
    const user = props.user


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

      console.log(favorites)

  return <div id="favorites">
    I am Favorites
  </div>;
};

export default Favorites;