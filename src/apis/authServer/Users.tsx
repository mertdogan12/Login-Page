import fetch from "node-fetch";
import RequestInit from "node-fetch";

export function login(username: string, password: string) {
  var raw = '{\n  "name": "${username}",\n  "password": "${password}"\n}';

  var requestOptions: RequestInit = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:5000/users/login", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
