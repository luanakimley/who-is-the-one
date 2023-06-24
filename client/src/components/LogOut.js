import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function LogOut() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const navigate = useNavigate();

  removeCookie("userId");

  useEffect(() => {
    navigate("/login");
  }, [navigate]); // Empty dependency array to run the effect only once
}
