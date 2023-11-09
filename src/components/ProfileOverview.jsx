import React, { useState } from "react";
import ProfileReviews from "./ProfileReviews";
import { useNavigate } from "react-router-dom";

const ProfileOverview = ({ user }) => {
  const [expandedBio, setExpandedBio] = useState(false);
  const navigate = useNavigate();

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
            <p className="reviews-header">My Reviews</p>
            <div className="profile-overview-reviews">
              <ProfileReviews user={user} />
            </div>
          </div>
        </div>
        <div className="profile-overview-right-container">
          <div className="top-right container-box">
            Insert User Graph/Basic Statistics
          </div>
          <div className="bottom-right container-box">
            Place two most popularly rated favorites among users
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
