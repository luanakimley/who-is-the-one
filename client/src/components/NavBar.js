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

    <nav class="navbar navbar-expand-lg bg-body-tertiary rounded">
          <div class="container-fluid">
        <a class="navbar-brand col-lg-3 me-0" href="/"><h2>Which Is The One?</h2></a>


        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
        <ul class="navbar-nav col-lg-6 justify-content-lg-center">
                <li class="nav-item">
                  <Link class="nav-link active" to="/"><h3>Home</h3></Link>
                </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/categories"><h3>Categories</h3></Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" to="/tags"><h3>Tags</h3></Link>
            </li>
            <li class="nav-item">
              <Search/>
            </li>
          </ul>
</div>

      <button class="btn btn-primary" onClick={handleLogOut}>Log out</button>



          </div>
        </nav>
  );
}
