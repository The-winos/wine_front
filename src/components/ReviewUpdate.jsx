import React, { useEffect, useState } from "react";
import { updateReview } from "./API";
import { ToastContainer, toast } from "react-toastify";

const ReviewUpdate = ({ review, setUpdateReview, reviewWine, reviewUser }) => {
  const [reviewName, setReviewName] = useState(review.name);
  const [reviewRating, setReviewRating] = useState(review.rating);
  const [reviewPrice, setReviewPrice] = useState(review.price);
  const [reviewComment, setReviewComment] = useState(review.review_comment);
  const [reviewLocation, setReviewLocation] = useState(review.location);

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      reviewName === review.name &&
      reviewRating === review.rating &&
      reviewPrice === review.price &&
      reviewComment === review.review_comment &&
      reviewLocation === review.location
    ) {
      return;
    }
    try {
      const updateInfo = await updateReview(
        review.id,
        review.wine_id,
        review.user_id,
        reviewName,
        reviewRating,
        reviewPrice,
        reviewComment,
        review.image_url,
        review.review_date,
        reviewLocation
      );
      setUpdateReview(false);
      toast.success("Review Updated");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="card mb-3"
        style={{ maxWidth: "60%", margin: "0 auto" }}
      >
        <div className="row no-gutter">
          <div
            className="col-md-3"
            style={{ border: "none", position: "relative" }}
          >
            <img
              src={`/images/${reviewWine.image_url}`}
              alt="wine image"
              className="img-fluid"
              style={{ maxHeight: "250px", maxWidth: "90%" }}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h3>You are updating your review</h3>
              <h4 className="wine-name">
                {reviewWine.name}
                <small className="wine-flavor muted">
                  {" "}
                  {reviewWine.flavor}
                </small>
              </h4>
              <img
                src={`/images/${reviewUser.avatar}`}
                alt="user picture"
                className="img-fluid"
                style={{
                  maxHeight: "50px",
                  maxWidth: "50px",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              />
              <h6>Update Name</h6>
              <input
                placeholder="Enter updated name"
                className="review-name"
                type="text"
                value={reviewName}
                onChange={(event) => {
                  setReviewName(event.target.value);
                }}
                style={{ maxWidth: "300px" }}
              />
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
              <div className="card-text">
                <div className="d-flex align-items-center">
                <h6>Update Price: $
                <input
                  placeholder="Enter updated price"
                  className="review-price"
                  type="number"
                  value={reviewPrice / 100}
                  onChange={(event) => {
                    setReviewPrice((event.target.value)* 100);
                  }}
                  style={{maxWidth: "75px", marginLeft: "5px"}}
                /></h6>


  <h6 style={{ margin: 0, marginLeft: "10px" }}>Bought at:</h6>
  <select
    className="form-select"
    id="reviewLocation"
    value={reviewLocation}
    onChange={(e) => setReviewLocation(e.target.value)}
    style={{ maxWidth: "150px", marginLeft: "5px", padding:0 }}
  >
    <option value="">Choose...</option>
    <option value="Grocery">Grocery Store</option>
    <option value="Costco">Costco</option>
    <option value="Liquor Store">Liquor Store</option>
    <option value="Sams">Sams</option>
    <option value="Trader Joes">Trader Joes</option>
    <option value="Other">Other</option>
  </select>
</div>


              </div>
              <div>
                <h6>Edit Comment:</h6>
                <textarea
                  placeholder="Enter updated comment"
                  className="form-control"
                  id="review-comment"
                  rows="3"
                  value={reviewComment}
                  onChange={(event) => {
                    setReviewComment(event.target.value);
                  }}
                  style={{ maxWidth: "650px" }}
                />
                 <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
                <button
                  onClick={() => {
                    setUpdateReview(false);
                  }}
                  className="btn btn-primary"
                >
                  Cancel edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default ReviewUpdate;
