import { sessionStorageKey, verifyPasscode } from "@/lib/passcode";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/prompt")({
  component: RouteComponent,
  async beforeLoad() {
    const passcode = sessionStorage.getItem(sessionStorageKey) || "";

    let isAuthenticated: boolean = false;

    try {
      const result = await verifyPasscode(passcode);
      isAuthenticated = Boolean(result);
    } catch {
      isAuthenticated = false;
    }

    if (!isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/prompt"!</div>;
}
