import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReviews, getAllWine, getUserById, getWineById } from "./API";


import {
  handlePriceFilter,
  handleRatingFilter,
  handleSearch,
} from "./SearchBar";

const LazyReviewDetails = lazy(() => import("./ReviewDetails"));

const WineFeed = ({
  user,
  setAllReviews,
  allReviews,
  setReviewInfo,
  reviewInfo,
  favorites,
  saved,
  filteredReviews,
  setFilteredReviews,

}) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState("all");
  const [searchName, setSearchName] = useState("");
  const [searchRegion, setSearchRegion] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchUsername, setSearchUsername]= useState("");





  useEffect(() => {
    const filterReviews = async () => {
      const results = await Promise.all(
        allReviews.map(async (wine) => {
          const wineObj = await getWineById(wine.wine_id);
          if (wineObj.name.toLowerCase().includes(searchName.toLowerCase())) {
            return wine;
          }
        })
      );
      setFilteredReviews(results.filter((wine) => wine !== undefined));
    };

    filterReviews();
  }, [searchName]);

  useEffect(() => {
    const filterReviews = async () => {
      const results = await Promise.all(
        allReviews.map(async (wine) => {
          const userObj = await getUserById(wine.user_id);
          if (userObj.username.toLowerCase().includes(searchUsername.toLowerCase())) {
            return wine;
          }
        })
      );
      setFilteredReviews(results.filter((wine) => wine !== undefined));
    };
    filterReviews();
  }, [searchUsername]);

  useEffect(() => {
    const filterReviews = async () => {
      const results = await Promise.all(
        allReviews.map(async (wine) => {
          const wineObj = await getWineById(wine.wine_id);
          if (wineObj.region.toLowerCase().includes(searchRegion.toLowerCase())) {
            return wine;
          }
        })
      );
      setFilteredReviews(results.filter((wine) => wine !== undefined));
    };

    filterReviews();
  }, [searchRegion]);

  useEffect(() => {
    const filterReviews = async () => {
      const results = await Promise.all(
        allReviews.map(async (wine) => {
          const wineObj = await getWineById(wine.wine_id);
          if (wineObj.flavor.toLowerCase().includes(searchType.toLowerCase())) {
            return wine;
          }
        })
      );
      setFilteredReviews(results.filter((wine) => wine !== undefined));
    };

    filterReviews();
  }, [searchType]);

  return (
    <div id="wineFeed">
      <div id="all-wine-title">
      <h2>Welcome to the Tasting Room</h2>
      <h5>See all the wines people have reviewed</h5>
      </div>

      <div className="d-flex justify-content-center p-2">
        {searchOpen ? (
          <>

<div className="search-bars-container">
          <div className="search-box p-3">
            <h3>You can search reviews by wine name, wine type or where they're made</h3>
            <label htmlFor="name-filter">Find a wine by name: </label>
            <input
              type="text"
              id="name-filter"
              name="search-name"
              value={searchName}
              onChange={(event) => {
                handleSearch(event, setSearchName);
              }}
            />
            <label htmlFor="region-filter">Find a wine by region: </label>
            <input
              type="text"
              id="region-filter"
              name="search-region"
              value={searchRegion}
              onChange={(event) => {
                handleSearch(event, setSearchRegion);
              }}
            />
            <label htmlFor="type-filter">Wine by type: </label>
            <input
              type="text"
              id="type-filter"
              name="search-type"
              value={searchType}
              onChange={(event) => {
                handleSearch(event, setSearchType);
              }}
            />
              <label htmlFor="type-filter">Search Reviews by Username: </label>
            <input
              type="text"
              id="type-filter"
              name="search-user"
              value={searchUsername}
              onChange={(event) => {
                handleSearch(event, setSearchUsername);
              }}
            />
          </div>
          <div className="sort-filter-box p-3">
            <h3>Or you can search by price or rating</h3>
            <label htmlFor="price-filter">Sort by price: </label>
            <select
              id="price-filter"
              name="price-filter"
              onChange={(event) =>
                handlePriceFilter(event, allReviews, setFilteredReviews)
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
                  allReviews,
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
          </>
        )}
      </div>
      <div id="reviews" className="review pb-5 mt-5">
        {filteredReviews && filteredReviews.length
          ? filteredReviews
              .sort((a, b) => new Date(b.review_date) - new Date(a.review_date))
              .map((review) => {
                return (
                  <div key={`allreviews-${review.id}`}>
                    <Suspense fallback={<div>Loading...</div>}>
                    <LazyReviewDetails
                      user={user}
                      review={review}
                      setReviewInfo={setReviewInfo}
                      favorites={favorites}
                      saved={saved}
                      currentUser={user}
                    />
                  </Suspense>
                  </div>
                );
              })
          : null}
      </div>

    </div>
  );
};

export default WineFeed;
