import React, { useState } from "react";
import { sendResetEmail } from "./API";
import { useNavigate } from "react-router-dom";


const LoginEnterEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await sendResetEmail(email); // Call your API function
      if (result.message === "Password reset email sent") {
        setMessage("Password reset email sent successfully!");
      }
      if(result.message === "Email not found"){
        setMessage("Email not found, please double check it or sign up!")
      }
    } catch (error) {
      setMessage("An error occurred while sending the password reset email.");
      console.error(error);
    }
  };

  return (
    <div className="text-center pt-5 pb-5">
      <h2>Password Reset</h2>
      <h6>Forgot your email? No worries, we all forget it sometimes. <br></br>Enter your email you made the account with and we'll send you a link to reset it. </h6>
      <p>{message}</p>
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", maxWidth: "300px", margin: "auto", backgroundColor: "#F4E7D3" }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{marginRight: "10px"}}>Enter your email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          style={{marginRight: "10px", marginBottom: "15px"}}
        />
        <br></br>
        <button type="submit">Submit</button>
        <button onClick={()=>{navigate("/login")}} style={{marginLeft: "10px"}}>Log In</button>
      </form>
      </div>

    </div>
  );
};

export default LoginEnterEmail;
