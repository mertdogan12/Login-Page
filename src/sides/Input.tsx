import { useState, KeyboardEvent, useEffect } from "react";
import Alert from "./Alert";

export type Callback = {
  function: Function;
  arguments: string[];
};

type MyProps = {
  alertId: string;
  id: string;
  callback: Callback | null;
};

function Input(props: MyProps) {
  const element: HTMLElement | null = document.getElementById(props.id);
  let [alert, setAlert] = useState({
    color: "",
    alert: "",
  });

  useEffect(() => {
    if (element == null) return;

    if (props.callback) {
      element.style.display = "block";

      setAlert({
        color: "255;0;0",
        alert: "",
      });
    } else element.style.display = "none";
  }, [props.callback, element]);

  async function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (props.callback == null) return;
    if (element == null) return;

    if (event.key === "Enter") {
      try {
        const args: string[] = props.callback.arguments.map((obj) => {
          if (obj === "<input>") return event.currentTarget.value;

          return obj;
        });

        await props.callback.function(...args);

        setAlert({
          color: "179;146;0",
          alert: "No errors",
        });
      } catch (e) {
        console.log(e);

        setAlert({
          color: "255;0;0",
          alert: e.name,
        });
      }

      element.style.display = "none";
    }
  }

  return (
    <div>
      <Alert color={alert.color} alert={alert.alert} id={props.alertId} />
      <input id={props.id} onKeyDown={onKeyDown} />
    </div>
  );
}

export default Input;
