import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">

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

          <div className="col-md-4">

            <ul className="list-unstyled">
              <li>
                <NavLink className="sub-helplinks" to="/privacy">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink className="sub-helplinks" to="/termsofservice">
                  Terms of Service
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <p className="text-muted text-center mb-0">
              &copy; {new Date().getFullYear()} C.O.R.K.S. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
