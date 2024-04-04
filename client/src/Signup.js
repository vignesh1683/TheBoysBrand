import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import blogo from "./assects/logo.png";
import "./styles/Login.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/signup",
        { username, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Signup successful:", response.data);
        localStorage.setItem("token", response.data.token);
        console.log(
          "Token is stored in Local Storage",
          localStorage.getItem("token")
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        <img src={blogo} alt="Logo" />
        <h1>Signup</h1>
        <label for="User">Username:</label>
        <input
          type="text"
          id="User"
          className="User"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label for="password">Password:</label>
        <input
          type="password"
          className="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label for="password">ConfirmPassword:</label>
        <input
          type="password"
          className="password"
          id="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="lbutton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
