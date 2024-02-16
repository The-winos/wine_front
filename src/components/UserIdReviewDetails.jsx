import React, { useEffect, useState } from "react";
import { getReviewByUser, getWineById } from "./API";
import { useNavigate, useParams } from "react-router-dom";

import Rating from "react-rating-stars-component";

const UserIdReviewDetails = ({ userReviews, userProfile, setUserReviews }) => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [userWineDetails, setUserWineDetails] = useState([]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviews = await getReviewByUser(id);
        setUserReviews(reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserReviews();
  }, []);

  useEffect(() => {
    async function fetchUserWineDetails() {

      const userWineDetail = await getWineById(userReviews.wine_id);
      setUserWineDetails(userWineDetail);
    }
    fetchUserWineDetails();
  }, []);

  const formattedPrice = (userReviews.price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (<>

      <div className="review-card mb-3 mx-auto mr-0 text-left" style={{ maxWidth: "60%" }}>
      <h3 className="user-review-date">
        {new Date(userReviews.review_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h3>
    <div className="row no-gutter">
      <div className="col-md-4" style={{ border: "none" }}>
        <img
        src={`/images/${userWineDetails.image_url}`}
        alt="wine image"
        className="img-fluid"
        style={{maxHeight:"250px", maxWidth: "90%"}}
        />
      </div>
     <div className="col-md-8">
      <div className="card-body">
      <h4 className="wine-name">{userWineDetails.name}
  <small className="wine-flavor muted">   {userWineDetails.flavor}</small>
</h4>

<h4 className="review-title">{userReviews.name}</h4>
<div className="d-flex align-items-center">
</div>
<Rating
    value={userReviews.rating}
    edit={false}
    size={20}
    activeColor="#ffd700"
  />
        <p className="card-text">

        <small className="text-muted">Price: {userReviews.price !== 0 && userReviews.price !== null ? formattedPrice : "N/A" }</small>

 <br />
          <small className="text-muted">Bought at: {userReviews.location != null ? userReviews.location : "Unknown"}</small>
        </p>
        <h5 className="review-comment text-truncate">
  {userReviews.review_comment}
</h5>
<button onClick={()=>{
        navigate(`/singlewine/${userWineDetails.id}`);
      }} className="btn btn-primary"> Check out this wine</button>
      </div>


     </div>


    </div>

  </div>
  </>
  );
};

export default UserIdReviewDetails;
