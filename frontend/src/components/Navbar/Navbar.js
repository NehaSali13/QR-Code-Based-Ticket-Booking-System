import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import monkeyImg from "../../assets/img/monkey.jpg";  // ✅ Correct path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">Nrupatunga Betta</h2>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/location" onClick={() => setMenuOpen(false)}>Location</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Monkey image below the navbar */}
      <div className="monkey-container">
        <img src={monkeyImg} alt="Monkey" className="monkey-img" />
      </div>
    </>
  );
};

export default Navbar;
