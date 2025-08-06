import React from "react";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ text = "Loading...", size = "medium" }) {
  const spinnerClass = size === "large" ? styles.spinnerLarge : 
                      size === "small" ? styles.spinnerSmall : 
                      styles.spinner;

  return (
    <div className={styles.spinnerContainer}>
      <div className={spinnerClass} aria-label="Loading"></div>
      {text && <div className={styles.spinnerText}>{text}</div>}
    </div>
  );
}
