import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, getWineById, addFavorite, removeFavorite } from "./API";
import Rating from "react-rating-stars-component";
import FollowButton from "./FollowButton";



const ReviewDetails = ({review, user, favorites, saved}) => {
  const avatarUrl = `/images/${user.avatar}`;
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

  function checkOnFaves(wineID) {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].wine_id === wineID) {
        return true;
      }
    }
  }
  function checkOnSaved(wineID) {
    console.log(saved, "saved");
    if (saved && saved.length) {
      for (let i = 0; i < saved.length; i++) {
        if (saved[i].wine_id === wineID) {
          return true;
        }
      }
    }
  }
  function handleRemoveSaved(wineID) {
    let savedId;
    for (let i = 0; i < saved.length; i++) {
      if (saved[i].wine_id === wineID) {
        savedId = saved[i].id;
        break;
      }
    }
    removeSaved(savedId);
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
  }



  return (
    <div className="card mb-3" style={{ maxWidth: "60%", margin: "0 auto" }}>
      <div className="row no-gutter">
        <div className="col-md-3" style={{ border: "none", position: "relative" }}>
          <img
            src={`/images/${reviewWine.image_url}`}
            alt="wine image"
            className="img-fluid"
            style={{ maxHeight: "250px", maxWidth: "90%" }}
          />
                 <div className="d-flex justify-center flex-column align-items-end">
  {checkOnFaves(reviewWine.id) ? (
    <div
      onClick={() => {
        handleRemoveFavorite(reviewWine.id);
      }}
      className="custom-button"
      style={{
        marginBottom: "0.5rem",
      }}
    >
      <img
        src="/images/7-heartcheck.png"
        alt="heart"
        className="img-fluid"
        style={{ width: "30%", height: "auto" }}
      />
    </div>
  ) : (
    <div
      onClick={() => {
        addFavorite(user.id, reviewWine.id);
      }}
      className="custom-button"
      style={{
        marginBottom: "0.5rem",
      }}
    >
      <img
        src="/images/5-heart.png"
        alt="heart"
        className="img-fluid"
        style={{ width: "30%", height: "auto" }}
      />
    </div>
  )}

  {checkOnSaved(reviewWine.id) ? (
    <div
      onClick={() => {
        handleRemoveSaved(reviewWine.id);
      }}
      className="custom-button"
    >
      <img
        src="/images/8-notepad_check.png"
        alt="notepad"
        className="img-fluid"
        style={{ width: "30%", height: "auto" }}
      />
    </div>
  ) : (
    <div
      onClick={() => {
        addSaved(user.id, reviewWine.id);
      }}
      className="custom-button"
    >
      <img
        src="/images/6-list.png"
        alt="savedPad"
        className="img-fluid"
        style={{ width: "30%", height: "auto" }}
      />
    </div>
  )}
</div>
        </div>


    <div className="col-md-9">
      <div className="card-body">
        <h4 className="wine-name">
          {reviewWine.name}
          <small className="wine-flavor muted">   {reviewWine.flavor}</small>
        </h4>
        <img
            src={`/images/${reviewUser.avatar}`}
            alt="user picture"
            className="img-fluid"
            style={{ maxHeight: "50px", maxWidth: "50px", position: "absolute", top: 0, right: 0 }}
          />
        <h4 className="review-title">{review.name}</h4>
        <div className="d-flex align-items-center">
          <small className="text-muted">
            By:
            {user.id !== reviewUser.id && reviewUser.username != "Deleted User" ? (
              <a href={`/profileuserid/${reviewUser.id}`}>{reviewUser.username}</a>
            ) : ( <>{reviewUser.username != "Deleted User" ?
              (<a href={`/profile`}>{reviewUser.username}</a>): <small>{reviewUser.username}</small>}</>
            )}
          </small>
          {reviewUser.username != "Deleted User" ?
         ( <div className="ml-3">
            <FollowButton review={review} reviewUser={reviewUser} reviewWine={reviewWine} user={user} />
          </div>): null}
        </div>
        <Rating value={review.rating} edit={false} size={20} activeColor="#ffd700" />
        <p className="card-text">
          <small className="text-muted">
            Price: {review.price !== 0 && review.price !== null ? formattedPrice : "N/A"}
          </small>
          <br />
          <small className="text-muted">Bought at: {review.location != null ? review.location : "Unknown"}</small>
        </p>
        <h5 className="review-comment">{review.review_comment}</h5>
        <button
          onClick={() => {
            navigate(`/singlewine/${reviewWine.id}`);
          }}
          className="btn btn-primary"
        >
          Check out this wine
        </button>
      </div>
    </div>
  </div>
</div>


  );

};

export default ReviewDetails;
