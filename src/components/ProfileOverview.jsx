import React, { useState, useEffect } from "react";
import { getReviewByUser, getUserById } from "./API";
import ProfileReviews from "./ProfileReviews";
import UserData from "./UserData";
import { useNavigate, useParams } from "react-router-dom";

const ProfileOverview = ({
  user,
  userReviews,
  setUserReviews,
  currentUser,
}) => {
  const [expandedBio, setExpandedBio] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();



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



  const handleCreateBio = () => {
    navigate("/accountsettings");
  };

  return (
    <div className="profileOverview">
      <div className="profile-overview-container">
        <div className="profile-overview-left-container">{user ? (<>
          <div className="top-left container-box">

            {user.bio ? (
              user.bio.length > 400 ? (
                <div className="user-bio-container">
                  <h6
                    className={`thought-bubble ${
                      expandedBio ? "expanded" : ""
                    }`}
                  >
                    {expandedBio ? (
                      <h6>{user.bio}</h6>
                    ) : (
                      user.bio.substring(0, 400)
                    )}
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
                <h6>{user.bio}</h6>
              )
            ) : (
              <div className="user-bio-container">
                <h5 className="thought-bubble">No bio has been created yet</h5>
              {user && currentUser ? (
                  <>
                  {user.id=== currentUser.id ? (
                  <button onClick={handleCreateBio}>Create Bio</button>
                  ): null}
</>
                ): null}
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
                  ? (console.log(userReviews, "review"))
                  : null}
              </div>
              {/* <ProfileReviews user={user} userReviews={{ userReviews }} /> */}
            </div>
          </div>
          </>) : <h5>Loading profile</h5>} this one
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
