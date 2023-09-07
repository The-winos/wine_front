import React from "react";
import UserReviewDetails from "./UserReviewDetails";
import UserData from "./UserData";

const ProfileReviews = ({user, userReviews, setUserReviews}) => {

  return (
    <>
    <div className="review-card" >
  <div className="header-container text-center mb-3 p-1">
    <h2 className="profile-username">{user.username}'s Reviews</h2>
  </div>
  {userReviews && userReviews.length ? (
    <div className="row pr-0 pl-0">
      {userReviews.map((userReview) => (
        <div
          key={`userReview-${userReview.id}`}
          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
        >
          <div className="review-card">
            <UserReviewDetails
              userReviews={userReview}
              setUserReviews={setUserReviews}
            />
            <UserData user={user} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center">No reviews available.</div>
  )}
  </div>
</>
  )
};

export default ProfileReviews;
