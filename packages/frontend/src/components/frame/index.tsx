import { cn } from "@/lib/tailwind-util";
import { Box } from "../ui/box";
import styles from "./index.module.css";

export default function Frame({
  className,
  agenda,
  message,
}: {
  className?: string;
  agenda?: string;
  message?: React.ReactNode;
}) {
  return (
    <Box className={cn(["p-0 bg-white flex flex-col gap-2", className])}>
      <div className={cn([styles.bubbleBorder, "mx-4 mt-4"])}>
        <h2>Agenda:</h2>
        <p className="text-base whitespace-pre-line font-bold">{agenda}</p>
      </div>

      <div className="flex-grow mx-4 flex justify-end flex-col">
        <article className={cn([styles.bubbleBorder])}>{message}</article>
      </div>

      <div className="flex justify-end">
        <img
          src="/frame/tay-talking.webp"
          alt="Tay talking"
          width={64 * 1.5}
          height={64 * 1.5}
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>
    </Box>
  );
}
