import React from "react";
import { withRouter } from "react-router-dom";
import { SetCookie } from "../../apis/Cookies";
import Error from "../error/Error";
import { login } from "../../apis/authServer/Users";
import "./style.css";
import { History } from "history";

type MyProps = {
  match: any;
  location: any;
  history: History;
};
type MyState = {
  error: string;
  url: string;
};

class Login extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      error: "",
      url: "",
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

export default withRouter(Login);
