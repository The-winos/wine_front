import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const CustomNavbar = ({ setLoggedIn, loggedIn, user, setUser }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef();

  const closeMenu = () => setExpanded(false);

  const handleLinkClick = () => {
    if (navRef.current) {
      const navCollapse = navRef.current.querySelector(".navbar-collapse");
      if (navCollapse) {
        navCollapse.classList.remove("show");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <Navbar
      className="custom-navbar"
      expand="lg"
      sticky="top"
      expanded={expanded}
      onSelect={closeMenu}
      ref={navRef}
    >
      <Container fluid className="p-0">
        <div className="d-flex justify-content-between">
          <div className="d-flex mr-auto">
            <div className="mr-4">
              <NavLink to="/">
                <img
                  src="/images/C.O.R.K.S.png"
                  alt="C.O.R.K.S. Logo"
                  className="navbar-logo"
                />
              </NavLink>
            </div>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="hamburger"
              onClick={() => setExpanded(!expanded)}
            />
          </div>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="p-3 bg-custom"
          >
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} to="/" onSelect={closeMenu}>
                Home
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={NavLink} to="/profile" onSelect={closeMenu}>
                    My Account
                  </Nav.Link>
                </>
              ) : null}
              <Nav.Link as={NavLink} to="/winefeed" onSelect={closeMenu}>
                The Tasting Room
              </Nav.Link>
              <Nav.Link as={NavLink} to="/followers" onSelect={closeMenu}>
                Happy Hour
              </Nav.Link>
              <Nav.Link as={NavLink} to="/winelist" onSelect={closeMenu}>
                Wine List
              </Nav.Link>
              {user ? (
                <>
                  {loggedIn && (user.role === "merchant" || user.role === "admin") && (
                    <Nav.Link as={NavLink} to="/admin" onSelect={closeMenu}>
                      Admin
                    </Nav.Link>
                  )}
                </>
              ) : null}
              {loggedIn && user ? (
                <div className="welcomeName d-lg-flex">
                  <span className="nav-link d-none d-lg-block">
                    Welcome, {user.username}
                  </span>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    onClick={() => {
                      navigate("/login");
                      localStorage.removeItem("token");
                      setLoggedIn(false);
                      setUser(null);
                    }}
                    onSelect={closeMenu}
                  >
                    Log Out
                  </Nav.Link>
                </div>
              ) : (
                <div className="welcomeName">
                  <Nav.Link as={NavLink} to="/login" onSelect={closeMenu}>
                    Login
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
