import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const CustomNavbar = ({ setLoggedIn, loggedIn, user, setUser }) => {
  const navigate = useNavigate();

  return (
    <Navbar className="custom-navbar" expand="lg" sticky="top">
      <Container fluid className="p-0">
        <div className="d-flex justify-content-between">
        <div className="d-flex mr-auto">
          <div className="mr-4">
            <NavLink to="/">
              <img src="/images/C.O.R.K.S.png" alt="C.O.R.K.S. Logo" className="navbar-logo" />
            </NavLink>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="hamburger"/>
          </div>
          <Navbar.Collapse id="responsive-navbar-nav" className="p-3 bg-custom">
            <Nav className="ml-auto">
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
              {loggedIn && (user.role === "merchant" || user.role === "admin") && (
                <Nav.Link as={NavLink} to="/admin">
                  Admin
                </Nav.Link>
              )}
              {loggedIn ? (
                <div className="welcomeName d-lg-flex">
                  <span className="nav-link d-none d-lg-block">Welcome, {user.username}</span>
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
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
