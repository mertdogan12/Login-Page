import { useHistory } from "react-router-dom";
import { HasPermission } from "../../apis/authServer/Permission";
import { Jwt } from "../../apis/authServer/Users";
import { GetCookie } from "../../apis/Cookies";

function Users() {
  let history = useHistory();
  let token = GetCookie("jwttoken");

  async function foo() {
    try {
      if (
        !(await HasPermission((await Jwt(token)).id, "adminsettings.?", token))
      )
        history.push("/dashboard/settings/usersettings");
    } catch (e) {
      history.push("/dashboard/settings/usersettings");
    }
  }

  return <p>Loading</p>;
}

export default Users;
