import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./sides/Login";
import NavBar from "./sides/NavBar";
import Settings from "./sides/Settings";
import Error from "./sides/Error";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard/start" />
        </Route>
        <Route path="/auth">
          <Switch>
            <Route path="*/login">
              <Login />
            </Route>
            <Route path="*/register"></Route>
            <Route path="*">
              <h1>404</h1>
            </Route>
          </Switch>
        </Route>
        <Route path="/dashboard">
          <NavBar />
          <Switch>
            <Route path="*/start">
              <h1>Welcomme</h1>
            </Route>
            <Route path="*/settings">
              <Settings />
            </Route>
            <Route path="*">
              <h1>404</h1>
            </Route>
          </Switch>
        </Route>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
