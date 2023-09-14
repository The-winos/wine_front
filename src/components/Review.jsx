import React, { useState, useEffect } from "react";
import { createBootstrapComponent } from "react-bootstrap/esm/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Autosuggest from "react-autosuggest";
import { checkExistingWine, createReview, createWine, getAllWine } from "./API";

const Review = ({ user, handleNewReview }) => {
  const navigate = useNavigate();
  const [wineName, setWineName] = useState("");
  const [wineImg, setWineImg] = useState("");
  const [winePrice, setWinePrice] = useState("");
  const [wineRating, setWineRating] = useState("");
  const [region, setRegion] = useState("");
  const [flavor, setFlavor] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewPrice, setReviewPrice] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [comment, setComment] = useState("");
  const [theLocation, setTheLocation] = useState("");
  const [isThereWine, setIsThereWine] = useState(false); // for review
  const [noWine, setNoWine] = useState(false);
  const [wineId, setWineId] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [allWineNames, setAllWineNames] = useState([]);

  useEffect(() => {
    const fetchAllWineData = async () => {
      try {
        const wineData = await getAllWine();
        const wineNames = wineData.map((wine) => wine.name);
        setAllWineNames(wineNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllWineData();
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    console.log(value, "suggestionfetchValue");
    if (value.trim() === "") {
      // Clear the suggestions when the input is empty
      setSuggestions([]);
    } else {
      // Filter wine names that match the user's input
      const filteredSuggestions = allWineNames.filter(
        (wine) => wine.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      // Set the filtered suggestions in the state
      setSuggestions(filteredSuggestions);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  async function handleWine(e) {
    e.preventDefault();
    const wine = {
      name: wineName,
      image_url: wineImg,
      price: winePrice,
      rating: wineRating,
      region: region,
      flavor: flavor,
    };
    const existingWine = await checkExistingWine(wineName);
    if (existingWine) {
      setIsThereWine(true);
      setWineId(existingWine.id);
    } else {
      setNoWine(true);
    }
  }
  function handleCreateWine(e) {
    e.preventDefault();

    const profaneWords = [
      "fuck",
      "shit",
      "cunt",
      "nigga",
      "nigger",
      "whore",
      "slut",
      "faggot",
      "rape",
      "5hit",
      "ejaculation",
      "fagot",
      "gangbang",
      "masterbate",
    ];

    const containsProfaneWords = profaneWords.some((word) => {
      return wineName.toLowerCase().includes(word);
    });

    if (containsProfaneWords) {
      toast.error("Your wine name contains inappropriate language.");
      return;
    }
    if (
      flavor == "Cabernet" ||
      flavor == "Syrah" ||
      flavor == "Zinfandel" ||
      flavor == "Pinot Noir" ||
      flavor == "Merlot" ||
      flavor == "Malbec" ||
      flavor == "Tempranillo" ||
      flavor == "Red Blend" ||
      flavor == "TreTerzi" ||
      flavor == "Petite Sirah"
    ) {
      setWineImg("3-reddish-purple_wine.png");
    }
    if (
      flavor == "White Zinfandel" ||
      flavor == "Rose" ||
      flavor == "Champagne" ||
      flavor == "Sparkling" ||
      flavor == "Other"
    ) {
      setWineImg("2-purple_wine.png");
    } else {
      setWineImg("1-green_wine.png");
    }
  }

  useEffect(() => {
    async function creatingTheWine() {
      if (wineImg) {
        const newWine = await createWine(
          user.id,
          wineName,
          wineImg,
          null,
          null,
          region,
          flavor
        );
        setIsThereWine(true);
        setNoWine(false);

        setWineId(newWine.id);
      }
    }
    creatingTheWine();
  }, [wineImg]);

  async function handleReview(e) {
    e.preventDefault();
    const profaneWords = [
      "fuck",
      "shit",
      "cunt",
      "nigga",
      "nigger",
      "whore",
      "slut",
      "faggot",
      "rape",
      "5hit",
      "ejaculation",
      "fagot",
      "gangbang",
      "masterbate",
    ];

    const containsProfaneWords = profaneWords.some((word) => {
      return (
        reviewName.toLowerCase().includes(word) ||
        comment.toLowerCase().includes(word)
      );
    });

    if (containsProfaneWords) {
      toast.error(
        "Your review contains inappropriate language. Please edit your review."
      );
      return;
    }

    try {
      const review = await createReview({
        wine_id: wineId,
        user_id: user.id,
        name: reviewName,
        rating: reviewRating,
        price: Math.round(reviewPrice),
        review_comment: comment,
        image_url: null,
        review_date: new Date(),
        location: theLocation,
      });

      if (review && !review.error) {
        handleNewReview(review);
        toast.success("Review Added");
        navigate("/winefeed");
      } else if (review && review.error) {
        toast.error(review.message);
      } else {
        toast.error("Failed to submit the review. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to submit the review. Please try again later.");
    }
  }

  const handlePriceChange = (e) => {
    const userInput = e.target.value;
    const priceInDollars = parseFloat(userInput);
    setReviewPrice(priceInDollars);
  };


  return (
    <div className="reviewPage container mt-5">
      <h1>Submit a Review</h1>
      <form onSubmit={handleWine}>
        <div className="mb-3">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={(suggestion) => <div>{suggestion}</div>}
            inputProps={{
              placeholder: "Type a wine name",
              value: wineName,
              onChange: (e, { newValue }) => {
                if (newValue.trim() === "") {
                  // Clear the suggestions when the input is empty
                  setSuggestions([]);
                }
                setWineName(newValue);
              },
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Check for Existing Wine
        </button>
      </form>
      <form onSubmit={handleCreateWine}>
        {noWine ? (
          <>
            <h2>Add Your Wine</h2>
            <label htmlFor="wineRegion" className="form-label">
              Region of wine:
            </label>
            <input
              type="text"
              className="form-control"
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <label htmlFor="wineFlavor" className="form-label">
              Type of this wine:
            </label>
            <select
              className="form-select"
              id="flavor"
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="Cabernet">Cabernet Sauvignon</option>
              <option value="Syrah">Syrah</option>
              <option value="Zinfandel">Zinfandel</option>
              <option value="Pinot Noir">Pinot Noir</option>
              <option value="Merlot">Merlot</option>
              <option value="Malbec">Malbec</option>
              <option value="Tempranillo">Tempranillo</option>
              <option value="Riesling">Riesling</option>
              <option value="Pinot Grigio">Pinot Grigio</option>
              <option value="Sauvigon">Sauvigon Blanc</option>
              <option value="Chardonnay">Chardonnay</option>
              <option value="Moscato">Moscato</option>
              <option value="TreTerzi">TreTerzi</option>
              <option value="Petite Sirah">Petite Sirah </option>
              <option value="Red Blend">Red Blend</option>
              <option value="White Blend">White Blend</option>
              <option value="Rose">Rosé</option>
              <option value="White Zinfandel">White Zinfandel</option>
              <option value="Sparkling">Sparkling</option>
              <option value="Champagne">Champagne</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className="btn btn-primary">
              Submit my wine
            </button>
          </>
        ) : null}
      </form>

      {isThereWine ? (
        <form onSubmit={handleReview} className="border p-4 mt-4 border-light">
          <h2>Add Your Review</h2>
          <div className="mb-3">
            <label htmlFor="reviewName" className="form-label mt-10px">
              Title of Review
            </label>
            <input
              type="text"
              className="form-control"
              id="reviewName"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
              style={{ maxWidth: "350px" }}
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
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
  type="number"
  className="form-control"
  id="reviewPrice"
  value={reviewPrice === null ? "" : reviewPrice / 100} // Divide by 100 to show the correct value
  onChange={(e) =>
    setReviewPrice(
      e.target.value === "" ? null : parseFloat(e.target.value) * 100
    )
  }
  inputMode="decimal"
  style={{ maxWidth: "150px" }}
/>

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
              style={{ maxWidth: "650px" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reviewLocation" className="form-label">
              Bought At
            </label>
            <select
              className="form-select"
              id="reviewLocation"
              value={theLocation}
              onChange={(e) => setTheLocation(e.target.value)}
              style={{ maxWidth: "250px" }}
            >
              <option value="">Choose...</option>
              <option value="Grocery">Grocery Store</option>
              <option value="Costco">Costco</option>
              <option value="Liquor Store">Liquor Store</option>
              <option value="Sams">Sams</option>
              <option value="Trader Joes">Trader Joes</option>
              <option value="Other">Other</option>
            </select>

            <button
              type="submit"
              className="btn btn-primary mt-3 mb-1"
              onClick={handleReview}
            >
              Submit
            </button>
          </div>
        </form>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default Review;
