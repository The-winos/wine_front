import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import { checkExistingWine, createReview, createWine } from "./API";

const Review = ({user}) => {
  const navigate= useNavigate()
  const[wineName, setWineName]=useState("");
  const[wineImg, setWineImg]=useState("")
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
  const wine = {
    name: wineName,
    image_url: wineImg,
    price: winePrice,
    rating: wineRating, // <-- add this line
    region: region,
    flavor: flavor,
  };
    const existingWine = await checkExistingWine(wineName);
    if (existingWine) {
      // wine already exists, show review form
      handleReview(existingWine.id);
    } else {
      // wine doesn't exist, show wine form
      createWine(user.id, wineName, wineImg, null, null, region, flavor).then((result) => {
        handleReview(result.id);
      });
    }
  }

  function handleReview(wineId) {
    const review = {
      wine_id: wineId,
      user_id: user.id,
      name: reviewName,
      rating: reviewRating,
      price: reviewPrice,
      review_comment: comment,
      image_url: null,
      review_date: new Date(),
      location: location,
    };
    createReview(review).then((result) => {
      console.log(wineId)
    });
  }

  return (
    <div className="container mt-5">
      <h1>Submit a Review</h1>
      <form onSubmit={handleWine}>
        <div className="mb-3">
          <label htmlFor="wineName" className="form-label">
            Wine Name
          </label>
          <input
            type="text"
            className="form-control"
            id="wineName"
            value={wineName}
            onChange={(e) => setWineName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Check for Existing Wine
        </button>
      </form>


        <form onSubmit={handleReview}>
          <h2>Add Your Review</h2>
          <div className="mb-3">
            <label htmlFor="reviewName" className="form-label">
              Name of Review
            </label>
            <input
              type="text"
              className="form-control"
              id="reviewName"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reviewRating" className="form-label">
              Rating
            </label>
            <div className="rating" id="reviewRating">
              <label>
                <input
                  type="radio"
                  name="stars"
                  value="1"
                  onClick={(e) => setReviewRating(e.target.value)}
                />
                <span className="icon">★</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="stars"
                  value="2"
                  onClick={(e) => setReviewRating(e.target.value)}
                />
                <span className="icon">★</span>
                <span className="icon">★</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="stars"
                  value="3"
                  onClick={(e) => setReviewRating(e.target.value)}
                />
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="stars"
                  value="4"
                  onClick={(e) => setReviewRating(e.target.value)}
                />
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="stars"
                  value="5"
                  onClick={(e) => setReviewRating(e.target.value)}
                />
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="reviewPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="reviewPrice"
              value={reviewPrice}
              onChange={(e) => setReviewPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
          <label htmlFor="reviewRating" className="form-label">
            Rating
          </label>
          <div>
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`fa fa-star${i <= reviewRating ? " checked" : ""}`}
                onClick={() => setReviewRating(i)}
              ></span>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="reviewComment" className="form-label">
            Review Comment
          </label>
          <textarea
            className="form-control"
            id="reviewComment"
            placeholder="Enter review comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reviewLocation" className="form-label">
            Bought At
          </label>
          <select
            className="form-select"
            id="reviewLocation"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="Grocery">Grocery</option>
            <option value="Costco">Costco</option>
            <option value="Liquor Store">Liquor Store</option>
            <option value="Sams">Sams</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {location === "Other" && (
          <div className="mb-3">
            <label htmlFor="otherLocation" className="form-label">
              Other Location
            </label>
            <input
              type="text"
              className="form-control"
              id="otherLocation"
              placeholder="Enter other location"
              value={otherLocation}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
  );
};




export default Review;
