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
      this.setVisibility(true);

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(this.setVisibility, 5 * 1000, false);
    } else this.setVisibility(false);
  }

  setVisibility(visibility: boolean) {
    const errorElements: HTMLCollection = document.getElementsByClassName(
      "error"
    ) as HTMLCollection;

    (errorElements.item(0) as HTMLElement).style.backgroundColor = visibility
      ? "rgba(255, 0, 0, 100)"
      : "rgba(255, 0, 0, 0)";

    (errorElements.item(0) as HTMLElement).style.color = visibility
      ? "rgba(255, 255, 255, 100)"
      : "rgba(255, 255, 255, 0)";
  }

  render() {
    return (
      <div className="error">
        <p>{this.props.error}</p>
      </div>
    );
  }
}
