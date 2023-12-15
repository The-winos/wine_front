import React, { useEffect, useState } from "react";
import { getReviewByUser, getUserById } from "./API";
import { Link, useParams } from "react-router-dom";
import UserReviewDetails from "./UserReviewDetails";
import UserIdReviewDetails from "./UserIdReviewDetails";
import FollowButton from "./FollowButton";
import ProfileOverview from "./ProfileOverview";
import ProfileAccountSettings from "./ProfileAccountSettings";
import Favorites from "./Favorites";
import ProfileReviews from "./ProfileReviews";

const ProfileUserId = ({user}) => {
  const { id } = useParams();
  const [userReviews, setUserReviews] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [linkClicked, setLinkClicked] = useState(false);
  const [profileReview, setProfileReview] = useState(false);
  const [profileAccountSettings, setProfileAccountSettings] = useState(false);
  const [profileFavorites, setProfileFavorites] = useState(false);
  const [profileOverview, setProfileOverview] = useState(true);


  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviews = await getReviewByUser(id);
        setUserReviews(reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserReviews();
  }, []);

  useEffect(() => {
    async function fetchGetUserById() {
      const theUser = await getUserById(id);
      console.log(theUser);
      setUserProfile(theUser);
    }
    fetchGetUserById();
  }, []);

  return (<>
    <div className="d-flex flex-wrap">
      {console.log(user, "user")}
      <div className="profile-container">
        {/* User Information Container */}
        <div className="user-info-container">
          <div className="profileAvatar">
            <img
              src={`/images/${userProfile.avatar}`}
              alt="avatar image"
              className="img-fluid"
              style={{
                height: "125px",
                width: "125px",
              }}
            />
          </div>


          <div className="d-flex flex-column">
            <h2 className="profile-username">{userProfile.name}</h2>

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
                {userProfile.state}
              </span>
            </h6>
            <div className="count-container">
              <h6>
                I follow{" "}
                <Link to="/following" className="count-link">
                  <span
                    className="count-text"
                    data-heading={userProfile.following_count}
                  >
                    {userProfile.following_count}
                  </span>
                </Link>
                {userProfile.following_count <= 1 ? "person" : "people"}
              </h6>
              <h6>
                <Link to="/followers" className="count-link">
                  <span
                    className="count-text"
                    data-heading={userProfile.follower_count}
                  >
                    {userProfile.follower_count}
                  </span>
                </Link>
                {userProfile.follower_count <= 1
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
              setProfileAccountSettings(false) &
              setProfileFavorites(false) &
              setLinkClicked(true)
              ;
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
                setProfileReview(false) &
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
      </div>{console.log(user, "in wine feed")}
      <div className="profileElements">
        <div>
          {" "}
          {profileOverview ? <ProfileOverview user={userProfile} currentUser={user}/> : null}
          {profileReview ? (
            <ProfileReviews
            user={userProfile}
            currentUser={user}
              userReviews={userReviews}
              setUserReviews={setUserReviews}
            />
          ) : null}

        </div>
        <div> {profileReview ? <Favorites user={userProfile} currentUser={user}/> : null}</div>

      </div>
    </div>
  </>
);
};

export default ProfileUserId;
