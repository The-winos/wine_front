import React, { useState } from "react";
import { sendResetEmail } from "./API";


const LoginEnterEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entered handleSubmit")
    try {
      const result = await sendResetEmail(email); // Call your API function
      if (result.message === "Password reset email sent") {
        setMessage("Password reset email sent successfully!");
      }
      if(result.message === "Email not found"){
        setMessage("Email not found, please double check or sign up!")
      }
    } catch (error) {
      setMessage("An error occurred while sending the password reset email.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
      {console.log(message, "this is message")}
    </div>
  );
};

export default LoginEnterEmail;
