import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getWineById } from "./API";
import WineDetails from "./WineDetails";

const Favorites = (props) => {
  const favorites = props.favorites;
  const setFavorites = props.setFavorites;
  const [wines, setWines] = useState([]);
  const user = props.user;
  const setWineInfo = props.setWineInfo;

  useEffect(() => {
    const fetchWines = async () => {
      if (favorites.length) {
        const winePromises = favorites.map((favorite) => {
          return getWineById(favorite.wine_id);
        });
        const wines = await Promise.all(winePromises);
        setWines(wines);
      }
    };

    fetchWines();
  }, [favorites]);

  return (
    <div id="favorites">
      <h1 className="mb-4">{user.username}'s Favorite Wines</h1>
      <Row>
        {wines && wines.length ? (
          wines.map((wine) => (
            <Col sm={6} md={4} lg={3} key={`allWines-${wine.id}`}>
              <WineDetails
                wine={wine}
                setWineInfo={setWineInfo}
                user={user}
                favorites={favorites}
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

export default Favorites;
