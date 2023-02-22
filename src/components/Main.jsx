import React from "react";
import { Navbar, Home, Login, Admin, Followers, Following, Merchant, Profile, Register, WineDetails, WineFeed, Footer } from "./";
import { Route, Routes } from "react-router-dom";


const Main = () => {
  return (
    <div id="main">
 <Navbar />
 <Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/admin" element={<Admin/>}></Route>
  <Route path="/followers" element={<Followers/>}></Route>
  <Route path="/following" element= {<Following/>}></Route>
  <Route path="/merchant" element={<Merchant/>}></Route>
  <Route path="/profile" element={<Profile/>}></Route>
  <Route path="/register" element={<Register/>}></Route>
  <Route path="/winedetails" element={<WineDetails/>}></Route>
  <Route path= "/winefeed" element={<WineFeed/>}></Route>
 </Routes>
 <Footer/>
    </div>
  );
};

export default Main;
