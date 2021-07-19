import "./App.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Login from "./sides/Login";
import NavBar from "./sides/NavBar";
import Settings from "./sides/Settings";
import Error from "./sides/Error";
import { History } from "history";

type MyProps = {
  match: any;
  location: any;
  history: History;
};
type MyState = {};

class App extends React.Component<MyProps, MyState> {
  parseParams(name: string, getString: string): string {
    if (!getString) return "";

    getString = getString.replace("?", "");
    const values: string[] = getString.includes("&")
      ? getString.split("&")
      : [getString];

    for (let i = 0; i < values.length; i++) {
      const element: string[] = values[i].split("=");
      if (element[0] === name) return element[1];
    }

    return "";
  }

  componentDidUpdate() {
    console.log("UPdate");
  }

  render() {
    return (
      <Router>
        <Error error={this.parseParams("error", this.props.location.search)} />
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
}

export default withRouter(App);
