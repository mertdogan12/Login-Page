import "./style.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <Link id="link" to="/auth/login">
        Login
      </Link>
    </div>
  );
}
