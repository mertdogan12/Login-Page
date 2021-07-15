import React from "react";
import ChangePassword from "./ChangePassword";

type myProps = {};
type myStats = {};

class Usersettings extends React.Component<myProps, myStats> {
  render() {
    return (
      <div className="settingselemtent">
        <ChangePassword />
      </div>
    );
  }
}

export default Usersettings;
