import { useEffect } from "react";

type MyProps = {
  alert: string;
  color: string;
  id: string;
};

let timers: Map<string, number> = new Map<string, number>();

function Alert(props: MyProps) {
  useEffect(() => {
    if (props.alert) {
      setVisibility(true);

      if (timers.get(props.id)) clearTimeout(timers.get(props.id));
      timers.set(props.id, setTimeout(setVisibility, 5 * 1000, false));
    } else setVisibility(false);
  }, [props.alert, props.id]);

  function setVisibility(visibility: boolean) {
    const alertElement: HTMLElement = document.getElementById(
      props.id
    ) as HTMLElement;
    const alertTextElement: HTMLElement = document.getElementById(
      props.id + "Text"
    ) as HTMLElement;

    const color: string[] = props.color.split(";");

    if (visibility) {
      alertElement.style.display = "block";
    } else
      setTimeout(
        (element: HTMLElement) => (element.style.display = "none"),
        1000,
        alertElement
      );

    alertElement.style.backgroundColor = visibility
      ? `rgba(${color[0]}, ${color[1]}, ${color[2]}, 255)`
      : `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`;

    alertTextElement.style.color = visibility
      ? `rgba(255, 255, 255, 255)`
      : `rgba(255, 255, 255, 0)`;
  }

  return (
    <div className="alert" id={props.id}>
      <p id={props.id + "Text"} className="alertText">
        {props.alert}
      </p>
    </div>
  );
}

export default Alert;
