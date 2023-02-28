import React from "react";
import { useNavigate, useHref } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
// import "./css for components/"

const WineDetails = ({ wine }) => {
  const navigate = useNavigate();
  const ref = useHref();

  return (
    <Card onClick={() => navigate(`/singlewine/${wine.id}`)}>
      <Row>
        <Col md={4}>
          <Card.Img variant="top" src={wine.image_url}
  alt="wine image"
  className="prodWine"
/>
        </Col>
        <Col md={7}>
          <Card.Body>
            <Card.Title>{wine.name}</Card.Title>
            <Card.Text>
              Type: {wine.flavor}
              <br />
              Region: {wine.region}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default WineDetails;
