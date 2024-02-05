import React, { useEffect, useState } from "react";
import { authUser, getSaved, getAllReviews, getAllWine } from "./API";
import {
  Admin,
FavoritesUserId,
Followers,
Following,
Footer,
FooterAboutUs,
FooterContact,
FooterPrivacy,
FooterTerms,
Home,
Login,
LoginEnterEmail,
LoginForgotPass,
Merchant,
Navbar,
Profile,
ProfileAccountSettings,
ProfileFavorites,
ProfileStats,
ProfileUserId,
Register,
Review,
ReviewDetails,
Saved,
SingleWine,
UserData,
WineDetails,
WineFeed,
WineList,
} from "./";
import { Route, Routes } from "react-router-dom";
import UserReviewDetails from "./UserReviewDetails";
import { getFavorites } from "./API";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [wineInfo, setWineInfo] = useState({});
  const [allWine, setAllWine] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [saved, setSaved] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const getLoggedInUser = async (token) => {
    if (token) {
      const loggedInUser = await authUser(token);
      setUser(loggedInUser);
    }
  };
  useEffect(() => {
    // Fetch all reviews on initial load
    fetchAllReview();
  }, []);

  useEffect(() => {
    // Update the filtered reviews whenever all reviews change
    setFilteredReviews(allReviews);
  }, [allReviews]);

  function fetchAllReview() {
    getAllReviews()
      .then((allTheReviews) => {
        setAllReviews(allTheReviews);
      })
      .catch((error) => {
        // Handle error if needed
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      getLoggedInUser(token);
    }
  }, []);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user) {
        try {
          const fetchedFavorites = await getFavorites(user.id);
          setFavorites(fetchedFavorites);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserFavorites();
  }, [user]);

  useEffect(() => {

    const fetchUserSaved = async () => {
      if (user) {
        try {
          const fetchedSaved = await getSaved(user.id);
          setSaved(fetchedSaved);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserSaved();
  }, [user]);

  function handleNewReview(newReview) {
    // Update the list of reviews to include the newly created review
    setAllReviews((prevReviews) => [newReview, ...prevReviews]);
    setFilteredReviews((prevReviews) => [newReview, ...prevReviews]);
  }

  return (
    <div id="main">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
      <Routes>
        <Route
          path="/"
          element={<Home allWine={allWine} setAllWine={setAllWine} user={user}/>}
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
        <Route
          path="/admin"
          element={<Admin user={user} allReviews={allReviews} />}
        ></Route>
        <Route
          path="/followers"
          element={<Followers user={user} favorites={favorites} saved={saved} />}
        ></Route>
        <Route path="/following" element={<Following />}></Route>
        <Route path="/merchant" element={<Merchant />}></Route>
        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              allReviews={allReviews}
              setAllReviews={setAllReviews}
              favorites={favorites}
            />
          }
        ></Route>
        <Route
          path="/profileuserid/:id"
          element={
            <ProfileUserId
              user={user}
              allReviews={allReviews}
              setAllReviews={setAllReviews}
            />
          }
        />
        <Route
          path="/favoritesuserid/:id"
          element={<FavoritesUserId user={user} setWineInfo={setWineInfo} />}
        />

        {/* <Route
          path="/userreviewdetails"
          element={
            <UserReviewDetails
              user={user}
              allReviews={allReviews}
              setAllReviews={setAllReviews}
            />
          }
        ></Route> */}
        <Route
          path="/register"
          element={<Register user={user} setLoggedIn={setLoggedIn} />}
        ></Route>
        <Route
          path="/winelist"
          element={
            <WineList
              allWine={allWine}
              setAllWine={setAllWine}
              wineInfo={wineInfo}
              setWineInfo={setWineInfo}
              user={user}
              favorites={favorites}
              saved={saved}
            />
          }
        ></Route>
        <Route
          path="/singlewine/:wineId"
          element={<SingleWine user={user} loggedIn={loggedIn} />}
        ></Route>
        <Route
          path="/winedetails"
          element={<WineDetails favorites={favorites} user={user} />}
        ></Route>
        <Route
          path="/accountsettings"
          element={<ProfileAccountSettings user={user} />}
        ></Route>
        <Route
          path="/review"
          element={
            <Review
              user={user}
              filteredReviews={filteredReviews}
              setFilteredReviews={setFilteredReviews}
              handleNewReview={handleNewReview}
            />
          }
        ></Route>
        <Route
          path="/winefeed"
          element={
            <WineFeed
              user={user}
              allReviews={allReviews}
              setAllReviews={setAllReviews}
              reviewInfo={reviewInfo}
              setReviewInfo={setReviewInfo}
              favorites={favorites}
              saved={saved}
              filteredReviews={filteredReviews}
              setFilteredReviews={setFilteredReviews}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <ProfileFavorites
              user={user}
              setWineInfo={setWineInfo}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        ></Route>
        <Route
          path="/saved"
          element={
            <Saved
              user={user}
              setWineInfo={setWineInfo}
              saved={saved}
              setSaved={setSaved}
            />
          }
        ></Route>
        <Route
          path="/footeraboutus"
          element={<FooterAboutUs user={user} />}
        ></Route>
        <Route
          path="/footercontact"
          element={<FooterContact user={user} />}
        ></Route>
        <Route path="/privacy" element={<FooterPrivacy user={user} />}></Route>
        <Route path="/terms" element={<FooterTerms user={user} />}></Route>
        {/* <Route path="/userdata" element={<UserData user={user} />}></Route> */}
        <Route
          path="/profilestats"
          element={<ProfileStats user={user} />}
        ></Route>
        <Route
          path="/reset-password/:resetToken"
          element={<LoginForgotPass />}
        ></Route>
        <Route path="/forgotPassword" element={<LoginEnterEmail />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;
