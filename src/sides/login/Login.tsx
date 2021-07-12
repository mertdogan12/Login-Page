import React from "react";
import Error from "../error/Error";
import { login } from "../../apis/authServer/Users";
import "./style.css";

type MyProps = {};
type MyState = {
  error: string;
};

class Login extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      error: "",
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  async onLoginClick() {
    try {
      const usernameElement: any = document.getElementById("username");
      const passwordElement: any = document.getElementById("password");

      console.log(await login(usernameElement.value, passwordElement.value));
    } catch (error) {
      this.setState({
        error: error.name,
      });

      return;
    }
  }

  onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      this.onLoginClick();
    }

    this.setState({
      error: "",
    });
  }

  render() {
    return (
      <div className="outside">
        <Error error={this.state.error} />
        <div className="login" onKeyDown={this.onKeyDown}>
          <input id="username" placeholder="Username" type="text" />
          <input id="password" placeholder="Password" type="password" />
          <button onClick={this.onLoginClick}>Login</button>
          <div id="seperator">OR</div>
          <button id="register">Register</button>
        </div>
      </div>
    );
  }
}

export default Login;
