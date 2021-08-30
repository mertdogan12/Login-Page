type MyProps = {
  alert: string;
  color: string;
  id: string;
};

let timers: Map<string, number> = new Map<string, number>();

function Alert(props: MyProps) {
  if (props.alert) {
    setVisibility(true, false);

    if (timers.get(props.id)) clearTimeout(timers.get(props.id));
    timers.set(props.id, setTimeout(setVisibility, 5 * 1000, false, true));
  } else setVisibility(false, false);

  function setVisibility(visibility: boolean, timer: boolean) {
    const alertElement: HTMLElement | null = document.getElementById(props.id);
    const alertTextElement: HTMLElement | null = document.getElementById(
      props.id + "Text"
    );

    const color: string[] = props.color.split(";");

    if (alertElement == null || alertTextElement == null) return;

    if (visibility) {
      alertElement.style.visibility = "visible";
    } else if (timer)
      setTimeout(
        (element: HTMLElement) => {
          element.style.visibility = "hidden";
        },
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
