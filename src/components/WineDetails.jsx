import React from "react";
import { useNavigate, useHref } from "react-router-dom";
import Rating from "react-rating-stars-component";

const WineDetails = ({ wine }) => {
  const navigate = useNavigate();
  const ref = useHref();

  return (

      <div className="card mb-3" style={{ maxWidth: "60%", margin: "0 auto" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={wine.image_url}
              alt="wine image"
              className="img-fluid"
              style={{ maxHeight: "90%", maxWidth: "90%" }} />
              <button className="bg-transparent" style={{ position:"absolute", border: "none", top: "1em", right: "1em" }}>♥</button>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{wine.name}</h5>
              <p className="card-text">
                <small className="text-muted">Type: {wine.flavor}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">Region: {wine.region}</small>
              </p>
              <div className="card-text">
                <Rating
                  value={wine.rating}
                  edit={false}
                  size={20}
                  activeColor="#ffd700"
                />
              </div>
              <button
                onClick={() => {
                  navigate(`/singlewine/${wine.id}`);
                }}
                className="btn btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default WineDetails;
