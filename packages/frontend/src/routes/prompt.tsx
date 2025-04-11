import AgendaForm from "@/components/agenda-form";
import Analysis from "@/components/analysis";
import { getPasscode, verifyPasscode } from "@/lib/passcode";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

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
  const [agenda, setAgenda] = useState<string>("");

  const isAnalysisMode = Boolean(agenda);

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh_-_48px)]">
      {!isAnalysisMode && (
        <AgendaForm
          onSubmit={(agenda) => {
            setAgenda(agenda);
          }}
        />
      )}
      {isAnalysisMode && <Analysis agenda={agenda} setAgenda={setAgenda} />}
    </div>
  );
}
