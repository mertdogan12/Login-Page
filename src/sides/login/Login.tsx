import React from "react";
import "./style.css";

type MyProps = {};
type MyState = {};

class Login extends React.Component<MyProps, MyState> {
  render() {
    return (
      <div className="login">
        <input id="username" placeholder="Username" type="text" />
        <input placeholder="Password" type="password" />
        <button>Login</button>
        <div id="seperator">OR</div>
        <button id="register">Register</button>
      </div>
    );
  }
}

export default Login;
