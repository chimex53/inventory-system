import React from "react";
import styles from "./Header.module.css";

export default function Header({ toggleSidebar }) {
  return (
    <header className={styles.header}>
      <button
        className={styles.menuBtn}
        aria-label="Toggle Navigation Menu"
        onClick={toggleSidebar}
      >
        &#9776;
      </button>
      <h1 className={styles.title}>Inventory System</h1>
    </header>
  );
}
