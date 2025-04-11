import { Passcode } from "@/components/passcode";
import { sessionStorageKey } from "@/lib/passcode";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  return (
    <div className="py-20 flex items-center min-h-[calc(100svh-48px)]">
      <Passcode
        className="mx-auto"
        onSuccessValidation={(passcode) => {
          alert("Passcode validated successfully!");
          sessionStorage.setItem(sessionStorageKey, passcode);
          router.navigate({
            to: "/prompt",
          });
        }}
        onErrorValidation={() => {
          alert("Error validating passcode.");
        }}
      />
    </div>
  );
}
