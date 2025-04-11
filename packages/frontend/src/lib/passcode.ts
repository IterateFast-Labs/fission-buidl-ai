import { fetcher } from "./fetcher";

export const sessionStorageKey = "@fission/passcode";

export function getPasscode() {
  const passcode = sessionStorage.getItem(sessionStorageKey);

  return passcode;
}

export function setPasscode(passcode: string) {
  if (!passcode) {
    throw new Error("Passcode is required");
  }

  sessionStorage.setItem(sessionStorageKey, passcode);

  return passcode;
}

export async function verifyPasscode(passcode: string) {
  try {
    if (!passcode || passcode.trim() === "") {
      throw new Error("Passcode is required");
    }

    const { pass } = await fetcher<{
      pass: boolean;
    }>("/api/validate-password", {
      method: "POST",
      headers: {
        "x-api-password": passcode,
      },
    });

    if (!pass) {
      throw new Error("Invalid passcode");
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
