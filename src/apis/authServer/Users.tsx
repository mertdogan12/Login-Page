import fetch from "node-fetch";

export async function login(username: string, password: string) {
  if (!username || !password) {
    let error: any = new Error("Username or Password is empty");

    error.name = "Username or Password is empty";
    throw error;
  }

  const response = await fetch("http://localhost:5000/users/login", {
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
