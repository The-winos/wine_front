import React, {useState} from "react";

const Review = ({user}) => {
  const[wineName, setWineName]=useState("");
  const[winePrice, setWinePrice]=useState("");
  const[wineRating, setWineRating]=useState("");
  const[region, setRegion]=useState("");
  const[flavor, setFlavor]=useState("");
  const[reviewName, setReviewName]=useState("");
  const[reviewPrice, setReviewPrice]=useState("");
  const[reviewRating, setReviewRating]=useState("");
  const[comment, setComment]=useState("");
  const[location, setLocation]=useState("");

async function handleWine(event)
{
  event.preventDefault();

}

  return <div id="review">Review</div>;
};

export default Review;
