import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserById,
  getWineById,
  addFavorite,
  removeFavorite,
  removeSaved,
  addSaved,
} from "./API";
import Rating from "react-rating-stars-component";
import FollowButton from "./FollowButton";
import ReviewUpdate from "./ReviewUpdate";

const ReviewDetails = ({ review, user, favorites, saved, handleNewReview, currentUser }) => {

  const navigate = useNavigate();
  const [reviewUser, setReviewUser] = useState({});
  const [reviewWine, setReviewWine] = useState({});
  const [localFavorites, setLocalFavorites] = useState(favorites || []);
  const [localSaved, setLocalSaved] = useState(saved || []);
  const [updateReviews, setUpdateReview] = useState(false);
  const [expandedComment, setExpandedComment] = useState(false);

  useEffect(() => {
    setLocalFavorites(favorites || []);
    setLocalSaved(saved || []);
  }, [favorites, saved]);

  useEffect(() => {
    async function fetchGetUserById() {
      const theUser = await getUserById(review.user_id);
      setReviewUser(theUser);
    }
    fetchGetUserById();
  }, []);

  useEffect(() => {
    async function fetchGetWineForReview() {
      const theWine = await getWineById(review.wine_id);
      setReviewWine(theWine);
    }
    fetchGetWineForReview();
  }, []);

  const formattedPrice = (review.price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  function checkOnFaves(wineID) {
    if (localFavorites.length > 0) {
      for (const favoriteItem of localFavorites) {
        if (favoriteItem.wine_id === wineID) {
          return favoriteItem.id;
        }
      }
    }
    return null;
  }

  function checkOnSaved(wineID) {
    if (localSaved.length > 0) {
      for (const savedItem of localSaved) {
        if (savedItem.wine_id === wineID) {
          return savedItem.id;
        }
      }
    }
    return null;
  }

  function handleRemoveFavorite(favoriteID) {
    const updateFavorite = localFavorites.filter(
      (favoriteItem) => favoriteItem.id !== favoriteID
    );
    setLocalFavorites(updateFavorite);
    removeFavorite(favoriteID);
  }

  function handleRemoveSaved(savedId) {
    const updatedSaved = localSaved.filter(
      (savedItem) => savedItem.id !== savedId
    );
    setLocalSaved(updatedSaved);
    removeSaved(savedId);
  }

  function handleAddSaved(userId, wineId) {
    const newSavedItem = {
      id: Date.now(),
      user_id: userId,
      wine_id: wineId,
    };
    const updatedSaved = Array.isArray(localSaved)
      ? [...localSaved, newSavedItem]
      : [newSavedItem];
    setLocalSaved(updatedSaved);
    addSaved(userId, wineId);
  }

  function handleAddFavorite(userId, wineId) {
    const newFavItem = {
      id: Date.now(),
      user_id: userId,
      wine_id: wineId,
    };
    const updatedFavorites = Array.isArray(localFavorites)
      ? [...localFavorites, newFavItem]
      : [newFavItem];
    setLocalFavorites(updatedFavorites);
    addFavorite(userId, wineId);
  }

  return (
    <>
      {!updateReviews ? (
        <>
          <div
            className="card mb-3"
            style={{ maxWidth: "60%", margin: "0 auto" }}
          >
            <div className="row no-gutter">
              <div
                className="col-md-3"
                style={{ border: "none", position: "relative" }}
              >
                <img
                  src={`/images/${reviewWine.image_url}`}
                  alt="wine image"
                  className="img-fluid"
                  style={{ maxHeight: "250px", maxWidth: "90%", padding: "1rem" }}
                />
                <div
                  className="savedFavs d-flex flex-column align-items-end"
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  {user && currentUser ? (<>
                    {console.log(user, currentUser, "lets look")}
                  <div
                    onClick={() => {
                      if(user.id==currentUser.id){
                      const favoriteId = checkOnFaves(reviewWine.id);
                      if (favoriteId) {
                        handleRemoveFavorite(favoriteId);
                      } else {
                        handleAddFavorite(user.id, reviewWine.id);
                      }}
                    }}
                    className="custom-button"
                    style={{
                      marginBottom: "0.5rem",
                      cursor: "pointer",
                      padding: "1rem"


                    }}
                  >
                    {checkOnFaves(reviewWine.id) ? (
                      <img
                        src="/images/7-heartcheck.png"
                        alt="heart"
                        className="img-fluid"
                        style={{
                          width: "25%",
                          height: "auto",
                          marginBottom: "-5px",
                          marginRight: "-2px",
                          padding: "2px"
                        }}
                        title="Remove from Favorites"
                      />
                    ) : (
                      <img
                        src="/images/5-heart.png"
                        alt="heart"
                        className="img-fluid"
                        style={{ width: "18%", height: "auto", paddingTop: "2px"  }}
                        title="Add To Favorites"
                      />
                    )}
                  </div>

                  <div
                    onClick={() => {
                      if(user.id==currentUser.ic){
                      const savedId = checkOnSaved(reviewWine.id);
                      if (savedId) {
                        handleRemoveSaved(savedId);
                      } else {
                        handleAddSaved(user.id, reviewWine.id);
                      }}
                    }}
                    className="custom-button"
                    style={{
                      cursor: "pointer",
                      paddingTop: "2px"
                    }}
                  >
                    {checkOnSaved(reviewWine.id) ? (
                      <img
                        src="/images/8-notepad_check.png"
                        alt="notepad"
                        className="img-fluid"
                        style={{
                          width: "15%",
                          height: "auto",
                          padding: "2px",
                          marginRight: "10px"
                        }}
                        title="Remove From My List"
                      />
                    ) : (
                      <img
                        src="/images/6-list.png"
                        alt="savedPad"
                        className="img-fluid"
                        style={{ width: "35%", height: "auto", padding: "2px", marginRight: "10px"  }}
                        title="Add To My List"
                      />
                    )}
                  </div>
                  </>) : null}
                </div>
              </div>


              <div className="col-md-9">
                <div className="card-body">
                  <h4 className="wine-name">
                    {reviewWine.name}
                    <small className="wine-flavor muted">
                      {" "}
                      {reviewWine.flavor}
                    </small>
                  </h4>
                  <div className="avatar-container">
                  <img
                    src={`/images/${reviewUser.avatar}`}
                    alt="user picture"
                    className="img-fluid"
                    style={{
                      maxHeight: "60px",
                      maxWidth: "60px",
                      padding: "5px"

                    }}
                  />
                  </div>
                  <h4 className="review-title">{review.name}</h4>
                  <div className="d-flex align-items-center">
                    <small className="text-muted">
                      By:
                      {user ? (<>
                      {user.id !== reviewUser.id &&
                      reviewUser.username != "Deleted User" ? (
                        <a href={`/profileuserid/${reviewUser.id}`}>
                          {reviewUser.username}
                        </a>
                      ) : (
                        <>
                          {reviewUser.username != "Deleted User" ? (
                            <a href={`/profile`}>{reviewUser.username}</a>
                          ) : (
                            <small>{reviewUser.username}</small>
                          )}
                        </>
                      )}</>) : reviewUser.username}
                    </small>
                    {user ? (<>
                    {reviewUser.username != "Deleted User" ? (
                      <div className="ml-3">

                        <FollowButton
                          review={review}
                          reviewUser={reviewUser}
                          reviewWine={reviewWine}
                          user={user}
                        />
                      </div>
                    ) : null}
                    {currentUser.id == reviewUser.id ? (
                      <div
                        style={{
                          marginLeft: "10px",
                          padding: "1px",
                          fontSize: "12px",
                          background: "#f6dec5",
                          border: "1px solid gray",
                          color: "gray",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setUpdateReview(true);
                        }}
                      >
                        <small>Update Review</small>
                      </div>
                    ) : null}
                    </>) : null}
                  </div>
                  <Rating
                    value={review.rating}
                    edit={false}
                    size={20}
                    activeColor="#ffd700"
                  />
                  <p className="card-text">
                    <small className="text-muted">
                      Price:{" "}
                      {review.price !== 0 && review.price !== null
                        ? formattedPrice
                        : "N/A"}
                    </small>

                    <small
                      className="text-muted"
                      style={{ marginLeft: "20px" }}
                    >
                      Bought at:{" "}
                      {review.location != null ? review.location : "Unknown"}
                    </small>
                  </p>
                  {review.review_comment.length > 89 ? (
                    <div className="review-comment-container">
                      <h6
                        className={`review-comment ${
                          expandedComment ? "expanded" : ""
                        }`}
                      >
                        {expandedComment
                          ? review.review_comment
                          : review.review_comment.substring(0, 89)}
                      </h6>
                      {!expandedComment && (
                        <span
                          onClick={() => setExpandedComment(true)}
                          className="read-more"
                        >
                          <small>... (read more)</small>
                        </span>


                      )}
                      {expandedComment && (
                        <span
                          onClick={() => setExpandedComment(false)}
                          className="read-less"
                        >
                          <small>(read less)</small>
                        </span>
                      )}
                    </div>
                  ) : (
                    <h5 className="review-comment">{review.review_comment}</h5>
                  )}

<button
  onClick={() => {
    navigate(`/singlewine/${reviewWine.id}`);
  }}
  style={{ whiteSpace: "nowrap", maxWidth: "fit-content" }}
  className="btn btn-primary"
>
  View Wine
</button>


                </div>
              </div>
            </div>
          </div>
        </>
      ) : (

        <ReviewUpdate
          review={review}
          setUpdateReview={setUpdateReview}
          reviewWine={reviewWine}
          reviewUser={reviewUser}
          updateReviews={updateReviews}
          handleNewReview={handleNewReview}
        />
      )}
    </>
  );
};

export default ReviewDetails;
