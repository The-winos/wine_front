import React from "react";

const ProfileOverview = ({ user }) => {
  return (
    <div className="profileOverview">
      <div className="profile-overview-container">
        <div className="profile-overview-left-container">
          <div className="top-left container-box">
            This is the Top-Left Container-Box
          </div>
          <div className="bottom-left container-box">
            This is the Bottom-Left Container-Box
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
