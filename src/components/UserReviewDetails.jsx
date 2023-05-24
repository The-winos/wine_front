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
    async function fetchUserWineDetails() {
      const userWineDetails = await getWineById(userReviews.wine_id);
      setUserWineDetails(userWineDetails);
    }
    fetchUserWineDetails();
  }, []);

  return (
    <div>
      <h3 className="user-review-date">
        {new Date(userReviews.review_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h3>
      <img
        src={`/images/${userWineDetails.image_url}`}
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

    // <div>
    //   {userWineDetails && userWineDetails.length
    //     ? userWineDetails.map((userWineDetails) => {
    //         return (
    //           <div key={userWineDetails.id}>
    //             {/* add the necessary elements here */}
    //           </div>
    //         );
    //       })
    //     : null}
  );
};

export default UserReviewDetails;
