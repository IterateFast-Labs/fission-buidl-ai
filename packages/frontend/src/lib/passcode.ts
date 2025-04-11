import { sleep } from "./sleep";

export const sessionStorageKey = "@fission/passcode";

export async function verifyPasscode(passcode: string) {
  try {
    if (!passcode || passcode.trim() === "") {
      throw new Error("Passcode is required");
    }

    // TODO : verify passcode
    await sleep(1);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
