import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeCookie("userId");
    navigate("/login");
  };

  return (
    <nav className="fixed-top bg-white navbar navbar-expand-lg bg-body-tertiary rounded">
      <div className="container-fluid">
        <a className="navbar-brand col-lg-3 me-0" href="/">
          <div>
            <span class="fs-3 heading">WITO: &ensp;</span>
            <span class="question">Who is the one?</span>
          </div>
        </a>
        <div
          className="collapse navbar-collapse d-lg-flex"
          id="navbarsExample11"
        >
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <h3>Home</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/categories">
                <h3>Categories</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/tags">
                <h3>All Tags</h3>
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-lg-flex align-items-center">
          <li className="nav-item">
            <Link className="nav-link active" to="/profile_page">
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
