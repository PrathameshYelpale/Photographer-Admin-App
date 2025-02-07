import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    async function checkAuth() {
      try {
        const response = await axios.get("http://localhost:5500/checkAuth", { withCredentials: true });
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  async function handleLogout() {
    try {
      await axios.post("http://localhost:5500/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      throw new Error("Error while logging out");
    }
  }

  return (
    <div>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          {/* Brand Name / Home link */}
          {isLoggedIn ? (
            <a
              href="/dashboard"
              className="navbar-brand"
              style={{ cursor: "pointer" }}
            >
              Order Record
            </a>
          ) : (
            <a
              href="/"
              className="navbar-brand"
              style={{ cursor: "pointer" }}
            >
              Order Record
            </a>
          )}

          {/* Toggle button for mobile view */}
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

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              {isLoggedIn ? (
                <li className="nav-item">
                  <button
                    className="btn btn-link text-white"
                    onClick={() => navigate('/addPackages')}
                    style={{ textDecoration: 'none' }}
                  >
                    Add Packages
                  </button>
                </li>
              ) : (
                null
              )}

              {isLoggedIn ? (
                <li className="nav-item">
                  <button
                    className="btn btn-link text-white"
                    onClick={() => navigate("/addClient")}
                    style={{ textDecoration: "none" }}
                  >
                    Add Client
                  </button>
                </li>
              ) : (
                null
              )}

              {isLoggedIn ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/myAccount">My Account</Link></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="btn text-white" to="/login">Sign In</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;