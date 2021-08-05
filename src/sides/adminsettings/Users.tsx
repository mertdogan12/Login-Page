import { useCallback, useEffect, useState } from "react";
import { GetPermissions } from "../../apis/authServer/Permission";
import { GetUsers, User } from "../../apis/authServer/Users";
import { GetCookie } from "../../apis/Cookies";

function Users() {
  let token = GetCookie("jwttoken");
  let [text, setText] = useState(<div className="lds-dual-ring"></div>);
  let [users, setUsers] = useState(new Array<UserWithPermission>());

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

  return (
    <div className="settingselemtent">
      {text}
      {users.map((obj) => {
        return (
          <details key={obj.id}>
            <summary>{obj.name}</summary>
            <ul>
              {obj.permissions.map((permission, index) => {
                return <li key={index}>{permission}</li>;
              })}
            </ul>
          </details>
        );
      })}
    </div>
  );
}

export default Users;
