import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviewsByWineId, getWineById } from "./API";
import Rating from "react-rating-stars-component";

const SingleWine = ({ user, loggedIn }) => {
  const { wineId } = useParams();
  const navigate = useNavigate();
  const [singleWine, setSingleWine] = useState();
  const [wineReviews, setWineReviews]=useState([])

  useEffect(() => {
    async function fetchWine() {
      const theWine = await getWineById(wineId);
      setSingleWine(theWine);
    }
    fetchWine();
  }, []);

  useEffect(()=>{
    async function fetchWineReviews(){
      const wineReviews= await getReviewsByWineId(wineId);
      console.log(wineReviews, "wineReviews")
      setWineReviews(wineReviews)
    }
    fetchWineReviews();
  },[])

  const formattedPrice = singleWine
    ? (singleWine.price / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      })
    : "";

  return (
    <div className="row" id="single-wine">
      {singleWine ? (
        <>
          <div className="col-md-4">
            <img
              className="img-fluid"
              src={singleWine.image_url}
              alt="wine image"
            />
          </div>
          <div className="col-md-8">
            <h2 className="fw-bold mb-3">{singleWine.name}</h2>
            <Rating
              value={singleWine.rating}
              edit={false}
              size={20}
              activeColor="#ffd700"
            />
          <p className="text-muted mt-3 mb-0 single-wine-flavor">
  <small>Type:&nbsp;</small>
  <span className="ml-2">{singleWine.flavor}</span>
</p>
<p className="text-muted mb-0 single-wine-avgPrice">
  <small>Average Price:&nbsp;</small>
  <span className="ml-2">{formattedPrice}</span>
</p>
<p className="text-muted single-wine-region">
  <small>Region:&nbsp;</small>
  <span className="ml-2">{singleWine.region}</span>
</p>
          </div>

        </>
      ) : (
        <h1>Loading Your Wine</h1>
      )}
    </div>
  );
};

export default SingleWine;
