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

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Which Is The One</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link active" to="/">Home</Link>
                </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/categories">Categories</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/tags">Tags</Link>
            </li>
            <li class="nav-item">
              <Search/>
            </li>
          </ul>


      <button class="btn btn-primary" onClick={handleLogOut}>Log out</button>



          </div>
        </nav>
  );
}
