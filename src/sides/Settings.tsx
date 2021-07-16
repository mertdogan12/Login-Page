import {
  useHistory,
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { CheckCookie } from "../apis/Cookies";
import Usersettings from "./usersettings/Usersettings";

function Settings() {
  let history = useHistory();

  if (!CheckCookie("jwttoken")) history.push("/auth/login");

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
          <Route path="*/test">
            <p className="settingselemtent">test</p>
          </Route>
          <Redirect to="/dashboard/settings/usersettings" />
        </Switch>
      </Router>
    </div>
  );
}

export default Settings;
