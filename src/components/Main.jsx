import React, { useEffect, useState } from "react";
import { authUser } from "./API";
import {
  Navbar,
  Home,
  Login,
  Admin,
  Followers,
  Following,
  Merchant,
  Profile,
  Register,
  WineDetails,
  WineFeed,
  Footer,
  SingleWine,
  WineList,
  ReviewDetails,
  AccountSettings,
  Review,
  ProfileUserId,
  Favorites,
  FavoritesUserId,
} from "./";
import { Route, Routes } from "react-router-dom";
import UserReviewDetails from "./UserReviewDetails";
import { getFavorites } from "./API";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({}); //in griffinBack it has it as useState({ admin: false });
  const [wineInfo, setWineInfo] = useState({});
  const [allWine, setAllWine] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  const getLoggedInUser = async (token) => {
    if (token) {
      const loggedInUser = await authUser(token);
      setUser(loggedInUser);
      console.log(loggedIn, "loggedIn");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      getLoggedInUser(token);
    }
  }, []);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const fetchedFavorites = await getFavorites(user.id);
        setFavorites(fetchedFavorites);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserFavorites();
  }, [user]);

  return (
    <div id="main">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
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
        <Route path="/admin" element={<Admin user={user}/>}></Route>
        <Route path="/followers" element={<Followers user={user} />}></Route>
        <Route path="/following" element={<Following />}></Route>
        <Route path="/merchant" element={<Merchant />}></Route>
        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              allReviews={allReviews}
              setAllReviews={setAllReviews}
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
        <Route path="/favoritesuserid/:id"
        element={
          <FavoritesUserId user={user} setWineInfo={setWineInfo}/>
        }/>

        <Route
          path="/userreviewdetails"
          element={
            <UserReviewDetails
              user={user}
              allReviews={allReviews}
              setAllReviews={setAllReviews}
            />
          }
        ></Route>
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
            />
          }
        ></Route>
        <Route
          path="/singlewine/:wineId"
          element={<SingleWine user={user} loggedIn={loggedIn} />}
        ></Route>
        <Route path="/winedetails" element={<WineDetails favorites={favorites}/>}></Route>
        <Route
          path="/accountsettings"
          element={<AccountSettings user={user} />}
        ></Route>
        <Route path="/review" element={<Review user={user} />}></Route>
        <Route
          path="/winefeed"
          element={
            <WineFeed
              user={user}
              allReviews={allReviews}
              setAllReviews={setAllReviews}
              reviewInfo={reviewInfo}
              setReviewInfo={setReviewInfo}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={<Favorites user={user} setWineInfo={setWineInfo} favorites={favorites} setFavorites={setFavorites}/>}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;
