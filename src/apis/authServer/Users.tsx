import fetch from "node-fetch";

export async function login(username: string, password: string) {
  if (!username || !password) throw new Error("Username or Password is empty");

  const raw: string = `{\n  "name": "${username}",\n  "password": "${password}"\n}`;

  const requestOptions: Object = {
    method: "POST",
    mode: "no-cors",
    body: raw,
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const response = await fetch(
    "http://localhost:5000/users/login",
    requestOptions
  );

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
}
