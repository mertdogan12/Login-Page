import { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteUser, Jwt } from "../../apis/authServer/Users";
import { DeleteCookie, GetCookie } from "../../apis/Cookies";
import Alert from "../Alert";

function DeleteUser() {
  let history = useHistory();
  let [alert, setAlert] = useState({
    alert: "",
    color: "0;255;255",
  });
  const token: string = GetCookie("jwttoken");

  const deleteAccount = async () => {
    try {
      await deleteUser((await Jwt(token)).id, token);
      DeleteCookie("jwttoken");
      history.push("/auth/login");
    } catch (e) {
      console.log(e);

      setAlert({
        alert: e.name,
        color: "255;0;0",
      });
    }
  };

  return (
    <div id="deleteusersettings">
      <h2 className="settings">Delte your account</h2>
      <Alert id="deleteAccountAlert" color={alert.color} alert={alert.alert} />
      <button onClick={deleteAccount} className="usersettings">
        Delete
      </button>
    </div>
  );
}

export default DeleteUser;
