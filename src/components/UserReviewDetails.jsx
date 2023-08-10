import React, { useEffect, useState } from "react";
import { getReviewByUser, getWineById } from "./API";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "react-rating-stars-component";

const UserReviewDetails = ({ userReviews, user, setUserReviews }) => {
  const navigate = useNavigate();
  const { wineId } = useParams();
  const [userWineDetails, setUserWineDetails] = useState([]);
  const [reviewWine, setReviewWine] = useState({});

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviews = await getReviewByUser(user.id);
        setUserReviews(reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserReviews();
  }, [user]);

  useEffect(() => {
    const fetchUserWineDetails = async () => {
      try {
        const wineDetails = await getWineById(userReviews.wine_id);
        setUserWineDetails(wineDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserWineDetails();
  }, [userReviews]);

  // Function to convert rating to star icons
  const renderRatingStars = (rating) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return filledStars + emptyStars;
  };

  return (
    <div className="note">
      <div>
        {userWineDetails && (
          <>
            <div className="review-date"></div>
            <h5 className="date">
              {new Date(userReviews.review_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h5>
            <img
              src={`/images/${userWineDetails.image_url}`}
              alt="wine image"
              className="card-img-top"
              style={{
                height: "200px",
                objectFit: "contain",
                objectPosition: "center center",
              }}
            />
            <h6>{userWineDetails.name}</h6>
            <Rating
              value={userReviews.rating}
              edit={false}
              size={20}
              activeColor="#ffd700"
            />
            <h5 className="review-comment text-truncate">
              {userReviews.review_comment}
            </h5>
          </>
        )}
      </div>
      <button
        onClick={() => {
          navigate(`/singlewine/${reviewWine.id}`);
        }}
        className="btn btn-primary"
      >
        Edit Review
      </button>
    </div>
  );
};

export default UserReviewDetails;
