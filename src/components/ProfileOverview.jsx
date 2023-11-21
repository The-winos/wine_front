import React, { useState, useEffect } from "react";
import { getReviewByUser, getUserById } from "./API";
import ProfileReviews from "./ProfileReviews";
import UserData from "./UserData";
import { useNavigate, useParams } from "react-router-dom";

const ProfileOverview = ({ user, userReviews, setUserReviews }) => {
  const [expandedBio, setExpandedBio] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [userProfile, setUserProfile] = useState({});

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

  const handleCreateBio = () => {
    navigate("/accountsettings");
  };

  return (
    <div className="profileOverview">
      <div className="profile-overview-container">
        <div className="profile-overview-left-container">
          <div className="top-left container-box">
            <div></div>
            {user.bio ? (
              <div className="user-bio-container">
                <h6
                  className={`thought-bubble ${expandedBio ? "expanded" : ""}`}
                >
                  {expandedBio ? user.bio : user.bio.substring(0, 150)}
                  {!expandedBio && (
                    <span
                      onClick={() => setExpandedBio(true)}
                      className="read-more"
                    >
                      <small>... (read more)</small>
                    </span>
                  )}
                  {expandedBio && (
                    <span
                      onClick={() => setExpandedBio(false)}
                      className="read-less"
                    >
                      <small>(read less)</small>
                    </span>
                  )}
                </h6>
              </div>
            ) : (
              <div className="user-bio-container">
                <h5 className="thought-bubble">No bio available.</h5>

                <button onClick={handleCreateBio}>Create Bio</button>
              </div>
            )}
          </div>

          <div className="bottom-left container-box">
            <p>
              Separate user.reviews to render top (stylized) add link to see all
              (listed)
            </p>
            <p className="reviews-header"></p>
            <div className="profile-overview-reviews">
              <div className="text-center">
                <h3 className="profile-review-list mx-auto">
                  {user.username}'s Reviews
                </h3>

                {userReviews && userReviews.length
                  ? userReviews.map((userReviews) => {
                      return (
                        <div key={`useridReview-${userReviews[0].id}`}>
                          <UserReviewDetails
                            userReviews={userReviews[0]}
                            setUserReviews={() => {}}
                          />
                        </div>
                      );
                    })
                  : null}
              </div>
              {/* <ProfileReviews user={user} userReviews={{ userReviews }} /> */}
            </div>
          </div>
        </div>
        <div className="profile-overview-right-container">
          <div className="top-right container-box">
            Insert User Graph/Basic Statistics
            <UserData userReviews={userReviews} />
          </div>
          <div className="bottom-right container-box">
            Place most popularly rated favorites and saved wine
            {/* <FavoritesUSerId /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
