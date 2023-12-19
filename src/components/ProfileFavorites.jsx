import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getFavorites, getSaved, getWineById } from "./API";
import WineDetails from "./WineDetails";

const ProfileFavorites = ({user, currentUser}) => {

  const [wines, setWines] = useState([]);
  const [favorites, setFavorites]=useState([])
  const[saved, setSaved]=useState([])


  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user) {
        try {
          const fetchedFavorites = await getFavorites(user.id);
          console.log(fetchedFavorites, "fetch");
          setFavorites(fetchedFavorites);
          // Retrieve additional information for each favorite
          const wines = await Promise.all(
            fetchedFavorites.map(async (favorite) => {
              const wineInfo = await getWineById(favorite.wine_id);
              return wineInfo;
            })
          );

          // Update the wines state
          setWines(wines);


        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserFavorites();
  }, [user]);

  useEffect(() => {
  const fetchUserSaved = async () => {
    if (user) {
      try {
        const fetchedSaved = await getSaved(user.id);
        setSaved(fetchedSaved);
      } catch (error) {
        console.error(error);
      }
    }
  };

  fetchUserSaved();
}, [user]);


  return (
    <div id="favorites">
     { console.log(wines, "checker here")}
      <h1 className="mb-4">{user.username}'s Favorite Wines</h1>
      <Row>
        {wines && wines.length ? (
          wines.map((wine) => (
            <Col sm={6} md={4} lg={3} key={`allWines-${wine.id}`}>
              <WineDetails
                wine={wine}
                user={user}
                favorites={favorites}
                saved={saved}
              />
            </Col>
          ))
        ) : (
          <div>{user.username} has no favorites yet...</div>
        )}
      </Row>
    </div>
  );
};

export default ProfileFavorites;
