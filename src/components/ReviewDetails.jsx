import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, getWineById } from "./API";
import Rating from "react-rating-stars-component";
import FollowButton from "./FollowButton";



const ReviewDetails = ({review, user}) => {
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
  <div className="card mb-3" style={{maxWidth:"60%", margin:"0 auto "}}>
    <div className="row no-gutter">
      <div className="col-md-4" style={{ border: "none" }}>
        <img
        src={reviewWine.image_url}
        alt="wine image"
        className="img-fluid"
        style={{maxHeight:"90%", maxWidth: "90%"}}
        />
        <img
      src={reviewUser.avatar}
      alt="user picture"
      className="img-fluid"
      style={{maxHeight:"50px", maxWidth:"50px", position: "absolute", top: 0, right: 0}}
      />
      </div>
     <div className="col-md-8">
      <div className="card-body">
      <h4 className="wine-name">{reviewWine.name}
  <small className="wine-flavor muted">   {reviewWine.flavor}</small>
</h4>

<h4 className="review-title">{review.name}</h4>
<div className="d-flex align-items-center">
  <small className="text-muted">By:
    <a href={`/profile/${reviewUser.id}`}>{reviewUser.username}</a>
  </small>
  <div className="ml-3">
    <FollowButton
      review={review}
      reviewUser={reviewUser}
      reviewWine={reviewWine}
      user={user}
    />
  </div>
</div>
<Rating
    value={review.rating}
    edit={false}
    size={20}
    activeColor="#ffd700"
  />
        <p className="card-text">

        <small className="text-muted">Price: {review.price !== 0 && review.price !== null ? formattedPrice : "N/A" }</small>

 <br />
          <small className="text-muted">Bought at: {review.location != null ? review.location : "Unknown"}</small>
        </p>
        <h5 className="review-comment">{review.review_comment}</h5>
<button onClick={()=>{
        navigate(`/singlewine/${reviewWine.id}`);
      }} className="btn btn-primary"> Check out this wine</button>
      </div>


     </div>


    </div>

  </div>
  );

};

export default ReviewDetails;
