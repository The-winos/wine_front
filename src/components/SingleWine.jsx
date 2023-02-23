import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWineById } from "./API";

const SingleWine = ({user, loggedIn}) => {
  const{wineId}= useParams();
  const navigate = useNavigate();
  const [singleWine, setSingleWine]= useState();

  useEffect(()=>{
    async function fetchWine(){
      const theWine= await getWineById(wineId);
      setSingleWine(theWine);
    }
    fetchWine();
  }, []);
  return (
  <div id="singlewine">
    {singleWine ? (
    <div>
      <img className="single-book-img" src={singleWine.image_url} alt="wine image"></img>
      <div className="single-book-title">{singleWine.name} </div>
      <div className="single-book-flavor">Type: {singleWine.flavor}</div>
      <div className="single-book-avgPrice">Average Price: {singleWine.price}</div>
      <div className="single-book-region">Region: {singleWine.region}</div>
    </div>
    ):(<h1>Loading Your Wine</h1>)}

  </div>)
};

export default SingleWine;
