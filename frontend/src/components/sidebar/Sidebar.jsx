import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <nav
      className={`${styles.sidebarContainer} ${
        isOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
      aria-label="Main Navigation"
    >
      <div className={styles.logo}>Inventory</div>
      <div className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} active` : styles.navLink
          }
          onClick={toggleSidebar}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} active` : styles.navLink
          }
          onClick={toggleSidebar}
        >
          Products
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} active` : styles.navLink
          }
          onClick={toggleSidebar}
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/profile-edit"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} active` : styles.navLink
          }
          onClick={toggleSidebar}
        >
          Edit Profile
        </NavLink>
      </div>
    </nav>
  );
}
