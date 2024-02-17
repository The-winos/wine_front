import React, { useState, useEffect, lazy, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { getReviewsByFollowers, getWineById, getUserById } from "./API";
import { useNavigate } from "react-router-dom";
import {
  handlePriceFilter,
  handleRatingFilter,
  handleSearch,
} from "./SearchBar";
const LazyFriendReview = lazy(() => import("./FriendReview"));

const Followers = ({ user, favorites, saved }) => {
  const [reviewFollowers, setReviewFollowers] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    searchName: "",
    searchRegion: "",
    searchType: "",
    searchUsername: "",
  });
  const [selectedRating, setSelectedRating] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      const followerReview = await getReviewsByFollowers(user.id);
      setReviewFollowers(followerReview);
    };

    if (user) {
      fetchReviews();
    }
  }, [user]);

  useEffect(() => {
    const applyFilters = async () => {
      let filteredResults = [...reviewFollowers];

      // Apply search filters
      for (const [key, value] of Object.entries(searchCriteria)) {
        if (value.trim() !== "") {
          filteredResults = filteredResults.filter((wine) =>
            wineFilter(wine, key, value)
          );
        }
      }

      // Apply rating filter
      if (selectedRating !== "all") {
        filteredResults = filteredResults.filter(
          (wine) => wine.rating === selectedRating
        );
      }

      setFilteredReviews(filteredResults);
    };

    applyFilters();
  }, [reviewFollowers, searchCriteria, selectedRating]);

  const wineFilter = (wine, key, value) => {
    switch (key) {
      case "searchName":
        return wine.name.toLowerCase().includes(value.toLowerCase());
      case "searchRegion":
        return wine.region.toLowerCase().includes(value.toLowerCase());
      case "searchType":
        return wine.flavor.toLowerCase().includes(value.toLowerCase());
      case "searchUsername":
        return wine.username.toLowerCase().includes(value.toLowerCase());
      default:
        return true;
    }
  };

  const handleSearchChange = (event, setter) => {
    handleSearch(event, setter);
    setSearchOpen(true);
  };

  return (
    <div id="friendFeed" className="friendFeed">
      <div id="all-wine-title">
      <h2>Welcome to Happy Hour with friends!</h2>
      <h5>
        See all your friends favorite-or not so favorite- wines!
      </h5>
      </div>
      <div className="d-flex justify-content-center p-2">
        {searchOpen ? (
          <>
            <div className="search-bars-container">
              <div className="search-box p-3">
                <h3>
                  You can search reviews by wine name, wine type or where
                  they're made
                </h3>
                <label htmlFor="name-filter">Find a wine by name: </label>
<input
  type="text"
  id="name-filter"
  name="search-name"
  value={searchCriteria.searchName}
  onChange={(event) => handleSearchChange(event, setSearchCriteria)}
/>

<label htmlFor="region-filter">Find a wine by region: </label>
<input
  type="text"
  id="region-filter"
  name="search-region"
  value={searchCriteria.searchRegion}
  onChange={(event) => handleSearchChange(event, setSearchCriteria)}
/>

<label htmlFor="type-filter">Wine by type: </label>
<input
  type="text"
  id="type-filter"
  name="search-type"
  value={searchCriteria.searchType}
  onChange={(event) => handleSearchChange(event, setSearchCriteria)}
/>

<label htmlFor="type-filter">Search Reviews by Username: </label>
<input
  type="text"
  id="user-filter"
  name="search-user"
  value={searchCriteria.searchUsername}
  onChange={(event) => handleSearchChange(event, setSearchCriteria)}
/>
              </div>
              <div className="sort-filter-box p-3">
                <h3>Or you can search by price or rating</h3>
                <label htmlFor="price-filter">Sort by price: </label>
                <select
                  id="price-filter"
                  name="price-filter"
                  onChange={(event) =>
                    handlePriceFilter(
                      event,
                      reviewFollowers,
                      setFilteredReviews
                    )
                  }
                >
                  <option value="all">All</option>
                  <option value="1-10">$1 - $10</option>
                  <option value="11-20">$11 - $20</option>
                  <option value="21-30">$21 - $30</option>
                  <option value="30+">$30+</option>
                </select>

                <label htmlFor="rating-filter">Filter by rating:</label>
                <select
                  id="rating-filter"
                  name="rating-filter"
                  value={selectedRating}
                  onChange={(event) =>
                    handleRatingFilter(
                      event,
                      reviewFollowers,
                      setFilteredReviews,
                      setSelectedRating
                    )
                  }
                >
                  <option value="all">All</option>
                  <option value="5">★★★★★</option>
                  <option value="4">★★★★</option>
                  <option value="3">★★★</option>
                  <option value="2">★★</option>
                  <option value="1">★</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                }}
                className="btn btn-primary pb-2"
              >
                Close Search
              </button>
            </div>
          </>
        ) : (
          <>
            {user ? (<>
            <div className="mx-2">
              <button
                onClick={() => {
                  setSearchOpen(true);
                }}
                className="btn btn-primary"
              >
                Search Reviews
              </button>
            </div>
            <div className="mx-2">
              <button
                onClick={() => {
                  navigate("/review");
                }}
                className="btn btn-primary"
              >
                Add a review!
              </button>
            </div>
            </>) : null}
          </>
        )}
      </div>
      <div id="freview" className="frev pb-5 mt-5">
        {filteredReviews.length ? (
          filteredReviews
            .sort((a, b) => new Date(b.review_date) - new Date(a.review_date))
            .map((reviews) => {
              return (
                <div key={`followerReview-${reviews.id}`}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyFriendReview
                      reviews={reviews}
                      user={user}
                      favorites={favorites}
                      saved={saved}
                    />
                  </Suspense>
                </div>
              );
            })
        ) : (
          <>

              {user ? (<div className="d-flex justify-content-center p-2">
            <h2 >
              You aren't following anyone yet. Find some friends to follow!
            </h2>
            <NavLink className="btn btn-primary" to="/winefeed">
              The Tasting Room
            </NavLink>
            </div>):(<div className="d-flex flex-column align-items-center p-2">
  <h2>
    Please Login to see the people you follow.
  </h2>
  <NavLink className="btn btn-primary mt-2" to="/login">
    Login
  </NavLink>
</div>
            )}


          </>

        )}
      </div>
    </div>
  );
};

export default Followers;
