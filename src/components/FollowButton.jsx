import React, {useState} from "react";
import { getFollowersById } from "./API";

const FollowButton = ({review, reviewUser, reviewWine, user}) => {

  const [isFollowing, setIsFollowing] = useState(false);

 async function handleFollow() {
    const isAlreadyFollowing = await getFollowersById(user.id)
    console.log(isAlreadyFollowing, "whats this look like??")
    if (isAlreadyFollowing) {
      setIsFollowing(true);
      return;
    }}
  return <div id="followButton"></div>;

}

export default FollowButton;
