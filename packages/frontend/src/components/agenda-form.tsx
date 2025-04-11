import { useRef } from "react";
import { Box } from "./ui/box";
import Textarea from "./ui/textarea";
import { Typing } from "./ui/typing";
import { Button } from "./ui/button";

export default function AgendaForm({
  onSubmit,
}: {
  onSubmit?: (agenda: string) => void;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 높이 자동 조절
    const maxHeight = 320;
    const target = event.currentTarget;

    target.style.height = "auto";
    target.style.height = `${Math.min(target.scrollHeight, maxHeight)}px`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const agenda = formData.get("agenda") as string;

    if (!agenda || agenda.trim() === "") {
      return;
    }

    onSubmit?.(agenda);
  };

  return (
    <Box>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="py-1 text-base tracking-tight">
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
