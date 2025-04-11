import { useRef } from "react";
import { Box } from "./ui/box";
import Textarea from "./ui/textarea";
import { Typing } from "./ui/typing";
import { Button } from "./ui/button";

export default function AgendaForm() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 높이 자동 조절
    const maxHeight = 180;
    const target = event.currentTarget;

    target.style.height = "auto";
    target.style.height = `${Math.min(target.scrollHeight, maxHeight)}px`;
  };

  return (
    <Box className="bg-primary p-0 border-white *:text-white">
      <form className="p-2 space-y-0.5">
        <div className="py-1">
          SYSTEM &gt; {/* 분석하고 싶은 Agenda를 입력하세요 */}
          <Typing
            text="Please enter the agenda you want to analyze"
            className="inline-block"
          />
        </div>
        <Textarea
          ref={textAreaRef}
          autoFocus
          className="border-0 bg-transparent! resize-none w-full p-2!"
          placeholder="Enter agenda here"
          onInput={handleInput}
        ></Textarea>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
}
