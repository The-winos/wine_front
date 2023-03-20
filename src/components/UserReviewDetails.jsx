import React, { useEffect } from "react";
import { getReviewByUser, getWineById } from "./API";
import Profile from "./Profile";

const UserReviewDetails = ({ userReviews, user, setUserReviews }) => {
  // const [wineUserDetails, setWineUserDetails] = {[]}
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

  // useEffect(() => {
  //   const fetchUserWineDetails = async () => {
  //     try {
  //       const userWineDetails = await getWineById(user.id);
  //       setUserReviews(reviews);
  //       console.log(reviews, "user reviews");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUserReviews();
  // }, [user]);

  return (
    <div>
      {userReviews && userReviews.length
        ? userReviews.map((userReviews) => {
            return (
              <div key={userReviews.id}>
                {userReviews.comment}

                <h3>
                  {new Date(userReviews.review_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
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
            );
          })
        : null}
    </div>
  );
};

export default UserReviewDetails;
