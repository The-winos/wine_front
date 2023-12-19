import React, { useState } from "react";
import UserReviewDetails from "./UserReviewDetails";
import UserData from "./UserData";
import { Link } from "react-router-dom";

const ProfileReviews = ({ user, userReviews, setUserReviews }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [seeAllReviewsLink, setSeeAllReviewsLink] = useState(false);

  // Function to handle selecting a note
  const handleNoteClick = (userReview) => {
    setSelectedNote(userReview.id);
  };

  // Function to handle deselecting a note
  const handleDeselectNote = () => {
    setSelectedNote(null);
  };

  // const firstUserReview =
  //   userReviews && userReviews.length ? userReviews[0] : null;

  return (
    <>
      <div className="review-card">

        <div
          className="header-container text-center mb-3 p-1"
          onClick={() => {
            seeAllReviewsLink(true);
          }}
        >
          <Link to="/reviewdetails" className="link-to-reviews">
            <h3 className="see-reviews-header">See all reviews</h3>
          </Link>

          <h2 className="profile-username">{user.username}'s Reviews</h2>
        </div>
        {userReviews && userReviews.length ? (
          <div className="row pr-0 pl-0">
            {userReviews.map((userReview) => (
              <div
                key={`userReview-${userReview.id}`}
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
              >
                <div
                  className={`review-card note ${
                    selectedNote === userReview.id ? "selected" : ""
                  }`}
                  onClick={() => handleNoteClick(userReview)}
                >
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
  );
};

export default ProfileReviews;
