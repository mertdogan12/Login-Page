import React from "react";
import { GetCookie } from "../../apis/Cookies";
import { changePassword } from "../../apis/authServer/Users";
import Alert from "../Alert";

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

  async changePassword() {
    const oldPassword: HTMLInputElement = document.getElementById(
      "oldPassword"
    ) as HTMLInputElement;
    const newPassword: HTMLInputElement = document.getElementById(
      "newPassword"
    ) as HTMLInputElement;
    const newPassword2: HTMLInputElement = document.getElementById(
      "newPassword2"
    ) as HTMLInputElement;

    if (!oldPassword.value || !newPassword.value || !newPassword2.value) {
      this.setState({
        error: "Input is empty",
      });
      return;
    }

    if (newPassword.value !== newPassword2.value) {
      this.setState({
        error: "Passwords are not equal",
      });
      return;
    }

    try {
      await changePassword(oldPassword.value, newPassword.value, token);
    } catch (error: any) {
      this.setState({
        error: error.name,
      });
    }
  }

  render() {
    return (
      <div id="changePassword">
        <h2 className="header">Change Password</h2>
        <Alert color="255;0;0" alert={this.state.error} />
        <label className="settingsLabel">Old Password </label>
        <input className="settingsInput" id="oldPassword" type="password" />
        <br />
        <label className="settingsLabel">New Password</label>
        <input className="settingsInput" id="newPassword" type="password" />
        <br />
        <label className="settingsLabel">New Password</label>
        <input className="settingsInput" id="newPassword2" type="password" />
        <br />
        <button className="settingsButtons" onClick={this.changePassword}>
          Change Password
        </button>
      </div>
    );
  }
}

export default ChangePassword;
