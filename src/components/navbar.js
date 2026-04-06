import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import NewsIcon from "./NewsIcon";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div
        className="navbar-brand"
        to="/"
        style={{
          fontWeight: "bold",
          letterSpacing: "2px",
          marginLeft: "10px",
          color: "white",
        }}
      >
        <NewsIcon style={{ marginBottom: "5px", marginRight: "7px", marginLeft: "10px" }} />
        TAZA KHABAR
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto text-center">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/business">
              Business
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/entertainment">
              Entertainment
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/general">
              General
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/health">
              Health
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/science">
              Science
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/sports">
              Sports
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/technology">
              Technology
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
