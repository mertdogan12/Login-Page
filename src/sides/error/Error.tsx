import React from "react";
import "./style.css";

type MyProps = {
  error: string;
};
type MyState = {};
let timeout: number;

export default class Error extends React.Component<MyProps, MyState> {
  componentDidUpdate() {
    if (this.props.error) {
      this.setVisibility("visible");

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(this.setVisibility, 5 * 1000, "hidden");
    } else this.setVisibility("hidden");
  }

  setVisibility(visibility: string) {
    const errorElements: HTMLCollection = document.getElementsByClassName(
      "error"
    ) as HTMLCollection;

    (errorElements.item(0) as HTMLElement).style.visibility = visibility;
  }

  render() {
    return (
      <div className="error">
        <p>{this.props.error}</p>
      </div>
    );
  }
}
