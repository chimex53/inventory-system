import React, { useState, useEffect } from "react";
import api from "../axios/axios"
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import styles from "./ProfileEdit.module.css";

export default function ProfileEdit() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bio: "",
    photo: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/getUser")
      .then((res) => {
        setForm({
          name: res.data.name,
          phone: res.data.phone || "",
          bio: res.data.bio || "",
          photo: res.data.photo || "",
        });
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const onChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("bio", form.bio);
      if (form.photo) {
        data.append("photo", form.photo);
      }

      await api.patch("/users/updateUser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h2 className={styles.title}>👤 Edit Profile</h2>
        <p className={styles.description}>
          Update your personal information and profile details. Your changes will be saved immediately.
        </p>
        
        {error && <p className={styles.errorMsg}>❌ {error}</p>}
        {success && <p className={styles.successMsg}>✅ {success}</p>}
        
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>👤 Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              className={styles.input}
              required
              autoComplete="name"
              placeholder="Enter your full name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>📱 Phone Number</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={form.phone}
              onChange={onChange}
              className={styles.input}
              placeholder="+1234567890"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bio" className={styles.label}>💬 Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              maxLength="250"
              value={form.bio}
              onChange={onChange}
              className={styles.textarea}
              placeholder="Tell us a bit about yourself..."
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="photo" className={styles.label}>🖼️ Profile Photo</label>
            <div className={styles.fileInput}>
              <input
                type="file"
                name="photo"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onChange}
                id="photo-upload"
                className={styles.fileInputHidden}
              />
              <label htmlFor="photo-upload" className={styles.fileInputLabel}>
                📁 Choose Photo
              </label>
            </div>
            {form.photo && (
              <div className={styles.photoPreview}>
                <img 
                  src={URL.createObjectURL(form.photo)} 
                  alt="Profile Preview" 
                  className={styles.previewImage}
                />
                <span className={styles.fileName}>{form.photo.name}</span>
              </div>
            )}
          </div>

          <div className={styles.actionBtns}>
            <button type="submit" className={styles.saveBtn}>
              💾 Save Changes
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate("/")}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
        
        <div className={styles.profilePreview}>
          <h3 className={styles.previewTitle}>👀 Profile Preview</h3>
          <div className={styles.previewContent}>
            <img 
              src={form.photo || "https://via.placeholder.com/60x60"} 
              alt="Profile Preview" 
              className={styles.previewAvatar}
            />
            <div className={styles.previewInfo}>
              <div className={styles.previewName}>{form.name || "Your Name"}</div>
              <div className={styles.previewDetails}>
                {form.phone ? `📱 ${form.phone}` : "📱 No phone number"}
              </div>
              <div className={styles.previewDetails}>
                {form.bio ? `💬 ${form.bio.substring(0, 50)}${form.bio.length > 50 ? '...' : ''}` : "💬 No bio yet"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
