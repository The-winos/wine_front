import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./API/index";

const Register = () => {
  const {
    state: { address_id },
  } = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    const { token, message } = await registerUser(
      username,
      password,
      name,
      false,
      email,
      address_id
    );
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    if (token) {
      useNavigate("login");
    }
  }

  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          className="register-line"
          type="text"
          name="username"
          placeholder="username *"
          required
          value={username}
          onChange={function (event) {
            setUsername(event.target.value);
          }}
        />
        <br />
        <input
          className="register-line"
          type="text"
          name="name"
          placeholder="name *"
          required
          value={name}
          onChange={function (event) {
            setName(event.target.value);
          }}
        />
        <br />
        <input
          className="register-line"
          type="text"
          name="email"
          placeholder="email *"
          required
          value={email}
          onChange={function (event) {
            setEmail(event.target.value);
          }}
        />
        <br />
        <input
          className="register-line"
          type="password"
          name="password"
          placeholder="password *"
          required
          value={password}
          onChange={function (event) {
            setPassword(event.target.value);
          }}
        />
        <br />
        <small>*password must be 8 characters or more</small>
        <br />

        <button className="buttons" type="submit">
          Register
        </button>
      </form>

      <br />
      <h3>Exiting User</h3>
      <Link to="/login" className="link">
        Login
      </Link>
    </div>
  );
};

export default Register;
