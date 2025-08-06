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
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);

  const displayProducts = products.slice(0, 5); // Show only first 5 products
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

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
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statNumber}>{displayProducts.length || 0}</div>
          <div className={styles.statLabel}>Total Products</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statNumber}>{displayProducts.filter(p => p.quantity > 0).length || 0}</div>
          <div className={styles.statLabel}>In Stock</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statNumber}>${totalValue || 0}</div>
          <div className={styles.statLabel}>Total Value</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📞</div>
          <div className={styles.statNumber}>24/7</div>
          <div className={styles.statLabel}>Support</div>
        </div>
        
        {displayProducts.length > 0 && (
          <div className={styles.recentProducts}>
            <h3 className={styles.sectionTitle}>📦 Recent Products</h3>
            <div className={styles.productsGrid}>
              {displayProducts.map((product) => (
                <div key={product._id} className={styles.productCard}>
                  <div className={styles.productInfo}>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <p className={styles.productPrice}>${product.price}</p>
                    <p className={styles.productQuantity}>Qty: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
