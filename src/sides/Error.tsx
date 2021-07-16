import React from "react";

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
    const errorElement: HTMLElement = document.getElementById(
      "error"
    ) as HTMLElement;
    const errorTextElement: HTMLElement = document.getElementById(
      "errorText"
    ) as HTMLElement;

    errorElement.style.backgroundColor = visibility
      ? "rgba(255, 0, 0, 100)"
      : "rgba(255, 0, 0, 0)";

    errorTextElement.style.color = visibility
      ? "rgba(255, 255, 255, 100)"
      : "rgba(255, 255, 255, 0)";
  }

  render() {
    return (
      <div id="error">
        <p id="errorText">{this.props.error}</p>
      </div>
    );
  }
}
