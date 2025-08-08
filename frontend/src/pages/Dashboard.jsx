import React, { useEffect, useState } from "react";
import api from "../axios/axios"; // Adjust the import path as necessary
import { useNavigate, Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, productsRes] = await Promise.all([
          api.get("/users/getUser"),
          api.get("/products")
        ]);
        setUser(userRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Error fetching dashboard data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const displayProducts = products.slice(0, 5); // Show only first 5 products
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const inStockCount = products.filter(p => p.quantity > 0).length;

  const logout = async () => {
    try {
      await api.get("/users/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <div>Error loading user data</div>;

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Welcome back, {user.name}! 👋</h2>
        <div className={styles.userInfo}>
          <img 
            src={user.photo || "https://via.placeholder.com/100x100"} 
            alt="User Avatar" 
            className={styles.avatar} 
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/100x100";
            }}
          />
          <div className={styles.userDetails}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userEmail}>📧 {user.email}</div>
            {user.phone && <div className={styles.userPhone}>📱 {user.phone}</div>}
            {user.bio && <div className={styles.userBio}>💬 {user.bio}</div>}
          </div>
          <div className={styles.navLinks}>
            <Link to="/products" className={styles.navLink}>📦 Products</Link>
            <Link to="/contact" className={styles.navLink}>📞 Contact Us</Link>
            <Link to="/profile-edit" className={styles.navLink}>👤 Edit Profile</Link>
            <button className={styles.logoutBtn} onClick={logout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statNumber}>{products.length}</div>
          <div className={styles.statLabel}>Total Products</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statNumber}>{inStockCount}</div>
          <div className={styles.statLabel}>In Stock</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statNumber}>${totalValue.toLocaleString()}</div>
          <div className={styles.statLabel}>Total Value</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📞</div>
          <div className={styles.statNumber}>24/7</div>
          <div className={styles.statLabel}>Support</div>
        </div>
      </div>

      {displayProducts.length > 0 && (
        <div className={styles.recentProducts}>
          <h3 className={styles.sectionTitle}>📦 Recent Products</h3>
          <div className={styles.productsGrid}>
            {displayProducts.map((product) => (
              <div key={product._id} className={styles.productCard}>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productPrice}>
                  ${Number(product.price || 0).toFixed(2)}
                </div>
                <div className={styles.productQuantity}>
                  Qty: {product.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
