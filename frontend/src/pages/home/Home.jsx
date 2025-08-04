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

        <section className='container stats --flex-start'>
          <NumberText num="80,000+" text="Brand Owners" />
          <NumberText num="12,000+" text="Active Users" />
          <NumberText num="50+" text="Countries Served" />
        </section>
      </main>
    </div>
  );
}

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className='--color-white number'>{num}</h3>
      <p className='--color-white label'>{text}</p>
    </div>
  )
}

export default Home;
