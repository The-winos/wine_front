import React, {useEffect} from "react";
import { getAllReviews, getAllWine } from "./API";
import ReviewDetails from "./ReviewDetails";
import WineDetails from "./WineDetails";


const WineFeed = ({allWine, setAllWine, setWineInfo, wineInfo, setAllReviews, allReviews, setReviewInfo, reviewInfo}) => {

  useEffect(()=>{
  async function fetchAllReview(){
    const allTheReviews = await getAllReviews();
    console.log(allTheReviews)
    setAllReviews(allTheReviews);
  }
  fetchAllReview();
}, []);

  return (
  <div id="winFeed">
<h2 id="tastingRoom">Welcome to the Tasting Room</h2>
<h3 id="tastingRoomInfo">See all the wine people have reviewed</h3>
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
