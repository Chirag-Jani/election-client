import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Election Management
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/"
                >
                  Elections
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link className="btn btn-primary mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary mx-1" to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <button
                  className="btn btn-danger mx-1"
                  onClick={() => {
                    alert("Logged out Successfully", "success");
                    // props.showAlert("Logged out Successfully", "success");
                    navigate("/login");
                    localStorage.clear("token");
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
