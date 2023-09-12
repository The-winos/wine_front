import React from "react";

const ProfileOverview = ({ user }) => {
  return (
    <div className="profileOverview">
      <div className="profile-overview-container">
        <div className="profile-overview-left-container">
          <div className="top-left container-box"></div>
          <div className="bottom-left container-box"></div>
        </div>
        <div className="profile-overview-right-container">
          <div className="top-right container-box"></div>
          <div className="bottom-right container-box"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
