import { cn } from "@/lib/tailwind-util";
import { Box } from "../ui/box";
import styles from "./index.module.css";

export default function Frame({ className }: { className?: string }) {
  return (
    <Box className={cn(["p-0 bg-white", className])}>
      <div>
        <div className="px-2 py-4">
          <p className="text-sm whitespace-pre-line leading-tight">
            " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. "
          </p>
        </div>
        <div className="pb-0 pt-4 pl-2 pr-12">
          <div className={cn([styles.bubbleBorder, "p-4"])}></div>
        </div>

        <div className="flex justify-end">
          <img
            className=""
            src="/frame/tay-talking.webp"
            alt="Tay talking"
            width={64}
            height={64}
            style={{
              imageRendering: "pixelated",
            }}
          />
        </div>
      </div>
    </Box>
  );
}
