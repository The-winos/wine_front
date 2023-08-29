import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserData from "./UserData";
import UserReviewDetails from "./UserReviewDetails";
import { getReviewByUser, getFollowersById, getFollowingById } from "./API";

const Profile = ({ user }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [followerAvatars, setFollowerAvatars] = useState([]);
  const [followingAvatars, setFollowingAvatars] = useState([]);
  const [userLocation, setUserLocation] = useState("");

  const getUserLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const location = `${data.city}, ${data.region}`;
      setUserLocation(location);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersData = await getFollowersById(user.id);
        console.log("Followers Data:", followersData);
        if (Array.isArray(followersData)) {
          const followerAvatars = followersData.map(
            (follower) => follower.avatar
          );
          setFollowerAvatars(followerAvatars);
        } else {
          console.error("Followers data is not an array:", followersData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFollowers();
  }, [user]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const followingData = await getFollowingById(user.id);
        console.log("Following Data:", followingData);
        if (Array.isArray(followingData)) {
          const followingAvatars = followingData.map((follow) => follow.avatar);
          setFollowingAvatars(followingAvatars);
        } else {
          console.error("Following data is not an array:", followingData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFollowing();
  }, [user]);

  return (
    <div className="profile-container">
      {/* User Information Container */}
      <div className="user-info-container">
        <img
          src={`/images/${user.avatar}`}
          alt="avatar image"
          className="img-fluid"
          style={{
            height: "200px",
            width: "200px",
          }}
        />
        <div>
          <h2 className="profile-username">{user.name}</h2>
          <div className="user-details">
            {/* Other user information */}
            <h6 className="profile-username me-3 smaller-text">
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
              <span className="user-location smaller-text">{userLocation}</span>
            </h6>
            <div className="count-container">
              <h5 className="profile-username">
                I follow{" "}
                <div className="follow-count">
                  <Link to="/following" className="count-link">
                    <div
                      className="count-text"
                      data-heading={user.following_count}
                    >
                      {user.following_count}
                    </div>
                  </Link>
                </div>{" "}
                people
              </h5>
              <h5 className="profile-username">
                <Link to="/followers" className="count-link">
                  <span
                    className="follower-count-text"
                    data-heading={user.follower_count}
                  >
                    {user.follower_count}
                  </span>
                </Link>{" "}
                people follow me!
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* User Bio Container */}
      <div className="user-bio-container">
        <p className="thought-bubble">{user.bio}</p>
      </div>

      {/* User Reviews Container */}
      <div className="container-right">
        <div className="header-container text-center mb-3">
          <h2 className="profile-username">{user.username}'s Reviews</h2>
        </div>
        {userReviews && userReviews.length ? (
          <div className="row justify-content-center">
            {userReviews.map((userReview) => (
              <div
                key={`userReview-${userReview.id}`}
                className="col-md-6 mb-4"
              >
                <UserReviewDetails
                  userReviews={userReview}
                  setUserReviews={setUserReviews}
                />
                <UserData user={user} />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
