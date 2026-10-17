
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/users"
      );

      const user = response.data.find(
        (item) =>
          item.email?.trim().toLowerCase() ===
            email.trim().toLowerCase() &&
          String(item.password).trim() === password.trim()
      );

      if (!user) {
        setMessage("Account not found or incorrect password");
        return;
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userId", user.id);

      onLogin();
      navigate("/home", { replace: true });

    } catch (error) {
      console.error(error);
      setMessage("Server error. Check JSON Server.");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>

      <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
