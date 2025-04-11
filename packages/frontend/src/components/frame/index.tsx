import { cn } from "@/lib/tailwind-util";
import { Box } from "../ui/box";
import styles from "./index.module.css";

export default function Frame({ className }: { className?: string }) {
  return (
    <Box className={cn(["p-0 bg-white flex flex-col gap-2", className])}>
      <div className={cn([styles.bubbleBorder, "mx-4 mt-2"])}>
        <h2>Agenda:</h2>
        <p className="text-sm whitespace-pre-line font-bold">
          " What is the agenda you want to analyze? "
        </p>
      </div>

      <div className={cn([styles.bubbleBorder, "p-4 flex-grow mx-4"])}></div>

      <div className="flex justify-end">
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
