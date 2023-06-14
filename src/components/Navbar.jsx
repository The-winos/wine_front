import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const CustomNavbar = ({ setLoggedIn, loggedIn, user, setUser }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Nav className="mr-auto" style={{ width: "70%" }}>
          <NavLink className="nav-link flex-grow-1" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link flex-grow-1" to="/winefeed">
            The Tasting Room
          </NavLink>
          <NavLink className="nav-link flex-grow-1" to="/followers">
            Happy Hour
          </NavLink>
          <NavLink className="nav-link flex-grow-1" to="/winelist">
            Wine List
          </NavLink>
          {loggedIn && (user.role === "merchant" || user.role === "admin") && (
            <NavLink className="nav-link flex-grow-1" to="/admin">
              Admin
            </NavLink>
          )}
        </Nav>
        <Nav className="ml-auto">
          {loggedIn && (
            <div>
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
