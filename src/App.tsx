import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./sides/login/Login";

function App() {
  return (
    <Router>
      <Switch>
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
          <Switch>
            <Route path="*/start">
              <h1>Welcomme</h1>
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
