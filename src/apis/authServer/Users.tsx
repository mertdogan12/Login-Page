import fetch from "node-fetch";

const publicUrl: string = "https://www.dogan.at/authServer/";
const localURl: string = "http://localhost:5000/";

export async function login(username: string, password: string) {
  if (!username || !password) {
    let error: Error = new Error();

    error.name = "Username or Password is empty";
    throw error;
  }

  const response = await fetch(localURl + "users/login", {
    method: "POST",
    body: JSON.stringify({
      name: username,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    let errorText: string = await response.text();
    let error: Error = new Error();

    error.name = errorText;
    throw error;
  }

  return response.text();
}

export async function changePassword(
  oldPassword: string,
  newPassword: string,
  token: string
) {
  if (!oldPassword || !newPassword) {
    let error: Error = new Error();

    error.name = "Password is empty";
    throw error;
  }

  const response = await fetch(localURl + "users/changePassword", {
    method: "POST",
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
  });

  if (!response.ok) {
    let errorText: string = await response.text();
    let error: Error = new Error();

    error.name = errorText;
    throw error;
  }

  return response.text();
}
