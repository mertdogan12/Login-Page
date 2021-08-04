import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { HasPermission } from "../../apis/authServer/Permission";
import { Jwt } from "../../apis/authServer/Users";
import { GetCookie } from "../../apis/Cookies";

function Users() {
  let history = useHistory();
  let token = GetCookie("jwttoken");
  let [text, setText] = useState("Loading");

  const checkPermission = useCallback(async () => {
    try {
      if (
        !(await HasPermission((await Jwt(token)).id, "adminsettings.?", token))
      )
        history.push("/dashboard/settings/usersettings");

      setText("Hallo");
    } catch (e) {
      history.push("/dashboard/settings/usersettings");
    }
  }, [history, token]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return <p>{text}</p>;
}

export default Users;
