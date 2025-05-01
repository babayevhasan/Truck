import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Forgot.module.css";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Check your email for a link to reset your password.");
        navigate("/login");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.forgotContainer}>
      <form onSubmit={handleSubmit} className={styles.forgotForm}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>

        <p className={styles.linkText}>
          <Link to="/login" className={styles.link}>
            Go back to login
          </Link>
        </p>
      </form>
    </div>
  );
}
