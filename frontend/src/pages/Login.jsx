import React, { useState } from "react";
import api from "../axios/axios"; // Adjust the import path as necessary
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/users/login", form);
      if (res.data.token) navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h2 className={styles.title}>🔐 Welcome Back</h2>
          <p className={styles.subtitle}>Sign in to your account to continue</p>
        </div>
        
        {error && <p className={styles.errorMsg}>❌ {error}</p>}
        
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>📧 Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={onChange}
              className={styles.input}
              required
              autoComplete="email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>🔒 Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={onChange}
              className={styles.input}
              required
              autoComplete="current-password"
            />
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            🚀 Sign In
          </button>
        </form>
        
        <div className={styles.links}>
          <Link to="/forgot-password" className={styles.link}>
            🔑 Forgot your password?
          </Link>
          
          <div className={styles.divider}>
            <span>or</span>
          </div>
          
          <Link to="/register" className={styles.link}>
            👤 Don't have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
