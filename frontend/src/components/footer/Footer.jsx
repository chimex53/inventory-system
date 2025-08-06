import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          © {currentYear} Inventory System. All rights reserved.
        </div>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>
            📞 Support
          </a>
          <a href="#" className={styles.footerLink}>
            📋 Privacy Policy
          </a>
          <a href="#" className={styles.footerLink}>
            📄 Terms of Service
          </a>
        </div>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink} title="Facebook">
            📘
          </a>
          <a href="#" className={styles.socialLink} title="Twitter">
            🐦
          </a>
          <a href="#" className={styles.socialLink} title="LinkedIn">
            💼
          </a>
        </div>
      </div>
    </footer>
  );
}
