import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, getWineById, addFavorite, removeFavorite } from "./API";
import Rating from "react-rating-stars-component";
import FollowButton from "./FollowButton";



const FriendReview = ({reviews, user, favorites}) => {
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

function checkOnFaves(wineID) {
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].wine_id === wineID) {
      return true;
    }
  }
}

function handleRemoveFavorite(wineID) {

  let favoriteId;
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].wine_id === wineID) {
      favoriteId = favorites[i].id;
      break;
    }
  }
  removeFavorite(favoriteId);
  navigate(`/favorites`);
}

return (
  <div className="card mb-3" style={{ maxWidth: "60%", margin: "0 auto" }}>
    <div className="row no-gutter">
      <div className="col-md-3" style={{ border: "none", position: "relative" }}>
        <img
          src={`/images/${wineFriend.image_url}`}
          alt="wine image"
          className="img-fluid"
          style={{ maxHeight: "250px", maxWidth: "90%" }}
        />
        {checkOnFaves(wineFriend.id) ? (
          <button
            onClick={() => {
              handleRemoveFavorite(wineFriend.id);
            }}
            className="bg-transparent"
            style={{
              position: "absolute",
              border: "none",
              top: "1em",
              right: "1em",
              zIndex: "1",
            }}
          >
            <span className="material-symbols-outlined">heart_check</span>
          </button>
        ) : (
          <button
            onClick={() => {
              addFavorite(user.id, wineFriend.id);
              navigate(`/favorites`);
            }}
            className="bg-transparent"
            style={{
              position: "absolute",
              border: "none",
              top: "1em",
              right: "1em",
              zIndex: "1",
            }}
          >
            <span className="material-symbols-outlined">favorite</span>
          </button>
        )}


      </div>
     <div className="col-md-9">
      <div className="card-body">
      <h4 className="wine-name">{wineFriend.name}
  <small className="wine-flavor muted">   {wineFriend.flavor}</small>
</h4>


        <h4 className="review-title">{reviews.name}</h4>
        <small className="text-muted">By: {user.id!=reviewFriend.id ?
           <a href={`/profileuserid/${reviewFriend.id}`}>{reviewFriend.username}</a>  :  <a href={`/profile`}>{reviewFriend.username}</a> }</small>
           <img
          src={`/images/${reviewFriend.avatar}`}
          alt="user picture"
          className="img-fluid"
          style={{ maxHeight: "50px", maxWidth: "50px", position: "absolute", top: 0, right: 0 }}
        />

        <Rating
                  value={reviews.rating}
                  edit={false}
                  size={20}
                  activeColor="#ffd700"
                />
        <p className="card-text">
          <small className="text-muted">Price: <small className="text-muted">Price: {reviews.price !== 0 && reviews.price !== null ? formattedPrice : "N/A" }</small>
</small> <br />
          <small className="text-muted">Bought at: {reviews.location != null ? reviews.location : "Unknown"}</small>
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
