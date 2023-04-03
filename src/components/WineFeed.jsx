import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAllReviews, getAllWine } from "./API";
import ReviewDetails from "./ReviewDetails";
import WineDetails from "./WineDetails";


const WineFeed = ({ user, setAllReviews, allReviews, setReviewInfo, reviewInfo}) => {
  const navigate=useNavigate()

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
<button onClick={()=>{
        navigate("/review");
      }} className="btn btn-primary"> Add a review!</button>
<div id="reviews" className="review">
  {allReviews && allReviews.length ? allReviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date)).map((review)=>{
    return(
      <div key={`allreviews-${review.id}`}>
        <ReviewDetails
        user={user}
        review={review}
        setReviewInfo={setReviewInfo}
        />
      </div>
    )
  }):null}
</div>

  </div>);
};

export default WineFeed;
