import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies] = useCookies(["userId"]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/logout");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Which Is The One
        </a>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/categories">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/tags">
              Tags
            </Link>
          </li>
          <li className="nav-item">
            <Search />
          </li>
        </ul>

        <button className="btn btn-primary" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </nav>
  );
}
