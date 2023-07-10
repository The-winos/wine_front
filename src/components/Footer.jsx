import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
      <NavLink className="sub-helplinks" to="/footercontact">
              Contact
            </NavLink>
            <NavLink className="sub-helplinks" to="/footeraboutus">
              About Us
            </NavLink>

      </div>
    </footer>
  );
};

export default Footer;
