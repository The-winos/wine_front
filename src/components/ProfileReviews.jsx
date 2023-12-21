import React, { useState, useEffect } from "react";
import UserReviewDetails from "./UserReviewDetails";
import UserData from "./UserData";
import { Link } from "react-router-dom";
import ReviewDetails from "./ReviewDetails";
import { getFavorites, getSaved } from "./API";

const ProfileReviews = ({ user, userReviews, setUserReviews }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [seeAllReviewsLink, setSeeAllReviewsLink] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [saved, setSaved] = useState([]);

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
  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user) {
        try {
          const fetchedFavorites = await getFavorites(user.id);
          setFavorites(fetchedFavorites);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserFavorites();
  }, [user]);

  useEffect(() => {
    const fetchUserSaved = async () => {
      if (user) {
        try {
          const fetchedSaved = await getSaved(user.id);
          setSaved(fetchedSaved);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserSaved();
  }, [user]);

  return (
    <>
      <div className="profileReviews">

        <h2 className="profile-username">{user.username}'s Reviews</h2>

        <div className="review pb-5 mt-5">
          {userReviews && userReviews.length ? (
            <div>
              {userReviews.map((userReview) => (
                <>
                  <ReviewDetails
                    user={user}
                    review={userReview}
                    setReviewInfo={setUserReviews}
                    favorites={favorites}
                    saved={saved}
                  />
                  <UserData user={user} />
                </>
              ))}
            </div>
          ) : (
            <div className="text-center">No reviews available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileReviews;
