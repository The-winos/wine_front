import React, { useEffect, useState } from "react";
import { getReviewByUser, getUserById } from "./API";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserReviewDetails from "./UserReviewDetails";
import UserIdReviewDetails from "./UserIdReviewDetails";

const ProfileUserId = ({ user }) => {
  const { id } = useParams();
  const [userReviews, setUserReviews] = useState([]);
  const [userProfile, setUserProfile]= useState({})

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const reviews = await getReviewByUser(id);
        setUserReviews(reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserReviews();
  }, []);

  useEffect(()=>{
    async function fetchGetUserById(){
      const theUser= await getUserById(id)
      console.log(theUser)
      setUserProfile(theUser);
}
fetchGetUserById();
  }, []);

  return (
    <div className="profile-container">
      <div id="profile-main">
        <img
          src={userProfile.avatar}
          alt="avatar image"
          className="img-fluid"
          style={{
            height: "200px",
            width: "200px",
            objectFit: "contain",
            objectPosition: "center center",
          }}
        />
        <div>
          <Link to={"/favorite"}>
            <button type="favorite" className="buttons">
              Favorites
            </button>
          </Link>
        </div>
        <h2 className="profile-username">{userProfile.name}</h2>
        <h2 className="profile-username">I follow {userProfile.following_count} people</h2>
        <h2 className="profile-username">{userProfile.follower_count} people follow me!</h2>
      </div>

      <div>
        <h3 className="profile-review-list">{userProfile.username}'s Reviews</h3>

        {userReviews && userReviews.length ? (
          userReviews.map((userReviews) => {
            return (
              <div key={`useridReview-${userReviews.id}`}>
          <UserIdReviewDetails
            userReviews={userReviews}
            setUserReviews={setUserReviews}
            userProfile={userProfile}
          />
        </div>
            )})): null}
      </div>
    </div>
  );
};

export default ProfileUserId;
