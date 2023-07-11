import React, { useEffect, useState } from "react";
import { getReviewByUser, getWineById } from "./API";
import { useParams } from "react-router-dom";

const UserReviewDetails = ({ userReviews, user, setUserReviews }) => {
  const { wineId } = useParams();
  const [userWineDetails, setUserWineDetails] = useState([]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviews = await getReviewByUser(user.id);
        setUserReviews(reviews);
        console.log(reviews, "user reviews");
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
    <div className="card">
      <div className="card-body">
        {userWineDetails && (
          <>
            <h5 className="card-title">
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
            <h6 className="card-subtitle mb-2">{userWineDetails.name}</h6>
            <p className="card-text">
              Rating: {renderRatingStars(userReviews.rating)}
            </p>
            <p className="card-text">{userReviews.review_comment}</p>
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
