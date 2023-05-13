import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({setLoggedIn, loggedIn, user, setUser}) => {
  const navigate = useNavigate();
  const [admin, setAdmin]= useState(false)

  return (<>
    <div id="navbar">
      <div className="links">
      <div id="username">
        {loggedIn ? <h5>Welcome, {`${user.username}`}</h5> : <h5>Please log in</h5>}
      </div>

      {loggedIn ? (
        <>
        {console.log(user, "this is user, look for role")}
        <NavLink to={"/"} className="linkBar" onClick={()=>{
          navigate("/login");
          localStorage.removeItem("token");
          setLoggedIn(false);
          setUser(null);
        }}>LogOut</NavLink>
        <NavLink className="linkBar" to="/">Home</NavLink>
        <NavLink className="linkBar" to="/profile">
          <span id="profile-hover" data-hover="my account">
            </span>
            Profile
        </NavLink>

        {loggedIn && user.role=="merchant" || user.role=="admin" ?(
          <NavLink className="linkBar" to= "/admin">
            <span id="admin-hover" data-hover="Admin"></span>Admin
          </NavLink>
        ): null}
        </>
      ):(
        <NavLink className= "linkBar" to="/login">Login</NavLink>
      )}
      <NavLink className="linkBar" to="/winefeed">The Tasting Room</NavLink>
      <NavLink className="linkBar" to="/followers">Happy Hour</NavLink>
      <NavLink className="linkBar" to="/winelist">Wine List</NavLink>
      </div>
    </div>
    </>
  );
};

export default Navbar;
