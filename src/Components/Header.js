import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <div>
            {/* Bootstrap Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    {/* Brand Name / Home link */}
                    <a
                        href='/'
                        className="navbar-brand"
                        // onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                    >
                        Order Record
                    </a>

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
                            {/* Add Packages Button */}
                            <li className="nav-item">
                                <button
                                    className="btn btn-link text-white"
                                    onClick={() => navigate('/addPackages')}
                                    style={{ textDecoration: 'none' }}
                                >
                                    Add Packages
                                </button>
                            </li>
                            {/* Add Client Button */}
                            <li className="nav-item">
                                <button
                                    className="btn btn-link text-white"
                                    onClick={() => navigate('/addClient')}
                                    style={{ textDecoration: 'none' }}
                                >
                                    Add Client
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;