import fetch from "node-fetch";

export async function login(username: string, password: string) {
  if (!username || !password) {
    let error: any = new Error("Username or Password is empty");

    error.name = "Username or Password is empty";
    throw error;
  }

  const publicUrl: string = "https://www.dogan.at/authServer/users/login";
  const localURl: string = "http://localhost:5000/users/login";

  const response = await fetch(localURl, {
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
    let error: any = new Error();

    error.name = errorText;
    throw error;
  }

  return response.text();
}
