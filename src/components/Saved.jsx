import React from "react";

const Saved = ({saved, setSaved, user, setWineInfo}) => {
  const [wines, setWines] = useState([]);


  useEffect(() => {
    const fetchWines = async () => {
      if (saved.length) {
        const winePromises = saved.map((save) => {
          return getWineById(save.wine_id);
        });
        const wines = await Promise.all(winePromises);
        setWines(wines);
      }
    };

    fetchWines();
  }, [saved]);


  return (
  <div id="saved">
<h1 className="mb-4">{user.username}'s Saved Wines</h1>
<Row>
        {wines && wines.length ? (
          wines.map((wine) => (
            <Col sm={6} md={4} lg={3} key={`allWines-${wine.id}`}>
              <WineDetails
                wine={wine}
                setWineInfo={setWineInfo}
                user={user}
                saved={saved}
              />
            </Col>
          ))
        ) : (
          <div>{user.username} has no favorites yet...</div>
        )}
      </Row>

  </div>
  )
};

export default Saved;
