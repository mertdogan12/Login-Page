import { useState, KeyboardEvent } from "react";
import Alert from "../Alert";
import { changeUsername } from "../../apis/authServer/Users";
import { GetCookie } from "../../apis/Cookies";

function ChangeUsername() {
  let [alert, setAlert] = useState("");
  let [color, setColor] = useState("255;0;0");
  let [count, setCount] = useState(1);

  async function onButtonClick() {
    const newUsername: HTMLInputElement = document.getElementById(
      "newUsername"
    ) as HTMLInputElement;

    if (!newUsername.value) {
      const errorMessage: string = "New Username is Empty";
      setColor("255;0;0");

      if (alert === errorMessage) {
        setCount(count + 1);
      } else setAlert(errorMessage);

      return;
    }

    try {
      const alertMessage: string = "Username has been changed";
      await changeUsername(newUsername.value, GetCookie("jwttoken"));
      setColor("179;146;0");

      if (alert === alertMessage) {
        setCount(count + 1);
      } else setAlert("Username has been changed");
    } catch (error: any) {
      setColor("255;0;0");

      if (alert === error.name) {
        setCount(count + 1);
      } else setAlert(error.name);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") onButtonClick();
  }

  return (
    <div id="changeUsername">
      <h2 className="settings">Change Username</h2>
      <Alert id="changeUsernameAlert" color={color} alert={alert} />
      <label className="usersettings">New Username</label>
      <input className="usersettings" onKeyDown={onKeyDown} id="newUsername" />
      <br />
      <button className="usersettings" onClick={onButtonClick}>
        Change Username
      </button>
    </div>
  );
}

export default ChangeUsername;
