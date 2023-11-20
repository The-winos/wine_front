import React, { useState } from "react";
import { updateForgottenPassword } from "./API";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginResetPasswordForm = ({ resetToken }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [passwordBlock, setPasswordBlock]= useState(true)

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const updatePass= await updateForgottenPassword(resetToken, password)
      console.log(updatePass)
      if(updatePass){
        console.log("hello")

        setMessage("Password has been updated");
        setPasswordBlock(false)


      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="text-center pt-5 pb-5">
      {passwordBlock ? (
        <>
          <h2>Reset Your Password</h2>
          <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", maxWidth: "300px", margin: "auto", backgroundColor: "#F4E7D3" }}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="password" style={{ marginTop: "10px" }}>New Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />

              <label htmlFor="confirmPassword" style={{ marginTop: "10px" }}>Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />

              <button type="submit" style={{ marginTop: "10px" }}>Reset Password</button>
            </form>
            <p>{message}</p>
          </div>
        </>
      ) : (<>
        <h3>{message}</h3>
        <h4 className="text-center text-primary text-decoration-none" onClick={() => { navigate("/login") }}style={{cursor:"pointer"}}>
  Login  🥂
</h4>

      </>)}
      {console.log(message)}
    </div>
  );

};

export default LoginResetPasswordForm;
