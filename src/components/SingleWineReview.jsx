import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, getWineById } from "./API";
import Rating from "react-rating-stars-component";

const SingleWineReview = ({ review, user }) => {
  const navigate = useNavigate();
  const [reviewUser, setReviewUser] = useState({});
  const [reviewWine, setReviewWine] = useState({});

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

  const handleEditReview = () => {
    navigate(`/edit-review/${review.id}`);
  };

  return (
    <div
      className="card single-wine-review mb-3"
      style={{ maxWidth: "60%", margin: "0 auto" }}
    >
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
            {user ? (
              <>
                {user.id !== reviewUser.id &&
                reviewUser.username !== "Deleted User" ? (
                  <span>
                    {" "}
                    <a href={`/profileuserid/${reviewUser.id}`}>
                      {reviewUser.username}
                    </a>{" "}
                  </span>
                ) : (
                  <>
                    {reviewUser.username !== "Deleted User" ? (
                      <span>
                        {" "}
                        <a href={`/profile`}>{reviewUser.username}</a>{" "}
                      </span>
                    ) : (
                      <span>{reviewUser.username}</span>
                    )}
                  </>
                )}
              </>
            ) : (
              reviewUser.username
            )}
          </div>{" "}

          <div className="col-2 text-right">
            <span>
              {new Date(review.review_date).toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h4 className="wine-name mb-1">
          {reviewWine.name}
          <small className="wine-flavor muted"> {reviewWine.flavor}</small>
        </h4>
        <h4 className="review-title mb-1">{review.name}</h4>
        <div className="rating">
          <Rating
            value={review.rating}
            edit={false}
            size={20}
            activeColor="#ffd700"
          />
        </div>
        <p className="card-text mb-1">
          <small className="text-muted" style={{marginRight:"10px"}}>
            Price:{" "}
            {review.price !== 0 && review.price !== null
              ? formattedPrice
              : "N/A"}
          </small>{" "}

          <small className="text-muted">
            Bought at: {review.location != null ? review.location : "Unknown"}
          </small>
        </p>
        <h5 className="review-comment">{review.review_comment}</h5>
        {user ? (<>
        {user.id === reviewWine.author_id && (
          <button className="btn btn-primary" onClick={handleEditReview}>
            Edit Review
          </button>
        )}</>): null}
      </div>
    </div>
  );
};

export default SingleWineReview;
