import React from "react";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import DeleteUser from "./DeleteUser";

type myProps = {};
type myStats = {};

class Usersettings extends React.Component<myProps, myStats> {
  render() {
    return (
      <div className="settingselemtent">
        <ChangePassword />
        <ChangeUsername />
        <DeleteUser />
      </div>
    );
  }
}

export default Usersettings;
