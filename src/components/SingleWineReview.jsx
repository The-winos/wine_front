import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, getWineById } from "./API";
import Rating from "react-rating-stars-component";




const SingleWineReview = ({review}) => {
  const navigate=useNavigate();
  const [reviewUser, setReviewUser]=useState({})
  const [reviewWine, setReviewWine]=useState({})

  useEffect(()=>{
    async function fetchGetUserById(){
      const theUser= await getUserById(review.user_id)
      console.log(theUser)
      setReviewUser(theUser);
}
fetchGetUserById();
  }, []);

  useEffect(()=>{
    async function fetchGetWineForReview(){
      const theWine= await getWineById(review.wine_id)
      console.log(theWine)
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
            src={reviewUser.avatar}
            alt="user picture"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="col-8 avatar-username">
          <span>{reviewUser.username}</span>
        </div>
        <div className="col-2 text-right">
          <span className="review-date">
            {new Date(review.date).toLocaleDateString("en-US", {
              month: "short",
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
        <small className="text-muted">Price: {formattedPrice}</small> <br />
        <small className="text-muted">Bought at: {review.location}</small>
      </p>
      <h5 className="review-comment">{review.review_comment}</h5>
    </div>
  </div>
);

};

export default SingleWineReview;
