import React, { useState } from "react";
import { updateForgottenPassword } from "./API";
import { Button } from "react-bootstrap";

const LoginResetPasswordForm = ({ resetToken }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

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
      if(updatePass){
        setMessage("Password has been updated");
        <div className="text-center">
                  Log in <Link to="/Login">now</Link> 🥂
                </div>
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginResetPasswordForm;
