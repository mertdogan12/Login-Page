import React from "react";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";

type myProps = {};
type myStats = {};

class Usersettings extends React.Component<myProps, myStats> {
  render() {
    return (
      <div className="settingselemtent">
        <ChangePassword />
        <ChangeUsername />
      </div>
    );
  }
}

export default Usersettings;
