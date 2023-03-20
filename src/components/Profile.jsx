//show user badges, number of posts, follower and following count

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewByUser } from "./API";
import UserReviewDetails from "./UserReviewDetails";

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
          alt="avatar image"
          className="img-fluid"
          style={{
            height: "200px",
            width: "200px",
            objectFit: "contain",
            objectPosition: "center center",
          }}
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
          <UserReviewDetails
            user={user}
            userReviews={userReviews}
            setUserReviews={setUserReviews}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
