import { useCallback, useEffect, useState, MouseEvent } from "react";
import {
  GetPermissions,
  PermissionAction,
} from "../../apis/authServer/Permission";
import { GetUsers, User } from "../../apis/authServer/Users";
import { GetCookie } from "../../apis/Cookies";
import Input, { Callback } from "../Input";

function Users() {
  let token = GetCookie("jwttoken");
  let [text, setText] = useState(<div className="lds-dual-ring"></div>);
  let [users, setUsers] = useState(new Array<UserWithPermission>());
  let [callback, setCallback] = useState(null as Callback | null);

  type UserWithPermission = {
    id: string;
    name: string;
    permissions: string[];
  };

  const getUsers = useCallback(async () => {
    try {
      const users: User[] = await GetUsers(token);
      const userWithPermissions: UserWithPermission[] = await Promise.all(
        users.map(async (user: User) => {
          return {
            id: user.id,
            name: user.name,
            permissions: await GetPermissions(token, user.id),
          };
        })
      );

      setText(<div></div>);
      setUsers(userWithPermissions);
    } catch (e) {
      console.log(e);
      setText(<h1>No Permission</h1>);
    }
  }, [token]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  function onClick(event: MouseEvent) {
    const info: string[] = event.currentTarget.id.split(";");

    setCallback({
      function: PermissionAction,
      arguments: [token, info[1], "<input>", info[0]],
    });
  }

  return (
    <div className="settingselemtent">
      {text}
      <Input
        id="asUsersInput"
        alertId="asUsersInputAlert"
        callback={callback}
      />
      {users.map((obj) => {
        return (
          <details key={obj.id}>
            <summary>{obj.name}</summary>
            <ul>
              {obj.permissions.map((permission, index) => {
                return <li key={index}>{permission}</li>;
              })}
            </ul>
            <button
              className="adminsettings"
              onClick={onClick}
              id={"add;" + obj.id}
            >
              Add Permission
            </button>
            <button
              className="adminsettings"
              onClick={onClick}
              id={"remove;" + obj.id}
            >
              Remove Permission
            </button>
          </details>
        );
      })}
    </div>
  );
}

export default Users;
