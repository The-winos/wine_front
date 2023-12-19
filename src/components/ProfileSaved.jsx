import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getFavorites, getSaved, getWineById } from "./API";
import WineDetails from "./WineDetails";

const ProfileSaved = ({user, currentUser}) => {

  const [wines, setWines] = useState([]);
  const [favorites, setFavorites]=useState([])
  const[saved, setSaved]=useState([])


  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user) {
        try {
          const fetchedSaved = await getSaved(user.id);

          setSaved(fetchedSaved);
          if(fetchedSaved>=1){
          const wines = await Promise.all(
            fetchedSaved.map(async (save) => {
              const wineInfo = await getWineById(save.wine_id);
              return wineInfo;
            })
          );

          // Update the wines state
          setWines(wines);}


        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserFavorites();
  }, [user]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user) {
        try {
          const fetchedFavorites = await getFavorites(user.id);
          setFavorites(fetchedFavorites);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserFavorites();
  }, [user]);


  return (
    <div id="favorites">

      <h1 className="mb-4">{user.username}'s saved for later wines</h1>
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
          <div>{user.username} doesn't currently have any saved wines</div>
        )}
      </Row>
    </div>
  );
};

export default ProfileSaved;
