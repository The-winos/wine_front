import React from "react";
import { useEffect, useState } from "react";
import {
  deleteItem,
  getFavorites,
  getSaved,
  getWineById,
  updateWine,
  getReviewsByWineId,
  getFavoritesByWine,
  getReviewById,
  updateReview,
  getUserById,
} from "./API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSearch } from "./SearchBar";

const AdminReviews = ({
  allReviews,
  setReviewsButton,
  reviewsButton,
  user,
  allWine,
}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState("");
  const [reviewUser, setReviewUser] = useState("");
  const [usernames, setUsernames] = useState({});
  const [reviewToUpdate, setReviewToUpdate] = useState(false);
  const [updatingReview, setUpdatingReview] = useState({});
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedReviews, setSortedReviews] = useState([]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked, toggle the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the new sorting column and default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  async function handleReviewClick(ReviewId) {

    setReviewToUpdate(true);
    const reviewToUpdate = await getReviewById(ReviewId);
    setName(reviewToUpdate.name);
    setComment(reviewToUpdate.review_comment);
    setLocation(reviewToUpdate.location);
    setReviewUser(reviewToUpdate.user_id);
    setUpdatingReview(reviewToUpdate);
  }

  useEffect(() => {
    // Process reviews when component mounts
    processReviews();
  }, [allReviews, sortColumn, sortDirection]);

  async function processReviews() {
    const processedReviews = await Promise.all(
      allReviews.map(async (review) => {
        // Fetch the username asynchronously
        const user = await getUserById(review.user_id);
        // Append the username to the review object
        return { ...review, username: user.username };
      })
    );
    // Sort the reviews based on the selected column
    const sortedReviews = processedReviews.sort((a, b) => {
      switch (sortColumn) {
        case "name":
        return a[sortColumn].localeCompare(b[sortColumn]);
        case "location":
          return a[sortColumn].localeCompare(b[sortColumn]);
        case "price":
          return sortDirection === "asc"
            ? (a[sortColumn] || 0) - (b[sortColumn] || 0)
            : (b[sortColumn] || 0) - (a[sortColumn] || 0);
        case "rating":
          return sortDirection === "asc"
            ? a[sortColumn] - b[sortColumn]
            : b[sortColumn] - a[sortColumn];
            case "review_user":
              // Ensure review_user is defined for both reviews before comparing
              if (a.review_user && b.review_user) {
                  return a[sortColumn].localeCompare(b[sortColumn]); // Compare review users
              } else {
                  // Handle cases where review_user is undefined or null
                  return 0; // or any other suitable value depending on your requirements
              }
        default:
          // Sort by review date in descending order to make the most current review first
          return new Date(b.review_date) - new Date(a.review_date);
      }
    });
    setSortedReviews(sortedReviews);
  }
  useEffect(() => {
    // Fetch usernames for each review
    const fetchUsernames = async () => {
      const usernamesObj = {};
      for (const review of sortedReviews) {
        const user = await getUserById(review.user_id);
        usernamesObj[review.id] = user.username;

      }
      setUsernames(usernamesObj);
    };

    fetchUsernames();
  }, [sortedReviews]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      name === updatingReview.name &&
      comment === updatingReview.review_comment &&
      location === updatingReview.location &&
      reviewUser === updatingReview.user_id
    ) {
      return;
    }
    try {
      setUpdatingReview({
        ...updatingReview,
        name: name !== "" ? name : updatingReview.name,
        comment: comment !== "" ? comment : updatingReview.review_comment,
        location: location !== "" ? location : updatingReview.location,
        reviewUser: reviewUser !== "" ? reviewUser : updatingReview.user_id,
      });
      const updateInfo = await updateReview(
        updatingReview.id,
        updatingReview.wine_id,
        reviewUser,
        name,
        updatingReview.rating,
        updatingReview.price,
        comment,
        updatingReview.image_url,
        updatingReview.review_date,
        location
      );
      setName("");
      setComment("");
      setLocation("");
      setReviewUser("");
      setReviewToUpdate(false);
      toast.success("Review updated");
    } catch (error) {
      console.error(error);
    }


  }

  function showConfirmation(message) {
    return new Promise((resolve, reject) => {
      const confirmed = window.confirm(message);
      if (confirmed) {
        resolve(true);
      } else {
        return;
      }
    });
  }

  async function handleDelete(type, id) {
    try {
      const confirmDeletion = await showConfirmation(
        `Are you sure you want to delete wine ${updatingReview.name}`
      );
      if (!confirmDeletion) {
        return;
      }

      deleteItem("reviews", updatingReview.id);

      const result = await deleteItem(type, id);

      setReviewToUpdate(false);
      toast.success(`${updatingReview.name} deleted`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {reviewToUpdate && reviewsButton ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="admin-form border p-2 m-3 mb-4"
          >
            <h3 className="d=flex justify-content-center pb-3">
              You are updating {updatingReview.name}
            </h3>
            <div className="row">

              <div className="col">
                <h5>{updatingReview.name}</h5>
                <h6>Update Name</h6>
                <input
                  placeholder="Enter corrected name"
                  className="review-name"
                  type="text"
                  value={name || ""}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />

              </div>
              <div className="col">

                <h6>Update Comment</h6>
                <textarea
  className="form-control textarea-bio"
  style={{ width: "80%", height: "125px", padding: "8px" }}
  value={comment || ""}
  onChange={(event) => {
    setComment(event.target.value);
  }}
/>



              </div>
              <div className="col">
                <h5>{updatingReview.location}</h5>
                <h6>Update Location</h6>
                <input
                  placeholder="Enter corrected location"
                  className="wine-location"
                  type="text"
                  value={location || ""}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                />
                </div>

            </div>

            <br />
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
        type="button"
        className="btn btn-danger ml-2"
        onClick={() => handleDelete('reviews', updatingReview.id)}
      >
        Delete
      </button>



          </form>
          <ToastContainer />
        </>

      ) : null}
      {reviewsButton ? (<>
        <p colSpan="6" style={{ textAlign: "center" }}>{allReviews.length} Total Reviews</p>
        <table className="table m-4">
        <thead>
        <tr>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("name")}>Name</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("location")}>Bought At</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("price")}>Average Price</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("rating")}>Average Rating</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("review_date")}>Review Date</th>
    <th style={{cursor: "pointer"}} onClick={() => handleSort("review_user")}>Reviewer</th>
  </tr>
        </thead>
        <tbody>
        {sortedReviews.map((review) =>{

            return (

              <tr key={`reviewlist-${review.id}`}>
                <td
                  style={{ color:
                    review.rating === 1
                      ? "red"
                      : review.rating === 2
                      ? "blue"
                      : review.rating === 3
                      ? "black"
                      : review.rating === 4
                      ? "#199EF3"
                      : "green",
                    cursor: "pointer" }}
                  onClick={() => handleReviewClick(review.id)}
                  title="Click to edit"
                >
                  {review.name}</td>
                  <td>{review.location}</td>
                  <td>{review.price==null ? "N/A" :
                  review.price/100}</td>
                  <td>{review.rating}</td>
                  <td>
                          {new Date(review.review_date).toLocaleDateString("en-US")}
                        </td>
                        <td>{usernames[review.id]}</td>


              </tr>
            );
          })}
          </tbody>
          </table>
      </>) : null}

      <ToastContainer />
    </>
  );
};

export default AdminReviews;
