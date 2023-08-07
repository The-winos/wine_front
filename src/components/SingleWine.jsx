import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviewsByWineId, getWineById } from "./API";
import Rating from "react-rating-stars-component";
import SingleWineReview from "./SingleWineReview";

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
      <div className="col-md-3 ml-4">
        <img
          className="img-fluid"
          src={`/images/${singleWine.image_url}`}
          alt="wine image"
          style={{
            height: "auto",
            width: "25%",
            margin: "0 auto",
          }}
        />
      </div>
      <div className="col-md-8">
        <h2 className="fw-bold mb-2">{singleWine.name}</h2>
        <Rating
          value={singleWine.rating}
          edit={false}
          size={20}
          activeColor="#ffd700"
        />
        <p className="text-muted mt-2 mb-1 single-wine-flavor">
          <small>Type:&nbsp;</small>
          <span>{singleWine.flavor}</span>
        </p>
        <p className="text-muted mb-1 single-wine-avgPrice">
          <small>Average Price:&nbsp;</small>
          <span>
            {singleWine.price !== 0 && singleWine.price !== null ? formattedPrice : <small>No prices yet</small>}
          </span>
        </p>
        <p className="text-muted single-wine-region">
          <small>Region:&nbsp;</small>
          <span>{singleWine.region}</span>
        </p>
      </div>
      <div className="row" id="single-wine-reviews">
        {wineReviews && wineReviews.length ? (
          wineReviews.map((review) => {
            return (
              <div key={`wine-review-${review.id}`}>
                <SingleWineReview review={review} user={user} />
              </div>
            );
          })
        ) : (
          null
        )}
      </div>
    </>
  ) : (
    <h1>Loading Your Wine</h1>
  )}
</div>

  );
};

export default SingleWine;
