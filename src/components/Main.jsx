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
  EditAccount,
  ProfileUserId,
  Favorites,
} from "./";
import { Route, Routes } from "react-router-dom";
import UserReviewDetails from "./UserReviewDetails";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({}); //in griffinBack it has it as useState({ admin: false });
  const [wineInfo, setWineInfo] = useState({});
  const [allWine, setAllWine] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [reviewInfo, setReviewInfo] = useState([]);

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
        <Route path="/admin" element={<Admin />}></Route>
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
        <Route path="/winedetails" element={<WineDetails />}></Route>
        <Route
          path="/accountsettings"
          element={<AccountSettings user={user} />}
        ></Route>
        <Route path="/review" element={<Review user={user} />}></Route>
        <Route
          path="/editaccount"
          element={<EditAccount user={user} />}
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
            />
          }
        ></Route>
        <Route path="/favorites" element={<Favorites user={user} />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;
