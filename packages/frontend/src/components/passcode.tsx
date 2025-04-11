import { Box } from "./ui/box";
import { Button } from "./ui/button";
import Input from "./ui/input";
import { useState } from "react";
import { verifyPasscode } from "@/lib/passcode";

export function Passcode({
  className,
  onSuccessValidation,
  onErrorValidation,
}: {
  className?: string;
  onSuccessValidation?: (passcode: string) => void;
  onErrorValidation?: (error: Error) => void;
}) {
  const [pending, setPending] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPending(true);

    const formData = new FormData(event.currentTarget);
    const passcode = formData.get("passcode") as string;

    try {
      if (!passcode || passcode.trim() === "") {
        throw new Error("Passcode is required");
      }

      // TODO: verify passcode
      await verifyPasscode(passcode);

      onSuccessValidation?.(passcode);
      setPending(false);
    } catch (error) {
      setPending(false);
      if (error instanceof Error) {
        onErrorValidation?.(error);
        return;
      }
    }
  };

  return (
    <Box label="Passcode" className={className}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <p className="text-lg text-primary">Enter the passcode to access</p>
        <Input
          id="passcode"
          name="passcode"
          type="password"
          placeholder="Enter passcode"
          className="w-full"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Checking..." : "Submit"}
          </Button>
        </div>
      </form>
    </Box>
  );
}
