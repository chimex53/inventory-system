import React, { useEffect, useState } from "react";
import api from "../axios/axios"; // Adjust the import path as necessary
import { useNavigate, Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/getUser")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const logout = async () => {
    await api.get("/users/logout");
    navigate("/login");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Welcome back, {user.name}! 👋</h2>
        
        <div className={styles.userInfo}>
          <img src={user.photo || "https://via.placeholder.com/80x80"} alt="User Avatar" className={styles.avatar} />
          <div className={styles.userDetails}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userEmail}>📧 {user.email}</div>
            <div className={styles.userPhone}>📱 {user.phone || "No phone number"}</div>
            <div className={styles.userBio}>💬 {user.bio || "No bio available"}</div>
          </div>
        </div>

        <div className={styles.navLinks}>
          <Link to="/products" className={styles.navLink}>📦 Products</Link>
          <Link to="/contact" className={styles.navLink}>📞 Contact Us</Link>
          <Link to="/profile-edit" className={styles.navLink}>👤 Edit Profile</Link>
        </div>

        <button className={styles.logoutBtn} onClick={logout}>
          🚪 Logout
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>📊</div>
          <div className={styles.statLabel}>Dashboard</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>📦</div>
          <div className={styles.statLabel}>Products</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>📞</div>
          <div className={styles.statLabel}>Contact</div>
        </div>
      </div>
    </div>
  );
}
