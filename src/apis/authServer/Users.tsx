import fetch from "node-fetch";

export async function login(username: string, password: string) {
  const raw: string = `{\n  "name": "${username}",\n  "password": "${password}"\n}`;

  const requestOptions: Object = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  fetch("https://www.dogan.at/authServer/users/login", requestOptions).then(
    async (response) => {
      if (!response.ok) throw response.statusText;

      return await response.json();
    }
  );
}
