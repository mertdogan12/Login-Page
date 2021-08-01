import React from "react";
import { withRouter } from "react-router-dom";
import { SetCookie } from "../apis/Cookies";
import { login } from "../apis/authServer/Users";
import { History } from "history";
import Alert from "./Alert";

type MyProps = {
  match: any;
  location: any;
  history: History;
};
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

      const token: string = await login(
        usernameElement.value,
        passwordElement.value
      );

      SetCookie("jwttoken", token, 7);

      this.props.history.push("/dashboard/start");
    } catch (error) {
      this.setState({
        error: error.name,
      });
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
      <div id="loginPage">
        <Alert id="loginAlert" color="255;0;0" alert={this.state.error} />
        <div id="login" onKeyDown={this.onKeyDown}>
          <input
            className="loginInput"
            id="username"
            placeholder="Username"
            type="text"
          />
          <input
            className="loginInput"
            id="password"
            placeholder="Password"
            type="password"
          />
          <button className="loginButton" onClick={this.onLoginClick}>
            Login
          </button>
          <div id="seperator">OR</div>
          <button className="loginButton" id="register">
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
