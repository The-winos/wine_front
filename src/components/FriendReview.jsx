import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, getWineById } from "./API";
import Rating from "react-rating-stars-component";
import FollowButton from "./FollowButton";


const FriendReview = ({reviews, user}) => {
  const navigate=useNavigate();
  const [reviewFriend, setReviewFriend]= useState({})
  const [wineFriend, setWineFriend]= useState({})

  useEffect(()=>{
    async function fetchUser(){
      const theUser = await getUserById(reviews.user_id)
      setReviewFriend(theUser)
    }
    fetchUser();
  }, []);

  useEffect(()=>{
    async function fetchWines(){
  const theWine= await getWineById(reviews.wine_id)
  setWineFriend(theWine);
}
fetchWines(); },[]);

const formattedPrice = (reviews.price / 100).toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

  return (
    <div className="card mb-3" style={{maxWidth:"60%", margin:"0 auto "}}>
    <div className="row no-gutter">
      <div className="col-md-4" style={{ border: "none" }}>
        <img
        src={wineFriend.image_url}
        alt="wine image"
        className="img-fluid"
        style={{maxHeight:"90%", maxWidth: "90%"}}
        />
        <img
      src={reviewFriend.avatar}
      alt="user picture"
      className="img-fluid"
      style={{maxHeight:"50px", maxWidth:"50px", position: "absolute", top: 0, right: 0}}
      />
      </div>
     <div className="col-md-8">
      <div className="card-body">
      <h4 className="wine-name">{wineFriend.name}
  <small className="wine-flavor muted">   {wineFriend.flavor}</small>
</h4>


        <h4 className="review-title">{reviews.name}</h4>
        <small className="text-muted">By: {reviewFriend.username}</small>

        <Rating
                  value={reviews.rating}
                  edit={false}
                  size={20}
                  activeColor="#ffd700"
                />
        <p className="card-text">
          <small className="text-muted">Price: {formattedPrice}</small> <br />
          <small className="text-muted">Bought at: {reviews.location}</small>
        </p>
        <h5 className="review-comment">{reviews.review_comment}</h5>
<button onClick={()=>{
        navigate(`/singlewine/${wineFriend.id}`);
      }} className="btn btn-primary"> Check out this wine</button>
      </div>


     </div>


    </div>

  </div>
  )
};

export default FriendReview;
