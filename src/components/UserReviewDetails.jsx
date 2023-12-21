// import React, { useEffect, useState } from "react";
// import { getWineById } from "./API";
// import { useNavigate } from "react-router-dom";
// import Rating from "react-rating-stars-component";

// const UserReviewDetails = ({ userReviews, setUserReviews, user, currentUser }) => {
//   const navigate = useNavigate();
//   const [userWineDetails, setUserWineDetails] = useState({});
//   const [isNoteHovered, setIsNoteHovered] = useState(false);
//   const [isWineImageHovered, setIsWineImageHovered] = useState(false);

//   useEffect(() => {
//     const fetchUserWineDetails = async () => {
//       try {
//         const wineDetails = await getWineById(userReviews.wine_id);
//         setUserWineDetails(wineDetails);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUserWineDetails();
//   }, [userReviews]);

//   const handleReviewClick = () => {
//     // Navigate to the review details component
//     // Replace with the appropriate route and component
//     navigate(`/review-details/${userReviews.id}`);
//   };

//   return (
//     <div
//       className={`note ${isNoteHovered ? "hovered" : ""}`}
//       onMouseEnter={() => setIsNoteHovered(true)}
//       onMouseLeave={() => setIsNoteHovered(false)}
//     >
//       {userWineDetails && (
//         <div>
//           <div className="review-date">
//             <h5 className="date">
//               {new Date(userReviews.review_date).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </h5>
//           </div>
//           <div
//             className={`wine-image-button ${
//               isWineImageHovered ? "hovered" : ""
//             }`}
//             onClick={handleReviewClick}
//             onMouseEnter={() => setIsWineImageHovered(true)}
//             onMouseLeave={() => setIsWineImageHovered(false)}
//           >
//             <div className="wine-image-container">
//               <img
//                 src={`/images/${userWineDetails.image_url}`}
//                 alt="wine image"
//                 className="card-img-top"
//                 style={{
//                   height: "200px",
//                   objectFit: "contain",
//                   objectPosition: "center center",
//                 }}
//               />
//               {isWineImageHovered && (
//                 <div className="edit-text">Edit Review</div>
//               )}
//             </div>
//           </div>
//           <h4 className="wine-name-profile">{userWineDetails.name}</h4>
//           <h6 className="wine-region-profile">{userWineDetails.region}</h6>
//           <h6 className="wine-flavor-profile">{userWineDetails.flavor}</h6>
//           <Rating
//             value={userReviews.rating}
//             edit={false}
//             size={20}
//             activeColor="#ffd700"
//           />
//           <h5 className="review-comment text-truncate">
//             {userReviews.review_comment}
//           </h5>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserReviewDetails;
