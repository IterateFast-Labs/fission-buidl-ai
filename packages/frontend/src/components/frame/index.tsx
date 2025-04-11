import { cn } from "@/lib/tailwind-util";
import { Box } from "../ui/box";
import styles from "./index.module.css";

export default function Frame({
  className,
  agenda,
  message,
  action,
}: {
  className?: string;
  agenda?: string;
  message?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Box className={cn(["p-0 bg-white flex flex-col gap-2", className])}>
      <div className={cn([styles.bubbleBorder, "relative mx-4 mt-4"])}>
        <h2>Agenda:</h2>
        <p className="text-base whitespace-pre-line font-bold">{agenda}</p>
      </div>

      <div className="p-4 flex justify-end items-center relative">
        {action}
        <div className="bg-gradient-to-b from-white via-white to-white/0 absolute -bottom-6 left-0 w-full h-8 z-10"></div>
      </div>

      <div className="relative flex-grow mx-4 flex flex-col overflow-y-auto max-h-[calc(100svh_-_360px)] pb-2 pt-6 pr-6">
        <article className={cn([styles.bubbleBorder, "mt-auto"])}>
          {message}
        </article>
      </div>

      <div className="flex justify-end items-center gap-4">
        <img
          src="/frame/tay-talking.webp"
          alt="Tay talking"
          width={64}
          height={64}
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>
    </Box>
  );
}
