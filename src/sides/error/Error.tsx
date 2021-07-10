import React from "react";
import "./style.css";

type MyProps = {
  error: string;
};
type MyState = {};

export default class Error extends React.Component<MyProps, MyState> {
  componentDidUpdate() {
    if (this.props.error) {
      this.setVisibility("visible");

      setTimeout(this.setVisibility, 20 * 1000, "hidden");
    } else this.setVisibility("hidden");
  }

  setVisibility(visibility: string) {
    const errorElement: HTMLElement = document.getElementById(
      "error"
    ) as HTMLElement;

    errorElement.style.visibility = visibility;
  }

  render() {
    return <p id="error">{this.props.error}</p>;
  }
}
