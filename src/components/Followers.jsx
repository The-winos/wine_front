//list of users following you - w/links to their profiles
import React, {useState, useEffect} from "react";
import { getReviewsByFollowers } from "./API";

const Followers = () => {
  const [reviewFollowers, setReviewFollowers]=useState([]);
  const [revFollInfo, setRevFollInfo]= useState([]);

  // useEffect(()=>{
  //   async function fetchFollowerRev(){
  //     const followerReview= await getReviewsByFollowers()    }
  // })

  return <div id="followers"> I am followers</div>;
};

export default Followers;
