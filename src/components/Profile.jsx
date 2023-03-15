//show user badges, number of posts, follower and following count

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getReviewByUser, getAllReviews } from "./API";

const Profile = (user, allReviews, setAllReviews, loggedIn, setLoggedIn) => {
  // const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   async function fetchReviews() {
  //     const allReviews = await getAllReviews();
  //     setReviews(allReviews);
  //   }
  //   fetchReviews();
  // }, []);

  // useEffect(() => {
  //   async function fetchUserReviews() {
  //     const userReviews = await getReviewByUser();
  //     console.log(userReviews);
  //     setReviews(userReviews);
  //   }
  //   fetchUserReviews();
  // }, []);

  return (
    <div className="profile-container">
      <div id="profile-main">
        <setLoggedIn user={user} />
      </div>

      <div>
        <Link to={"/accountsettings"}>
          <button type="accountsettings" className="buttons">
            Account Settings
          </button>
        </Link>

        <Link to={"/favorite"}>
          <button type="favorite" className="buttons">
            Favorites
          </button>
        </Link>

        {user && user.admin ? (
          <>
            <Link to={"/users"}>
              <button type="all users" className="buttons">
                All Users
              </button>
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
