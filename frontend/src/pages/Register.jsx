import React, { useState } from "react";
import api from "../axios/axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const getPasswordStrength = (password) => {
    if (!password) return { strength: "weak", color: "strengthWeak" };
    if (password.length < 6) return { strength: "weak", color: "strengthWeak" };
    if (password.length < 10) return { strength: "medium", color: "strengthMedium" };
    return { strength: "strong", color: "strengthStrong" };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (res.data.token) navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        <div className={styles.header}>
          <h2 className={styles.title}>👤 Create Account</h2>
          <p className={styles.subtitle}>Join us to start managing your inventory</p>
        </div>
        
        {error && <p className={styles.errorMsg}>❌ {error}</p>}
        
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>👤 Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={onChange}
              className={styles.input}
              required
              autoComplete="name"
              disabled={loading}
            />
          </div>
          
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
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>🔒 Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={onChange}
              className={styles.input}
              required
              autoComplete="new-password"
              disabled={loading}
            />
            {form.password && (
              <div className={styles.passwordStrength}>
                <div>Password strength: {passwordStrength.strength}</div>
                <div className={styles.strengthBar}>
                  <div className={`${styles.strengthFill} ${styles[passwordStrength.color]}`}></div>
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>🔐 Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={onChange}
              className={styles.input}
              required
              autoComplete="new-password"
              disabled={loading}
            />
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "🔄 Creating Account..." : "🚀 Create Account"}
          </button>
        </form>
        
        <div className={styles.links}>
          <Link to="/login" className={styles.link}>
            🔐 Already have an account? Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
