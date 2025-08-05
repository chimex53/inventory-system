import React from 'react';
import { Link } from "react-router-dom";
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <header>
        <nav className="container --flex-between">
          <div className="logo">
            {/* You can add a logo image or SVG here */}
            <h1>InventoryPro</h1>
          </div>
          <ul className='home-links'>
            <li><Link to="/register" className="btn-link">Register</Link></li>
            <li><Link to="/login" className="btn-primary">Login</Link></li>
            <li><Link to="/dashboard" className="btn-primary">Dashboard</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className='container hero'>
          <div className="hero-text">
            <h2>Efficient Inventory Management</h2> 
            <p>Streamline your stock, orders, and sales all in one place.</p>
            <div className="hero-buttons">
              <button className='--btn --btn-secondary'>Start your free 1 month trial</button>
            </div>
          </div>
          
          {/* Placeholder for hero image/illustration */}
          <div className="hero-image" aria-hidden="true">
            {/* Add an SVG or image here */}
          </div>
        </section>

        <section className='container stats'>
          <div className="stat-item">
            <div className="number">80,000+</div>
            <div className="label">Brand Owners</div>
          </div>
          <div className="stat-item">
            <div className="number">12,000+</div>
            <div className="label">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="number">50+</div>
            <div className="label">Countries Served</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
