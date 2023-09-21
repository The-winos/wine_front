import React, { useEffect, useState } from "react";
import { getFollowersById, updateFollower } from "./API";
import Button from 'react-bootstrap/Button';

const FollowButton = ({ review, reviewUser, user }) => {

  const [isFollowing, setIsFollowing] = useState(false);
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    async function fetchAmIFollowing() {
      const isAlreadyFollowing = await getFollowersById(user.id);
      const followingIds = Array.isArray(isAlreadyFollowing) && isAlreadyFollowing.map(follower => follower.follower_id);
      setFollowing(followingIds);
      const isFollowing = Array.isArray(isAlreadyFollowing) && isAlreadyFollowing.some(follower => follower.follower_id === review.user_id);
      setIsFollowing(isFollowing);
    }
    fetchAmIFollowing();
  }, [reviewUser.id, user.id]);

  async function handleFollow() {
    try {

      const updatedFollow = await updateFollower(user.id, review.user_id);
      const followingIds = following && following.map(follower => follower.follower_id);
      setFollowing(followingIds);
      setIsFollowing(prevState => !prevState);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div id="followButton">
      {!isFollowing && user.id !== review.user_id && (
        <Button variant="outline-primary" size="sm" onClick={handleFollow} className="btn-follow">
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowButton;
