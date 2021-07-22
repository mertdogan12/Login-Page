import { useState } from "react";
import Alert from "../Alert";
import { changeUsername } from "../../apis/authServer/Users";
import { GetCookie } from "../../apis/Cookies";

function ChangeUsername() {
  let [alert, setAlert] = useState("");
  let [color, setColor] = useState("255;0;0");

  async function onButtonClick() {
    const newUsername: HTMLInputElement = document.getElementById(
      "newUsername"
    ) as HTMLInputElement;

    if (!newUsername.value) {
      setColor("255;0;0");
      setAlert("New Username is Empty");
      console.log("Error");
      return;
    }

    try {
      await changeUsername(newUsername.value, GetCookie("jwttoken"));

      setColor("179;146;0;0");
      setAlert("Username has been changed");
    } catch (error) {
      setColor("255;0;0");
      setAlert(error.name);
    }
  }

  return (
    <div id="changeUsername">
      <h2 className="header">Change Username</h2>
      <Alert id="changeUsernameAlert" color={color} alert={alert} />
      <label className="settingsLabel">New Username</label>
      <input className="settingsInput" id="newUsername" />
      <br />
      <button className="settingsButtons" onClick={onButtonClick}>
        Change Username
      </button>
    </div>
  );
}

export default ChangeUsername;
