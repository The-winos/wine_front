import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoginResetPasswordForm from "./LoginResetPasswordForm";

const LoginForgotPass = () => {
  const { resetToken } = useParams();
  const [tokenValid, setTokenValid] = useState(null); // Use state to track token validity

  const verifyResetToken = async () => {
    try {
      // Make an API request to your backend to validate the token
      const response = await fetch(`/api/verify-reset-token?token=${resetToken}`);
      if (response.ok) {
        // Token is valid, update state accordingly
        setTokenValid(true);
      } else {
        // Token is invalid, update state accordingly
        setTokenValid(false);
      }
    } catch (error) {
      console.error("Error verifying reset token:", error);
    }
  };

  useEffect(() => {
    // Verify the reset token when the component mounts
    verifyResetToken();
  }, []);

  return (
    <div id="loginForgotPass">
      {tokenValid === true && (
        // Render your reset password form when the token is valid
        <LoginResetPasswordForm resetToken={resetToken} />
      )}
      {tokenValid === false && (
        <p>Invalid or expired reset token. Please request a new one.</p>
      )}
      {tokenValid === null && (
        <p>Verifying token...</p>
      )}

    </div>
  );
};

export default LoginForgotPass;
