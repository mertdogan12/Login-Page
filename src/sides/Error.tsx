import { useEffect } from "react";

type MyProps = {
  error: string;
};

let timeout: number;

function Error(props: MyProps) {
  useEffect(() => {
    if (props.error) {
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

    errorElement.style.backgroundColor = visibility
      ? "rgba(255, 0, 0, 100)"
      : "rgba(255, 0, 0, 0)";

    errorTextElement.style.color = visibility
      ? "rgba(255, 255, 255, 100)"
      : "rgba(255, 255, 255, 0)";
  }

  return (
    <div id="error">
      <p id="errorText">{props.error}</p>
    </div>
  );
}

export default Error;
