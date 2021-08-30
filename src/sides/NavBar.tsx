import { Link } from "react-router-dom";
import { CheckCookie, DeleteCookie } from "../apis/Cookies";
import Back from "./Back";

export default function NavBar() {
  function logout() {
    DeleteCookie("jwttoken");
  }

  let BackElement = () => {
    return (
      <div>
        <Back className="navbarLink" />
        <Link
          style={{ float: "left" }}
          className="navbarLink"
          to="/dashboard/start"
        >
          Home
        </Link>
      </div>
    );
  };

  if (CheckCookie("jwttoken")) {
    return (
      <div id="navbar">
        <BackElement />
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
        <BackElement />
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
