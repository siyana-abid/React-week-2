
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/users"
      );

      const existingUser = response.data.find(
        (item) =>
          item.email?.trim().toLowerCase() ===
          email.trim().toLowerCase()
      );

      if (existingUser) {
        setMessage("Email already registered. Please login.");
        return;
      }

      await axios.post("http://localhost:3000/users", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please start JSON Server.");
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
