import { GetCookie } from "../../apis/Cookies";
import { useState } from "react";
import { changePassword } from "../../apis/authServer/Users";
import Alert from "../Alert";

let token: string;

function ChangePassword() {
  token = GetCookie("jwttoken");
  let [alert, setAlert] = useState("");
  let [color, setColor] = useState("255;0;0");

  async function onButtonClick() {
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
      setColor("255;0;0");
      setAlert("Input is empty");

      return;
    }

    if (newPassword.value !== newPassword2.value) {
      setColor("255;0;0");
      setAlert("Passwords are not equal");

      return;
    }

    try {
      await changePassword(oldPassword.value, newPassword.value, token);

      setColor("179;146;0");
      setAlert("Password changed");

      return;
    } catch (error: any) {
      setColor("255;0;0");
      setAlert(error.name);

      return;
    }
  }

  return (
    <div id="changePassword">
      <h2 className="header">Change Password</h2>
      <Alert id="changePasswordAlert" color={color} alert={alert} />
      <label className="settingsLabel">Old Password </label>
      <input className="settingsInput" id="oldPassword" type="password" />
      <br />
      <label className="settingsLabel">New Password</label>
      <input className="settingsInput" id="newPassword" type="password" />
      <br />
      <label className="settingsLabel">New Password</label>
      <input className="settingsInput" id="newPassword2" type="password" />
      <br />
      <button className="settingsButtons" onClick={onButtonClick}>
        Change Password
      </button>
    </div>
  );
}

export default ChangePassword;
