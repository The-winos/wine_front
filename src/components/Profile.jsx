//show user badges, number of posts, follower and following count

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewByUser } from "./API";

const Profile = ({ user }) => {
  const [userReviews, setUserReviews] = useState([]);

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
    <div className="profile-container">
      <div id="profile-main">
        {console.log(user, "is this working?")}
        {console.log(user.id, "is this id?")}
        <img
          src={user.avatar}
          alt="wine image"
          className="img-fluid"
          style={{ minHeight: "5%", minWidth: "5%" }}
        />

        <h2>{user.name}</h2>
      </div>

      <div>
        <Link to={"/accountsettings"}>
          <button type="accountsettings" className="buttons">
            Account Settings
          </button>
        </Link>

        <Link to={"/favorite"}>
          <button type="favorite" className="buttons">
            Favorites
          </button>
        </Link>

        {user && user.admin ? (
          <>
            <Link to={"/users"}>
              <button type="all users" className="buttons">
                All Users
              </button>
            </Link>
          </>
        ) : null}
      </div>

      <div>
        <h3>Your Reviews</h3>
        <div key={`userReview-${userReviews.id}`}>
          {userReviews.map((userReviews) => (
            <div key={userReviews.id}>
              {userReviews.comment}
              <h2>{userReviews.review_comment}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
