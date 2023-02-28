import React from "react";
import { useNavigate, useHref } from "react-router-dom";
import { Card } from "react-bootstrap";


const WineDetails = ({ wine }) => {
  const navigate = useNavigate();
  const ref = useHref();

  return (
    <Card style={{ maxWidth: "60%", margin: "0 auto" }}>
    <div className="card mb-3" style={{ maxWidth: "800px" }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={wine.image_url}
            alt="wine image"
            className="img-fluid"
            style={{ maxHeight: "90%", maxWidth: "90%" }}
          />
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
    </Card>
  );
};

export default WineDetails;
