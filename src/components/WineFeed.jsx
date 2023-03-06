import React, {useEffect} from "react";
import { getAllReviews, getAllWine } from "./API";
import ReviewDetails from "./ReviewDetails";
import WineDetails from "./WineDetails";


const WineFeed = ({ setAllReviews, allReviews, setReviewInfo, reviewInfo}) => {

  useEffect(()=>{
  async function fetchAllReview(){
    const allTheReviews = await getAllReviews();
    console.log(allTheReviews)
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
