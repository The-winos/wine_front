import React, { useEffect } from "react";
import { getReviewByUser } from "./API";

const UserReviewDetails = ({ userReviews, user }) => {
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

  return (
    <div>
      {userReviews.map((userReviews) => (
        <div key={userReviews.id}>
          {userReviews.comment}

          <h3>
            {new Date(userReviews.review_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <img
            src={userReviews.image_url}
            alt="wine image"
            className="img-fluid"
            style={{
              height: "200px",
              width: "200px",
              objectFit: "contain",
              objectPosition: "center center",
            }}
          />
          <h3>{userReviews.name}</h3>
          <h3>{userReviews.review_comment}</h3>
        </div>
      ))}
    </div>
  );
};

export default UserReviewDetails;
