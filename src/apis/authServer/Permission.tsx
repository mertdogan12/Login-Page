import fetch from "node-fetch";

const authServerUrl: string = process.env.REACT_APP_AUTHSERVER_URL as string;

export async function HasPermission(
  id: string,
  permission: string,
  token: string
): Promise<boolean> {
  const response = await fetch(authServerUrl + "permission/hasPermission", {
    method: "POST",
    body: JSON.stringify({
      id: id,
      permission: permission,
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

  return (await response.text()) === "true";
}
