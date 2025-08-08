import React, { useState } from "react";
import api from "../axios/axios"; // Adjust the import path as necessary
import styles from "./Contact.module.css";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";

export default function Contact() {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setLoading(true);

    try {
      const res = await api.post("/contactUs", form);
      if (res.data.success) {
        setStatus("Email sent successfully!");
        setForm({ subject: "", message: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contactCard}>
        <h2 className={styles.title}> Contact Us</h2>
        <p className={styles.description}>
          Have a question or need assistance? We'd love to hear from you! Send us a message and we'll respond as soon as possible.
        </p>
        
        {loading && <LoadingSpinner />}
        {status && <p className={`${styles.statusMsg} ${styles.success}`}>✅ {status}</p>}
        {error && <p className={`${styles.statusMsg} ${styles.error}`}>❌ {error}</p>}
        
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={form.subject}
              onChange={onChange}
              className={styles.input}
              required
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Message</label>
            <textarea
              name="message"
              placeholder="Tell us more about your inquiry..."
              value={form.message}
              onChange={onChange}
              className={styles.textarea}
              required
              disabled={loading}
            ></textarea>
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? " Sending..." : " Send Message"}
          </button>
        </form>
        
        <div className={styles.contactInfo}>
          <h3>📋 Contact Information</h3>
          <p>📧 Email: support@inventory.com</p>
          <p>📱 Phone: +1 (555) 123-4567</p>
          <p>🏢 Address: 123 Business St, City, State 12345</p>
          <p>⏰ Hours: Monday - Friday, 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );
}
