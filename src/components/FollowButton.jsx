import React, {useState} from "react";
import { getFollowersById } from "./API";

const FollowButton = ({review, reviewUser, reviewWine, user}) => {

  const [isFollowing, setIsFollowing] = useState(false);

 async function handleFollow() {
    // Check if the current user is already following the wine friend
    const isAlreadyFollowing = await getFollowersById(user.id)
    console.log(user.id, "is this a 2?")
    console.log(isAlreadyFollowing, "whats this look like??")
    if (isAlreadyFollowing) {
      setIsFollowing(true);
      return;
    }}
  return <div id="followButton"></div>;

}

export default FollowButton;
