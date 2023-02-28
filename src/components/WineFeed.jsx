import React, {useEffect} from "react";
import { getAllReviews, getAllWine } from "./API";
import WineDetails from "./WineDetails";


const WineFeed = ({allWine, setAllWine, setWineInfo, wineInfo, setAllReviews, allReviews}) => {

  useEffect(()=>{
  async function fetchAllReview(){
    const allTheReviews = await getAllReviews();
    console.log(allTheReviews)
    setAllReviews(allTheReviews);
  }
  fetchAllReview();
}, []);

  return <div id="winFeed"></div>;
};

export default WineFeed;
