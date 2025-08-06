import React, { useState } from "react";
import api from "../axios/axios"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/forgotPassword", { email });
      setMessage(res.data.message);
      setEmail(""); // Clear email field after successful submission
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Forgot Password</h2>
      {message && <p className={`${styles.message} ${styles.success}`}>{message}</p>}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {loading && <LoadingSpinner />}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
      <p className={styles.linkText}>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}
