import { getPasscode } from "./passcode";

export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const passcode = getPasscode();

  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-password": passcode || "",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
