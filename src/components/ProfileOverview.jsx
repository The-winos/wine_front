import React, { useState, useEffect } from "react";
import { getFavorites, getReviewByUser, getUserById, getWineById } from "./API";
import ProfileReviews from "./ProfileReviews";
import UserData from "./UserData";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "react-rating-stars-component";
import { faV } from "@fortawesome/free-solid-svg-icons";

const ProfileOverview = ({
  user,
  userReviews,
  setUserReviews,
  currentUser,
  favorites,

}) => {
  const [expandedBio, setExpandedBio] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [latestReview, setLatestReview] = useState({});
  const [latestWine, setLatestWine] = useState({});
  const [fav, setFav]=useState({})
  const [latestFav, setLatestFav]=useState({})
  const [favWine, setFavWine]= useState({})

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        // Check if user is available
        if (user && user.id) {
          const reviews = await getReviewByUser(user.id);
          const fav = await getFavorites(user.id);

          if (reviews && reviews.length > 0) {
            // Sort reviews by date
            const sortedReviews = [...reviews].sort(
              (a, b) => new Date(b.review_date) - new Date(a.review_date)
            );

            setUserReviews(sortedReviews);

            // Set latest review and wine if reviews are available
            setLatestReview(sortedReviews[0]);

            try {
              const newWine = await getWineById(sortedReviews[0].wine_id);
              setLatestWine(newWine);
            } catch (error) {
              console.error(error);
            }
          } else {
            setUserReviews([]); // Set an empty array if there are no reviews
            setLatestReview(null);
            setLatestWine(null);
          }

          if (fav && fav.length > 0) {
            // Sort reviews by date
            const sortedFavs = [...fav].sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

            setFav(sortedFavs);

            // Set latest review and wine if reviews are available
            setLatestFav(sortedFavs[0]);

            try {
              const newFav = await getWineById(sortedFavs[0].wine_id);
              setFavWine(newFav);
            } catch (error) {
              console.error(error);
            }
          } else {
            setFav([]); // Set an empty array if there are no favorites
            setLatestFav(null);
            setFavWine(null);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserReviews();
  }, [user]);




  const handleCreateBio = () => {
    if (user) {
      navigate("/accountsettings");
    }
  };

  return (
    <div className="profileOverview">
      <div className="profile-overview-container">

        <div className="d-none d-md-block">
        <div className="row">
      <div className="col-md-6">
        <div className="profile-overview-left-container">

          {user ? (
            <>
              <div className="top-left container-box">
                {user.bio ? (
                  user.bio.length > 400 ? (
                    <div className="user-bio-container">
                      <h6
                        className={`thought-bubble ${
                          expandedBio ? "expanded" : ""
                        }`}
                      >
                        {expandedBio ? (
                          <h6>{user.bio}</h6>
                        ) : (
                          user.bio.substring(0, 400)
                        )}
                        {!expandedBio && (
                          <span
                            onClick={() => setExpandedBio(true)}
                            className="read-more"
                          >
                            <small>... (read more)</small>
                          </span>
                        )}
                        {expandedBio && (
                          <span
                            onClick={() => setExpandedBio(false)}
                            className="read-less"
                          >
                            <small>(read less)</small>
                          </span>
                        )}
                      </h6>
                    </div>
                  ) : (
                    <h6>{user.bio}</h6>
                  )
                ) : (
                  <div className="user-bio-container">
                    <h5 className="thought-bubble">
                      No bio has been created yet
                    </h5>
                    {user && currentUser ? (
                      <>
                        {user.id === currentUser.id ? (
                          <button onClick={handleCreateBio}>Create Bio</button>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              <div className="bottom-left container-box">
  <p className="reviews-header"></p>
  <div className="profile-overview-reviews">
    <div className="text-center">
      <h6 className="profile-review-list mx-auto">
        {user.username}'s most current review
      </h6>
      {latestReview && latestWine ? (
        <>
          <div className="underline"></div>
          <div
  className="d-flex align-items-center justify-content-between clickable-content"
  onClick={() => navigate(`/singlewine/${latestWine.id}`)}
  style={{ cursor: 'pointer' }}
>
  <div>
    <div className="d-flex align-items-center">
      <p className="wine-name">{latestWine.name}</p>
      {latestReview.rating != null ? (
      <Rating
        value={latestReview.rating}
        edit={false}
        size={20}
        activeColor="#ffd700"
      />
      ):null}
    </div>
    <p className="review-comment">{latestReview.review_comment}</p>
  </div>
</div>


        </>
      ) : null}
    </div>
    {/* <ProfileReviews user={user} userReviews={{ userReviews }} /> */}
  </div>
</div>

            </>
          ) : (
            <h5>Loading profile</h5>
          )}
        </div>
        </div>
        <div className="col-md-6">
        <div className="profile-overview-right-container">
          <div className="top-right container-box">
          <div className="text-center">
      <h6 className="profile-review-list mx-auto">
        What Types of Wine I Review
      </h6>
      </div>

            <UserData userReviews={userReviews} />
          </div>
          <div className="bottom-right container-box">
            {user ? (<div className="text-center">
            <h6 className="profile-review-list mx-auto">{user.username}'s latest favorite
      </h6>
      {latestFav && favWine ? (
        <>

        <div className="underline"></div>
        <div
  className="d-flex align-items-center justify-content-between clickable-content"
  onClick={() => navigate(`/singlewine/${favWine.id}`)}
  style={{ cursor: 'pointer' }}
>
  <div>
    <div className="d-flex align-items-center">
      <p className="wine-name">{favWine.name}</p>
      {favWine.rating != null ? (
      <Rating
        value={favWine.rating}
        edit={false}
        size={20}
        activeColor="#ffd700"
      />
      ):null}
    </div>

  </div>
</div>

        </>
      ) : null}
      </div>
      ) : <p>Loading...</p>}
          </div>
        </div>
        </div>
      </div>

      </div>
      </div>


    </div>
  );
};

export default ProfileOverview;
