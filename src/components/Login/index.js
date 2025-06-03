//src/componets/Login/index.js

import React, { useState } from "react";
import modelsFunc from "../models/modelsfunc" 

import "./index.css";

const Login = () => {
  const [mode, setMode] = useState("login"); // login or register
  const [role, setRole] = useState("jobseeker"); // jobseeker or employer
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    companyLinkedIn: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper to generate username from email
  const generateUsername = (email) => email.split("@")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = modelsFunc.read();
    if (mode === "register") {
      // Check if user with email already exists
      const userExists = db.users.some((u) => u.email === formData.email);
      if (userExists) {
        alert("User with this email already exists.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role,
        username: generateUsername(formData.email),
        number: "0000000000", // placeholder
        companyName: role === "employer" ? formData.companyName : undefined,
        companyLinkedIn: role === "employer" ? formData.companyLinkedIn : undefined,
      };

      db.users.push(newUser);
      modelsFunc.write(db);
      alert("Registered successfully!");
      // Optionally auto-login user after registration:
      localStorage.setItem("userId", newUser.id);
      window.location.href = "/profile";
    } else {
      // login mode
      const user = db.users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (!user) {
        alert("Invalid email or password");
        return;
      }
      alert("Logged in successfully!");
      localStorage.setItem("userId", user.id);
      window.location.href = "/";
    }
  };

  const isRegister = mode === "register";
  const isEmployer = role === "employer";

  return (
    <div className="auth-form-container">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <div className="dropdowns">
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="login">Login</option>
          <option value="register">Register</option>
        </select>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="jobseeker">Jobseeker</option>
          <option value="employer">Employer</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {isRegister && isEmployer && (
          <>
            <input
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <input
              type="url"
              placeholder="Company LinkedIn URL"
              name="companyLinkedIn"
              value={formData.companyLinkedIn}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

export default Login;
