import React, { useState } from "react";
import ProfileReviews from "./ProfileReviews";

const ProfileOverview = ({ user }) => {
  const [expandedBio, setExpandedBio] = useState(false);
  return (
    <div className="profileOverview">
      <div className="profile-overview-container">
        <div className="profile-overview-left-container">
          <div className="top-left container-box">
            <div>This is the Top-Left Container-Box</div>
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
              <h5 className="thought-bubble">No bio available.</h5>
            )}
          </div>
          <div className="bottom-left container-box">
            This is the Bottom-Left Container-Box
            <div className="profile-overview-reviews">
              <ProfileReviews user={user} />
            </div>
          </div>
        </div>
        <div className="profile-overview-right-container">
          <div className="top-right container-box">
            This is the Top-Right Container-Box
          </div>
          <div className="bottom-right container-box">
            This is the Bottom-Right Container-Box
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
