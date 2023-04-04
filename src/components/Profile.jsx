//show user badges, number of posts, follower and following count

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import { getReviewByUser } from "./API";
import UserReviewDetails from "./UserReviewDetails";

const Profile = ({ user }) => {
  // const useNavigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviews = await getReviewByUser(user.id);
        setUserReviews(reviews);
        {
          console.log(user, "this is user");
        }
        console.log(reviews, "user reviews");
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserReviews();
  }, [user]);

  //fetch API function that posts user object by id?

  return (
    <div className="profile-container">
      <div id="profile-main">
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
        </div>
        <h2 className="profile-username">{user.name}</h2>
      </div>

      <div>
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
        {userReviews && userReviews.length ? (
          userReviews.map((userReviews) => {
            return (
              <div key={`userReview-${userReviews.id}`}>
                <UserReviewDetails
                  user={user}
                  userReviews={userReviews}
                  setUserReviews={setUserReviews}
                />
                <AccountSettings
                  user={user}
                  userReviews={userReviews}
                  setUserReviews={setUserReviews}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
