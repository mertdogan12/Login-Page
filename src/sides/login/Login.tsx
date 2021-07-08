import React from "react";
import { login } from "../../apis/authServer/Users";
import "./style.css";

type MyProps = {};
type MyState = {
  error: string;
};

class Login extends React.Component<MyProps, MyState> {
  state: MyState = {
    error: "",
  };

  constructor(props: MyProps) {
    super(props);
    const errorElement: any = document.getElementById;

    errorElement.innerHTML = this.state.error;
  }

  async onLoginClick() {
    try {
      const usernameElement: any = document.getElementById("username");
      const passwordElement: any = document.getElementById("password");

      await login(usernameElement.innerHTML, passwordElement.innerHTML);
    } catch (error: any) {
      this.setState({
        error: error,
      });
    }
  }

  render() {
    return (
      <div className="login">
        <input id="username" placeholder="Username" type="text" />
        <input id="password" placeholder="Password" type="password" />
        <button onClick={this.onLoginClick}>Login</button>
        <div id="seperator">OR</div>
        <button id="register">Register</button>
      </div>
    );
  }
}

export default Login;
