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

export async function GetPermissions(
  token: string,
  id: string
): Promise<string[]> {
  const response = await fetch(authServerUrl + "permission/" + id, {
    method: "GET",
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

  return await response.json();
}

export async function PermissionAction(
  token: string,
  id: string,
  permission: string,
  action: string
) {
  if (!token || !id || !permission || !action) {
    const errorMessage: string = "Input is empty";
    let error: Error = new Error("One of the parameters is null or empty");

    error.name = errorMessage;
    throw error;
  }

  if (action !== "add" && action !== "remove")
    throw new Error("Action must be add or remove");

  const response = await fetch(
    `${authServerUrl}permission/${action}Permission`,
    {
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
    }
  );

  if (!response.ok) {
    let errorText: string = await response.text();
    let error: Error = new Error();

    error.name = errorText;
    throw error;
  }
}
