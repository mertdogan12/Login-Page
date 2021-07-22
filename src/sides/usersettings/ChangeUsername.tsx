import { useState } from "react";
import Alert from "../Alert";
import { changeUsername } from "../../apis/authServer/Users";
import { GetCookie } from "../../apis/Cookies";

function ChangeUsername() {
  let [error, setError] = useState("");

  async function onButtonClick() {
    const newUsername: HTMLInputElement = document.getElementById(
      "newUsername"
    ) as HTMLInputElement;

    if (!newUsername.value) {
      setError("New Username is Empty");
      return;
    }

    try {
      await changeUsername(newUsername.value, GetCookie("jwttoken"));
    } catch (error) {
      setError(error.name);
    }
  }

  return (
    <div id="changeUsername">
      <h2 className="header">Change Username</h2>
      <Alert id="changeUsernameAlert" color="255;0;0" alert={error} />
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
