import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, getWineById } from "./API";
import Rating from "react-rating-stars-component";




const SingleWineReview = ({review, user}) => {
  const navigate=useNavigate();
  const [reviewUser, setReviewUser]=useState({})
  const [reviewWine, setReviewWine]=useState({})

  useEffect(()=>{
    async function fetchGetUserById(){
      const theUser= await getUserById(review.user_id)
      setReviewUser(theUser);
}
fetchGetUserById();
  }, []);

  useEffect(()=>{
    async function fetchGetWineForReview(){
      const theWine= await getWineById(review.wine_id)
      setReviewWine(theWine);
    }
    fetchGetWineForReview();
  },[]);

  const formattedPrice = (review.price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

return (
  <div className="card single-wine-review mb-3" style={{ maxWidth: "60%",  margin: "0 auto" }}>
    <div className="card-header">
      <div className="row align-items-center">
        <div className="col-2">
          <img
            src={`/images/${reviewUser.avatar}`}
            alt="user picture"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="col-8 avatar-username">
        {user.id!=reviewUser.id ?
          <span> <a href={`/profileuserid/${reviewUser.id}`}>{reviewUser.username}</a> </span> : <span> <a href={`/profile`}>{reviewUser.username}</a> </span>}
        </div>
        <div className="col-2 text-right">
          <span className="review-date">
          {new Date(reviewUser.review_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
          </span>
        </div>
      </div>
      <hr />
    </div>
    <div className="card-body">
      <h4 className="wine-name">
        {reviewWine.name}
        <small className="wine-flavor muted"> {reviewWine.flavor}</small>
      </h4>
      <h4 className="review-title">{review.name}</h4>
      <div className="rating">
        <Rating value={review.rating} edit={false} size={20} activeColor="#ffd700" />
      </div>
      <p className="card-text">
        <small className="text-muted">Price: {review.price !== 0 && review.price !== null ? formattedPrice : "N/A"}</small> <br />
        <small className="text-muted">Bought at: {review.location!= null ? review.location : "Unknown"}</small>
      </p>
      <h5 className="review-comment">{review.review_comment}</h5>
    </div>
  </div>
);

};

export default SingleWineReview;
