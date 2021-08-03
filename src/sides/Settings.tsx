import {
  useHistory,
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { CheckCookie, GetCookie } from "../apis/Cookies";
import { HasPermission } from "../apis/authServer/Permission";
import { Jwt } from "../apis/authServer/Users";
import Usersettings from "./usersettings/Usersettings";
import Users from "./adminsettings/Users";

function Settings() {
  let history = useHistory();
  let token = GetCookie("jwttoken");

  if (!CheckCookie("jwttoken")) history.push("/auth/login");

  async function CheckPermission() {
    try {
      if (
        !(await HasPermission((await Jwt(token)).id, "adminsettings.?", token))
      )
        history.push("/dashboard/settings/usersettings");
    } catch (e) {
      history.push("/dashboard/settings/usersettings");
    }
  }

  return (
    <div id="settings">
      <Router>
        <ul id="sidebar">
          <li>
            <Link
              className="settingslink"
              to="/dashboard/settings/usersettings"
            >
              Usersettings
            </Link>
          </li>
          <li>
            <Link className="settingslink" to="/dashboard/settings/test">
              Test
            </Link>
          </li>
        </ul>
        <Switch>
          <Route path="*/usersettings">
            <Usersettings />
          </Route>
          <Route path="/dashboard/settings/adminssettings/*">
            <Router>
              {CheckPermission()}
              <Route path="*/users">
                <Users />
              </Route>
            </Router>
          </Route>
          <Redirect to="/dashboard/settings/usersettings" />
        </Switch>
      </Router>
    </div>
  );
}

export default Settings;
