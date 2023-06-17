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
      <Container fluid>
        <Navbar.Brand>
          <NavLink className="navbar-brand" to="/">
            C.O.R.K.S.
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/winefeed">
              The Tasting Room
            </NavLink>
            <NavLink className="nav-link" to="/followers">
              Happy Hour
            </NavLink>
            <NavLink className="nav-link" to="/winelist">
              Wine List
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              My Account
            </NavLink>
            {loggedIn &&
              (user.role === "merchant" || user.role === "admin") && (
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              )}
          </Nav>
        </Navbar.Collapse>
        <Nav className="float-right mr-4">
          {loggedIn && (
            <div className="ml-auto">
              <span className="nav-link">Welcome, {user.username}</span>
              <NavLink
                to={"/login"}
                className="nav-link"
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("token");
                  setLoggedIn(false);
                  setUser(null);
                }}
              >
                Log Out
              </NavLink>
            </div>
          )}
          {!loggedIn && (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
