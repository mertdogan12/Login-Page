import { GetCookie } from "../../apis/Cookies";
import { useState, KeyboardEvent } from "react";
import { changePassword } from "../../apis/authServer/Users";
import Alert from "../Alert";

function ChangePassword() {
  let token = GetCookie("jwttoken");
  let [alert, setAlert] = useState("");
  let [color, setColor] = useState("255;0;0");
  let [count, setCount] = useState(0);

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
      const errorMessage: string = "Input is empty";
      setColor("255;0;0");

      if (alert === errorMessage) {
        setCount(count + 1);
      } else setAlert(errorMessage);

      return;
    }

    if (newPassword.value !== newPassword2.value) {
      const errorMessage: string = "Passwords are not equal";
      setColor("255;0;0");

      if (alert === errorMessage) {
        setCount(count + 1);
      } else setAlert(errorMessage);

      return;
    }

    try {
      const alertMessage: string = "Password successful changed";
      await changePassword(oldPassword.value, newPassword.value, token);
      setColor("179;146;0");

      if (alert === alertMessage) {
        setCount(count + 1);
      } else setAlert(alertMessage);

      return;
    } catch (error: any) {
      setColor("255;0;0");

      if (alert === error.name) {
        setCount(count + 1);
      } else setAlert(error.name);

      return;
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") onButtonClick();
  }

  return (
    <div id="changePassword" onKeyDown={onKeyDown}>
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
