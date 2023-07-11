import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import { getReviewByUser } from "./API";
import UserReviewDetails from "./UserReviewDetails";
import Rating from "react-rating-stars-component";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

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

  return (
    <>
      {update ? (
        <AccountSettings
          user={user}
          userReviews={userReviews}
          setUserReviews={setUserReviews}
        />
      ) : (
        <div className="profile-container">
          <div id="profile-main">
            <img
              src={`/images/${user.avatar}`}
              alt="avatar image"
              className="img-fluid"
              style={{
                height: "200px",
                width: "200px",
                objectFit: "contain",
                objectPosition: "center center",
              }}
            />
            <h2 className="profile-username m-4">{user.name}</h2>
            <div>
              <Link to={"/accountsettings"}>
                <button
                  type="accountsettings"
                  className="btn btn-primary pb-2 mx-2"
                >
                  Account Settings
                </button>
              </Link>
              <Link to={"/favorites"}>
                <button type="favorite" className="btn btn-primary pb-2 mx-2">
                  Favorites
                </button>
              </Link>
              <Link to={"/favorites"}>
                <button type="saved" className="btn btn-primary pb-2 mx-2">
                  Saved
                </button>
              </Link>
            </div>
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
          <div className="row justify-content-center">
            {userReviews && userReviews.length ? (
              userReviews.map((userReview) => {
                return (
                  <div
                    key={`userReview-${userReview.id}`}
                    className="col-md-6 mb-4"
                  >
                    <div className="card">
                      <div className="card-body">
                        <UserReviewDetails
                          user={user}
                          userReviews={userReview}
                          setUserReviews={setUserReviews}
                          RatingComponent={Rating}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
