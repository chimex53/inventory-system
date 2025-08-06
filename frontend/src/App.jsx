import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "../src/pages/Dashboard";
import Product from "./pages/Product";
import ProductForm from "./pages/ProductForm";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfileEdit from "./pages/ProfileEdit";

import api from "./axios/axios"
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    api
      .get("/users/loginStatus")
      .then((res) => setLoggedIn(res.data === true))
      .catch(() => setLoggedIn(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return loggedIn ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Layout>
                <Product />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <PrivateRoute>
              <Layout>
                <ProductForm />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoute>
              <Layout>
                <ProductForm edit />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Layout>
                <Contact />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile-edit"
          element={
            <PrivateRoute>
              <Layout>
                <ProfileEdit />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}
