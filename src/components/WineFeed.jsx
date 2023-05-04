import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReviews, getAllWine } from "./API";
import ReviewDetails from "./ReviewDetails";
import WineDetails from "./WineDetails";

const WineFeed = ({
  user,
  setAllReviews,
  allReviews,
  setReviewInfo,
  reviewInfo,
}) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    async function fetchAllReview() {
      const allTheReviews = await getAllReviews();
      setAllReviews(allTheReviews);
    }
    fetchAllReview();
  }, []);

  return (
    <div id="wineFeed">
      <h2 className="tastingRoom">Welcome to the Tasting Room</h2>
      <h3 className="tastingRoom">See all the wines people have reviewed</h3>

      <div className="d-flex justify-content-center p-2">
        {searchOpen ? (
          <>

            <button
              onClick={() => {
                setSearchOpen(false);
              }}
              className="btn btn-primary pb-2"
            >
              Close Search
            </button>
          </>
        ) : (
          <>
            <div className="mx-2">
              <button
                onClick={() => {
                  setSearchOpen(true);
                }}
                className="btn btn-primary"
              >
                Search Reviews
              </button>
            </div>
            <div className="mx-2">
              <button
                onClick={() => {
                  navigate("/review");
                }}
                className="btn btn-primary"
              >

                Add a review!
              </button>
            </div>
          </>
        )}
      </div>
      <div id="reviews" className="review">
        {allReviews && allReviews.length
          ? allReviews
              .sort((a, b) => new Date(b.review_date) - new Date(a.review_date))
              .map((review) => {
                return (
                  <div key={`allreviews-${review.id}`}>
                    <ReviewDetails
                      user={user}
                      review={review}
                      setReviewInfo={setReviewInfo}
                    />
                  </div>
                );
              })
          : null}
      </div>
    </div>
  );
};

export default WineFeed;
