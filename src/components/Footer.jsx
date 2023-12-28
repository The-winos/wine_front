import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <ul className="list-unstyled">
              <li>
                <NavLink className="sub-helplinks" to="/footeraboutus">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink className="sub-helplinks" to="/footercontact">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-4">
            <ul className="list-unstyled">
              <li>
                <NavLink className="sub-helplinks" to="/privacy">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink className="sub-helplinks" to="/terms">
                  Terms of Service
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 d-md-none text-center">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} C.O.R.K.S. All rights reserved.
            </p>
          </div>
        </div>

        {/* For larger screens, show the "All rights reserved" text */}
        <div className="row d-none d-md-flex">
          <div className="col-md-12 text-center">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} C.O.R.K.S. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
