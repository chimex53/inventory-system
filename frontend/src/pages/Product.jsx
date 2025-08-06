import React, { useEffect, useState } from "react";
import api from "../axios/axios"; // Adjust the import path as necessary
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import styles from "./Product.module.css";

const PAGE_SIZE = 5;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
      setError("");
    } catch (error) {
      setError("Failed to load products");
      if (error.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by search
  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
    setPage(1);
  }, [search, products]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      alert("Delete failed.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const displayProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>📦 Your Products</h2>
        <Link to="/products/new" className={styles.addButton}>
          ➕ Add New Product
        </Link>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by name, category or SKU..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {displayProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>📦 No products found</h3>
          <p>Start by adding your first product to manage your inventory.</p>
        </div>
      ) : (
        <ul className={styles.productList}>
          {displayProducts.map(({ _id, name, price, category, sku }) => (
            <li key={_id} className={styles.productItem}>
              <div className={styles.productInfo}>
                <div className={styles.productName}>{name}</div>
                <div className={styles.productDetails}>
                  <span className={styles.productPrice}>💰 ${price}</span>
                  <span className={styles.productCategory}>📂 {category}</span>
                  <span className={styles.productSku}>🏷️ {sku}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/products/edit/${_id}`)}
                >
                  ✏️ Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteProduct(_id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            ⬅️ Prev
          </button>
          <span>
            📄 Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next ➡️
          </button>
        </div>
      )}

      <Link to="/" className={styles.backLink}>
        🏠 Back to Dashboard
      </Link>
    </div>
  );
}
