import React from "react";
import { useNavigate, useHref } from "react-router-dom";

const WineDetails = ({wine}) => {
  const navigate= useNavigate
  return <div id="wineDetails"> I am wineDetails</div>;
};

export default WineDetails;
