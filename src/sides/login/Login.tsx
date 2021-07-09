import { error } from "console";
import React from "react";
import { login } from "../../apis/authServer/Users";
import "./style.css";

type MyProps = {};
type MyState = {
  error: string;
};

class Login extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    if (this.state) console.log(this.state.error);

    this.state = {
      error: "",
    };

    this.onLoginClick = this.onLoginClick.bind(this);
  }

  async onLoginClick() {
    try {
      const usernameElement: any = document.getElementById("username");
      const passwordElement: any = document.getElementById("password");

      await login(usernameElement.value, passwordElement.value);
    } catch (error) {
      console.log(error.toString());

      this.setState({
        error: error.toString(),
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
