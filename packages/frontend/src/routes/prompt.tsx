import AgendaForm from "@/components/agenda-form";
import { getPasscode, verifyPasscode } from "@/lib/passcode";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/prompt")({
  component: RouteComponent,
  async beforeLoad() {
    const passcode = getPasscode();

    let isAuthenticated: boolean = false;

    try {
      if (!passcode || passcode.trim() === "") {
        throw new Error("Passcode is required");
      }

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
  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh_-_48px)]">
      <AgendaForm />
      {/* <Frame /> */}
    </div>
  );
}
