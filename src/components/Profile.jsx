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
          <div id="profile-main" className="d-flex align-items-center">
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
            <div className="ms-4">
              <h2 className="profile-username">{user.name}</h2>
              <h6 className="profile-username">
                <span className="me-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-geo-alt"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 1a4 4 0 0 1 4 4c0 2.77-2.7 5.935-4 7.745C4.7 11.935 2 8.77 2 5a4 4 0 0 1 4-4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M8 9a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1H8v-2.5A.5.5 0 0 1 8 9z"
                    />
                  </svg>
                </span>
                {user.state}
              </h6>
              <h4>Followers {user.follower_count}</h4>
              {console.log(user)}
            </div>
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
