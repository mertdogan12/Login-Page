import {
  useHistory,
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { CheckCookie, GetCookie } from "../apis/Cookies";
import Usersettings from "./usersettings/Usersettings";
import Users from "./adminsettings/Users";
import { useCallback, useEffect, useState } from "react";
import { HasPermission } from "../apis/authServer/Permission";
import { Jwt } from "../apis/authServer/Users";

function Settings() {
  let history = useHistory();
  const token = GetCookie("jwttoken");
  let [adminsettings, setAdminsettings] = useState(<div></div>);

  if (!CheckCookie("jwttoken")) history.push("/auth/login");

  const checkPermission = useCallback(async () => {
    try {
      if (await HasPermission((await Jwt(token)).id, "adminsettings.?", token))
        setAdminsettings(
          <details>
            <summary>Adminsettings</summary>
            <Link
              className="settingslink"
              id="adminsettings"
              to="/dashboard/settings/adminsettings/users"
            >
              User Settings
            </Link>
          </details>
        );
    } catch (e) {
      console.log(e);
    }
  }, [token]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

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
          {adminsettings}
        </ul>
        <Switch>
          <Route path="*/usersettings">
            <Usersettings />
          </Route>
          <Route path="/dashboard/settings/adminsettings/*">
            <Router>
              <Route path="*/users">
                <Users />
              </Route>
            </Router>
            <Redirect to="/dashboard/settings/adminsettings/users" />
          </Route>
          <Redirect to="/dashboard/settings/usersettings" />
        </Switch>
      </Router>
    </div>
  );
}

export default Settings;
