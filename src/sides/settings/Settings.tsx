import {
  useHistory,
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { CheckCookie } from "../../apis/Cookies";

function Settings() {
  let history = useHistory();

  if (!CheckCookie("jwttoken")) history.push("/auth/login");

  return (
    <div className="settings">
      <Router>
        <div>
          <Link to="settings/usersettings">Usersettings</Link>
        </div>
        <Switch>
          <Route path="*/usersettings">
            <p>user</p>
          </Route>
          <Route path="*/test">
            <p>test</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Settings;
