import { useState, KeyboardEvent, useEffect, useCallback } from "react";
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

  const changeBackgroundFilter = useCallback(
    (filter: string) => {
      const htmlElement: HTMLElement = document
        .getElementsByTagName("html")
        .item(0) as HTMLElement;

      const summaryElemets: HTMLCollection =
        htmlElement.getElementsByTagName("details");

      (document.getElementById("navbar") as HTMLElement).style.filter = filter;
      (document.getElementById("sidebar") as HTMLElement).style.filter = filter;

      for (let i = 0; i < summaryElemets.length; i++) {
        const element: HTMLElement = summaryElemets.item(i) as HTMLElement;

        if (element.id === props.id) continue;

        element.style.filter = filter;
      }
    },
    [props.id]
  );

  useEffect(() => {
    if (element == null) return;

    if (props.callback) {
      element.style.display = "block";
      changeBackgroundFilter("blur(8px)");

      (document.getElementById(props.id) as HTMLElement).focus();

      setAlert({
        color: "255;0;0",
        alert: "",
      });
    } else element.style.display = "none";
  }, [props.callback, element, props.id, changeBackgroundFilter]);

  async function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (props.callback == null) return;
    if (element == null) return;

    switch (event.key) {
      case "Enter":
        try {
          const args: string[] = props.callback.arguments.map((obj) => {
            if (obj === "<input>") return event.currentTarget.value;

            return obj;
          });

          await props.callback.function(...args);

          element.style.display = "none";
          changeBackgroundFilter("none");

          setAlert({
            color: "179;146;0",
            alert: "No errors",
          });

          setTimeout(() => window.location.reload(), 1000);
        } catch (e: any) {
          setAlert({
            color: "255;0;0",
            alert: e.name,
          });
        }

        break;

      case "Escape":
        element.style.display = "none";
        changeBackgroundFilter("none");

        break;
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
