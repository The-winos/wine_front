//list of users following you - w/links to their profiles
import React, {useState, useEffect} from "react";
import { getReviewsByFollowers } from "./API";

const Followers = ({user}) => {
  const [reviewFollowers, setReviewFollowers]=useState([]);
  const [revFollInfo, setRevFollInfo]= useState([]);

  useEffect(()=>{
    async function fetchFollowerRev(){
      const followerReview= await getReviewsByFollowers(user.id);

      console.log(followerReview, "here?")
      } if (user) {
        fetchFollowerRev();
      }
    }, [user]);

  return <div id="followers"> I am followers</div>;
};

export default Followers;
