import fetch from "node-fetch";

export async function login(username: string, password: string) {
  const raw: string = `{\n  "name": "${username}",\n  "password": "${password}"\n}`;

  const requestOptions: Object = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:5000/users/login", requestOptions).then(
    async (response) => {
      if (!response.ok) throw response.statusText;

      return await response.json();
    }
  );
}
