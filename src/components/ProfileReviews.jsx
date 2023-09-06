import React from "react";
import UserReviewDetails from "./UserReviewDetails";
import UserData from "./UserData";

const ProfileReviews = ({user, userReviews, setUserReviews}) => {
  return (
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
</div>)
};

export default ProfileReviews;
