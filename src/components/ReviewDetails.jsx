import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const ReviewDetails = ({review}) => {
  const navigate=useNavigate();
  const [reviewUser, setReviewUser]=useState({})

  useEffect(()=>{
    async function fetchGetUserById(){
      const theUser= await getUserById(review.user_id)
      console.log(theUser)
      setReviewUser(theUser);
}
fetchGetUserById();
  }, []);

  return (
    <Card style={{maxWidth:"60%", margin:"0 auto "}}>
  <div className="card mb-3" style={{maxWidth:"800px"}}>
    <div className="row no-gutter">
      <div className="col-md-4">
        <img

        />

      </div>

    </div>

  </div>
  </Card>);

};

export default ReviewDetails;
