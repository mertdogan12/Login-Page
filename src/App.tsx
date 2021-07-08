import React from "react";
import logo from "./logo.svg";
import "./style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./sides/login/Login";

function App() {
  return (
    <Router>
      <p id="error">Error: </p>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
