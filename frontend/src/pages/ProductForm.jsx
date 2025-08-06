import React, { useState, useEffect } from "react";
import api from "../axios/axios"; // Adjust the import path as necessary
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductForm.module.css";
/* import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"; */

export default function ProductForm({ edit }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    sku: "",
    quantity: "",
    image: null,
  });

  const [loading, setLoading] = useState(edit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (edit && id) {
      api
        .get(`/products/${id}`)
        .then((res) => {
          const {
            name,
            price,
            description,
            category,
            sku,
            quantity,
          } = res.data;
          setForm({
            name,
            price,
            description,
            category,
            sku,
            quantity,
            image: null,
          });
        })
        .catch(() => navigate("/products"))
        .finally(() => setLoading(false));
    }
  }, [edit, id, navigate]);

  const onChange = (e) => {
    if (e.target.name === "image") {
      setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      for (const key in form) {
        if (key === "image" && form.image) {
          data.append("image", form.image);
        } else if (key !== "image") {
          data.append(key, form[key]);
        }
      }

      if (edit) {
        await api.patch(`/products/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>
          {edit ? "✏️ Edit Product" : "➕ Add New Product"}
        </h2>
        <p className={styles.description}>
          {edit 
            ? "Update your product information. All changes will be saved immediately."
            : "Create a new product to add to your inventory. Fill in all required fields."
          }
        </p>
        
        {error && <p className={styles.errorMsg}>❌ {error}</p>}
        
        <form onSubmit={onSubmit} className={styles.form} encType="multipart/form-data">
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>📦 Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={onChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>💰 Price</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={form.price}
                onChange={onChange}
                step="0.01"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>📝 Description</label>
            <textarea
              name="description"
              placeholder="Describe your product..."
              rows={4}
              value={form.description}
              onChange={onChange}
              className={styles.textarea}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>📂 Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g., Electronics, Clothing"
                value={form.category}
                onChange={onChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>🏷️ SKU</label>
              <input
                type="text"
                name="sku"
                placeholder="Stock Keeping Unit"
                value={form.sku}
                onChange={onChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>📊 Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Available stock"
                value={form.quantity}
                onChange={onChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>🖼️ Product Image</label>
              <div className={styles.fileInput}>
                <input
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={onChange}
                  id="image-upload"
                />
                <label htmlFor="image-upload" className={styles.fileInputLabel}>
                  📁 Choose Image File
                </label>
              </div>
            </div>
          </div>

          <div className={styles.actionBtns}>
            <button type="submit" className={styles.submitBtn}>
              {edit ? "💾 Update Product" : "➕ Create Product"}
            </button>
            <button 
              type="button" 
              className={styles.cancelBtn} 
              onClick={() => navigate("/products")}
            >
              ❌ Cancel
            </button>
          </div>
        </form>

        <div className={styles.previewSection}>
          <h3 className={styles.previewTitle}>👀 Product Preview</h3>
          <div className={styles.previewContent}>
            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>Name</div>
              <div className={styles.previewValue}>{form.name || "Product Name"}</div>
            </div>
            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>Price</div>
              <div className={styles.previewValue}>${form.price || "0.00"}</div>
            </div>
            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>Category</div>
              <div className={styles.previewValue}>{form.category || "Category"}</div>
            </div>
            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>SKU</div>
              <div className={styles.previewValue}>{form.sku || "SKU"}</div>
            </div>
            <div className={styles.previewItem}>
              <div className={styles.previewLabel}>Quantity</div>
              <div className={styles.previewValue}>{form.quantity || "0"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
