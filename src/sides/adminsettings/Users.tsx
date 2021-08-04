import { useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { HasPermission } from "../../apis/authServer/Permission";
import { GetUsers, Jwt, User } from "../../apis/authServer/Users";
import { GetCookie } from "../../apis/Cookies";

function Users() {
  let history = useHistory();
  let token = GetCookie("jwttoken");
  let [text, setText] = useState(<div className="lds-dual-ring"></div>);
  let [users, setUsers] = useState(new Array<User>());

  const checkPermission = useCallback(async () => {
    try {
      if (
        !(await HasPermission((await Jwt(token)).id, "adminsettings.?", token))
      )
        history.push("/dashboard/settings/usersettings");

      setText(<div></div>);
    } catch (e) {
      history.push("/dashboard/settings/usersettings");
    }
  }, [history, token]);

  const getUsers = useCallback(async () => {
    setUsers(await GetUsers(token));
  }, [token]);

  useEffect(() => {
    checkPermission();
    getUsers();
  }, [checkPermission, getUsers]);

  return (
    <div className="settingselemtent">
      {text}
      {users.map((obj) => {
        return <p key={obj.id}>{obj.name}</p>;
      })}
    </div>
  );
}

export default Users;
