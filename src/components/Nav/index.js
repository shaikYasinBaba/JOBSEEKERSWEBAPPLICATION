import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      // Read users from localStorage jobseekerDB
      const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { users: [] };
      const currentUser = db.users.find((u) => u.id.toString() === userId);
      if (currentUser) {
        setUserRole(currentUser.role);
      } else {
        // UserId stored but no user found - logout
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setUserRole(null);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">JobTracker</div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        {isLoggedIn && userRole === "jobseeker" && (
          <li>
            <Link to="applied-jobs">Jobs Applied</Link>
          </li>
        )}

        {isLoggedIn && userRole === "employer" && (
          <>
            <li>
              <Link to="/addjob">Add Job</Link>
            </li>
            <li>
              <Link to="/jobseekers">Job Seekers</Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}

        {!isLoggedIn ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <button className="nav-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}

{!isLoggedIn && (
          
           <li> 
        <Link to="/About">About</Link>
        </li>
          
        )}
        
      </ul>
    </nav>
  );
};

export default Navbar;
