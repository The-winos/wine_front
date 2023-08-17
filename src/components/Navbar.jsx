import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const CustomNavbar = ({ setLoggedIn, loggedIn, user, setUser }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  return (
    <Navbar className="custom-navbar" expand="lg" sticky="top">


      <NavLink className="navbar-brand m-0 p-0" to="/">
    <img src="/images/C.O.R.K.S.png" alt="C.O.R.K.S. Logo" className="navbar-logo" />
  </NavLink>
  <Container fluid>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/profile">
              My Account
            </Nav.Link>
            <Nav.Link as={NavLink} to="/winefeed">
              The Tasting Room
            </Nav.Link>
            <Nav.Link as={NavLink} to="/followers">
              Happy Hour
            </Nav.Link>
            <Nav.Link as={NavLink} to="/winelist">
              Wine List
            </Nav.Link>

            {loggedIn &&
              (user.role === "merchant" || user.role === "admin") && (
                <Nav.Link as={NavLink} to="/admin">
                  Admin
                </Nav.Link>
              )}
          </Nav>
        </Navbar.Collapse>
        <Nav className="ml-auto">
          {loggedIn ? (
            <div className="d-flex align-items-center">
              <span className="nav-link">Welcome, {user.username}</span>
              <Nav.Link
                as={NavLink}
                to="/login"
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("token");
                  setLoggedIn(false);
                  setUser(null);
                }}
              >
                Log Out
              </Nav.Link>
            </div>
          ) : (
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
