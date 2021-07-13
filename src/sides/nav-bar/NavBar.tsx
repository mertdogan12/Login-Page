import "./style.css";
import { Link } from "react-router-dom";
import { CheckCookie, DeleteCookie } from "../../apis/Cookies";

export default function NavBar() {
  function logout() {
    DeleteCookie("jwttoken");
  }

  if (CheckCookie("jwttoken")) {
    return (
      <div className="navbar">
        <Link className="link" to="/auth/login" onClick={logout}>
          Logout
        </Link>
        <Link className="link" to="/dashboard/settings">
          Settings
        </Link>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <Link className="link" to="/auth/login">
          Login
        </Link>
        <Link className="link" to="/auth/register">
          Register
        </Link>
      </div>
    );
  }
}
