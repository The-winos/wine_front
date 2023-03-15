import React, {useEffect, useState} from "react";
import { getFollowersById } from "./API";
import Button from 'react-bootstrap/Button';

const FollowButton = ({review, reviewUser, reviewWine, user}) => {

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function fetchAmIFollowing() {

      const isAlreadyFollowing = await getFollowersById(user.id);

      const isFollowing = Array.isArray(isAlreadyFollowing) && isAlreadyFollowing.some(follower =>
        follower.follower_id === review.user_id);
      setIsFollowing(isFollowing);
    }
    fetchAmIFollowing();
  }, [reviewUser.id, user.id]);

  async function handleFollow() {

    console.log(isFollowing, "whats this look like??")




  }

  return (
  <div id="followButton">
      {!isFollowing && user.id!=review.user_id && (
        <Button variant="outline-primary" size="sm" onClick={handleFollow} className="btn-follow">
          Follow
        </Button>
      )}
  </div>);

}

export default FollowButton;
