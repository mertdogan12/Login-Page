export function SetCookie(name: string, value: string, exdays: number) {
  const date: Date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);

  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function GetCookie(name: string): string {
  let cookieString: string = decodeURIComponent(document.cookie);
  let cookies: string[] = cookieString.includes(";")
    ? cookieString.split(";")
    : [cookieString];

  for (let i = 0; i < cookies.length; i++) {
    const cookie: string = cookies[i];
    let values: string[] = cookie.split("=");

    if (values[0] === name) return values[1];
  }

  return "";
}

export function DeleteCookie(name: string) {
  SetCookie(name, "-", 0);
}

export function CheckCookie(name: string): boolean {
  return GetCookie(name) ? true : false;
}
