//list of users following you - w/links to their profiles
import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { getReviewsByFollowers } from "./API";
import FriendReview from "./FriendReview";

const Followers = ({user}) => {
  const [reviewFollowers, setReviewFollowers]=useState([]);
  const [revFollInfo, setRevFollInfo]= useState([]);

  useEffect(()=>{
    async function fetchFollowerRev(){
      const followerReview= await getReviewsByFollowers(user.id);
      setReviewFollowers(followerReview);

      console.log(followerReview, "here?")
      } if (user) {
        fetchFollowerRev();
      }
    }, [user]);

  return (
    <div id="friendFeed">
      <h2 className="FriendRev">Welcome to Happy Hour with friends!</h2>
      <h3 className="FriendRev">See all your friends favorite-or not so favorite- wines!</h3>
      <div id="freview" className="frev">
        {user && reviewFollowers.length ?
        reviewFollowers.map((reviews)=>{
          return(
            <div key={`followerReview-${reviews.id}`}>
              <FriendReview
                reviews={reviews}
                setRevFollInfo={setRevFollInfo}
                user={user}
              />
          </div>
          );
        }):<>(<h2>You aren't following anyone yet. Find some friends to follow!</h2>
        <NavLink className="btn btn-primary" to="/winefeed">The Tasting Room</NavLink>)
        </>}

      </div>
    </div>
  )
};

export default Followers;
