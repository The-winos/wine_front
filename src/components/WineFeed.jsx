import React, {useEffect} from "react";
import { getAllReviews, getAllWine } from "./API";
import ReviewDetails from "./ReviewDetails";
import WineDetails from "./WineDetails";


const WineFeed = ({ user, setAllReviews, allReviews, setReviewInfo, reviewInfo}) => {

  useEffect(()=>{
  async function fetchAllReview(){
    const allTheReviews = await getAllReviews();
    setAllReviews(allTheReviews);
  }
  fetchAllReview();
}, []);

  return (
  <div id="wineFeed">
<h2 className="tastingRoom">Welcome to the Tasting Room</h2>
<h3 className="tastingRoom">See all the wines people have reviewed</h3>
<div id="reviews" className="review">
  {allReviews && allReviews.length ? allReviews.map((review)=>{
    return(
      <div key={`allreviews-${review.id}`}>
        <ReviewDetails
        user={user}
        review={review}
        setReviewInfo={setReviewInfo}
        />
      </div>
    );
  }):null}
</div>

  </div>);
};

export default WineFeed;
