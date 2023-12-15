import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewByUser, getFollowersById, getFollowingById } from "./API";
import ProfileReviews from "./ProfileReviews";
import ProfileOverview from "./ProfileOverview";
import Favorites from "./Favorites";
import ProfileAccountSettings from "./ProfileAccountSettings";

const Profile = ({ user }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [followerAvatars, setFollowerAvatars] = useState([]);
  const [followingAvatars, setFollowingAvatars] = useState([]);
  const [userLocation, setUserLocation] = useState("");
  const [profileReview, setProfileReview] = useState(false);
  const [profileAccountSettings, setProfileAccountSettings] = useState(false);
  const [profileFavorites, setProfileFavorites] = useState(false);
  const [profileOverview, setProfileOverview] = useState(true);
  const [linkClicked, setLinkClicked] = useState(false);

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
        reviews.sort((a, b) => {
          const dateA = new Date(a.review_date);
          const dateB = new Date(b.review_date);

          return dateB - dateA;
        });

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

  // Function to handle the gear icon click
  const handleGearIconClick = () => {
    // Add your desired action here, e.g., open account settings
    setProfileAccountSettings(true);

    const gearImage = document.querySelector(".gear-image");
    if (gearImage) {
      gearImage.classList.add("spin-once");
      setTimeout(() => {
        gearImage.classList.remove("spin-once");
      }, 500); // Adjust the time for the desired animation speed
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap">
        <div className="profile-container">
          {user ? (<>
          {/* User Information Container */}
          <div className="user-info-container">
            <div className="profileAvatar">

              <img
                src={`/images/${user.avatar}`}
                alt="avatar image"
                className="img-fluid"
                style={{
                  height: "125px",
                  width: "125px",
                }}
              />
            </div>
            <div className="gear-container">
              <img
                src="/images/gear1.png"
                alt="Gear-1"
                className="gear-image"
                style={{
                  height: "85px",
                  width: "85px",
                }}
                onClick={() => {
                  setProfileAccountSettings(true) & setProfileOverview(false);
                  setProfileReview(false);
                  {
                    handleGearIconClick();
                  }
                }}
              />
              <div className="gear-text">Account Settings</div>
            </div>

            <div className="d-flex flex-column">
              <h2 className="profile-username">{user.name}</h2>
              {/* <div className="user-details"> */}
              {/* Other user information */}
              <h6 className="profile-username smaller-text">
                <span>
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
                <span className="user-location smaller-text">
                  {userLocation}
                </span>
              </h6>
              <div className="count-container">
                <h6>
                  I follow{" "}
                  <Link to="/following" className="count-link">
                    <span
                      className="count-text"
                      data-heading={user.following_count}
                    >
                      {user.following_count}
                    </span>
                  </Link>
                  {user.following_count <= 1 ? "person" : "people"}
                </h6>
                <h6>
                  <Link to="/followers" className="count-link">
                    <span
                      className="count-text"
                      data-heading={user.follower_count}
                    >
                      {user.follower_count}
                    </span>
                  </Link>
                  {user.follower_count <= 1
                    ? "person follows me"
                    : "people follow me!"}
                </h6>
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="profileLinks">
            <div
              onClick={() => {
                setProfileOverview(true) &
                setProfileReview(false) &
                setProfileFavorites(false) &
                setProfileAccountSettings(false) &
                setLinkClicked(true);
              }}
            >
              Overview
            </div>
            <div
              className="profile-review-sidebar"
              onClick={() => {
                setProfileReview(true) &
                  setProfileOverview(false) &
                  setProfileAccountSettings(false) &
                  setProfileFavorites(false) &
                  setLinkClicked(true);
              }}
              style={{
                textDecoration: linkClicked ? "underline" : "none",
                color: linkClicked ? "#721c24" : "#007bff",
              }}
            >
              Reviews
            </div>
            <div
              className="profile-favorites-sidebar"
              onClick={() => {
                setProfileFavorites(true) &
                  setProfileOverview(false) &
                  setProfileAccountSettings(false) &
                  setProfileReview(false) &
                  setLinkClicked(true);
              }}
              style={{
                textDecoration: linkClicked ? "underline" : "none",
                color: linkClicked ? "#721c24" : "#007bff",
              }}
            >
              Favorites
            </div>
          </div>
          </>) : (<h5>Loading profile</h5>)}
        </div>
        <div className="profileElements">
          <div>
            {" "}
            {profileOverview ? <ProfileOverview user={user} currentUser={user}/> : null}
            {profileReview ? (
              <ProfileReviews
                user={user}
                currentUser={user}
                userReviews={userReviews}
                setUserReviews={setUserReviews}
              />
            ) : null}
            {profileAccountSettings ? (
              <ProfileAccountSettings
                user={user}
                setProfileReview={setProfileReview}
                setProfileOverview={setProfileOverview}
                setProfileAccountSettings={setProfileAccountSettings}
              />
            ) : null}
          </div>
          <div> {profileFavorites ? <Favorites user={user} currentUser={user} /> : null}</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
