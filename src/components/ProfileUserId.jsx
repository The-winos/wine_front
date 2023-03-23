import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewByUser } from "./API";
import UserReviewDetails from "./UserReviewDetails";

const ProfileUserId = ({ user }) => {
  const { id } = useParams();
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviews = await getReviewByUser(id);
        setUserReviews(reviews);
        console.log(reviews, "user reviews");
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserReviews();
  }, []);

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
        <h3 className="profile-review-list">Your Reviews</h3>

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

export default ProfileUserId;
