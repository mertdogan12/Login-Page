import { useEffect } from "react";

type MyProps = {
  alert: string;
  color: string;
};

let timeout: number;

function Alert(props: MyProps) {
  useEffect(() => {
    if (props.alert) {
      setVisibility(true);

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(setVisibility, 5 * 1000, false);
    } else setVisibility(false);
  });

  function setVisibility(visibility: boolean) {
    const errorElement: HTMLElement = document.getElementById(
      "error"
    ) as HTMLElement;
    const errorTextElement: HTMLElement = document.getElementById(
      "errorText"
    ) as HTMLElement;

    const color: string[] = props.color.split(";");

    errorElement.style.backgroundColor = visibility
      ? `rgba(${color[0]}, ${color[1]}, ${color[2]}, 255)`
      : `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`;

    errorTextElement.style.color = visibility
      ? `rgba(255, 255, 255, 255)`
      : `rgba(255, 255, 255, 0)`;
  }

  return (
    <div id="error">
      <p id="errorText">{props.alert}</p>
    </div>
  );
}

export default Alert;
