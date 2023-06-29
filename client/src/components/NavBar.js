import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeCookie("userId");
    navigate("/login");
  };

  const test = () => {
    console.log(pathname);
  };

  return (
    <nav className="fixed-top bg-white navbar navbar-expand-lg bg-body-tertiary rounded">
      <div className="container-fluid">
        <a className="navbar-brand col-lg-3 me-0" href="/">
          <div>
            <span className="fs-3 heading">WITO: &ensp;</span>
            <span className="question">Who is the one?</span>
          </div>
        </a>
        <div
          className="collapse navbar-collapse d-lg-flex"
          id="navbarsExample11"
        >
          <ul className="navbar-nav col-lg-6 justify-content-lg-center gap-4 align-items-center">
            <li onClick={test} className="nav-item">
              <Link className={pathname === "/" ? "" : "nav-link"} to="/">
                <h3>Home</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={pathname === "/categories" ? "" : "nav-link"}
                to="/categories"
              >
                <h3>Categories</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={pathname === "/tags" ? "" : "nav-link"}
                to="/tags"
              >
                <h3>All Tags</h3>
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-lg-flex align-items-center gap-4">
          <li className="nav-item">
            <Link
              className={pathname === "/profile_page" ? "" : "nav-link"}
              to="/profile_page"
            >
              <h4>Profile</h4>
            </Link>
          </li>
          <button className="btn btn-primary ml-5" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
