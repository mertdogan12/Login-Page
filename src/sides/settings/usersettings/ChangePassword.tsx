import React from "react";
import Error from "../../error/Error";
import { GetCookie } from "../../../apis/Cookies";

type myProps = {};
type myStats = {
  error: string;
};
let token: string;

class ChangePassword extends React.Component<myProps, myStats> {
  constructor(props: myProps) {
    super(props);
    token = GetCookie("jwttoken");

    this.state = {
      error: "",
    };

    this.changePassword = this.changePassword.bind(this);
  }

  changePassword() {
    const oldPassword: HTMLInputElement = document.getElementById(
      "oldPassword"
    ) as HTMLInputElement;
    const newPassword: HTMLInputElement = document.getElementById(
      "newPassword2"
    ) as HTMLInputElement;
    const newPassword2: HTMLInputElement = document.getElementById(
      "newPassword2"
    ) as HTMLInputElement;

    if (!oldPassword.value || !newPassword.value || !newPassword2.value) {
      this.setState({
        error: "Input is empty",
      });
    }
  }

  render() {
    return (
      <div>
        <Error error={this.state.error} />
        <p>Old Password</p>
        <input id="oldPassword" type="password" />
        <p>New Password</p>
        <input id="newPassword" type="password" />
        <p>New Password</p>
        <input id="newPassword2" type="password" />
        <button onClick={this.changePassword}>Change Password</button>
      </div>
    );
  }
}

export default ChangePassword;
