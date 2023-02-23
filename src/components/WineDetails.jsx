import React from "react";
import { useNavigate, useHref } from "react-router-dom";

const WineDetails = ({wine}) => {
  const navigate= useNavigate
  const ref= useHref();
  return (
  <div id="wineDetails">
  <button
  onClick={()=>{
    navigate(`/singlewine/${wine.id}`);
  }}
  className="wineInfo"
  >
    <img src={wine.image_url} alt="wine image" className="prodWine"></img>
    <div className="wine_title">{wine.name}</div>
    <div className="wine_flavor">Type: {wine.flavor}</div>
    <div className="wine_region">Region: {wine.region}</div>
  </button>

  </div>)
};

export default WineDetails;
