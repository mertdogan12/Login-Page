import { Link } from "react-router-dom";
import { CheckCookie, DeleteCookie } from "../apis/Cookies";

export default function NavBar() {
  function logout() {
    DeleteCookie("jwttoken");
  }

  if (CheckCookie("jwttoken")) {
    return (
      <div id="navbar">
        <Link className="navbarLink" to="/auth/login" onClick={logout}>
          Logout
        </Link>
        <Link className="navbarLink" to="/dashboard/settings/usersettings">
          Settings
        </Link>
      </div>
    );
  } else {
    return (
      <div id="navbar">
        <Link className="navbarLink" to="/auth/login">
          Login
        </Link>
        <Link className="navbarLink" to="/auth/register">
          Register
        </Link>
      </div>
    );
  }
}
