import { useRef } from 'react';
import { Box } from '../ui/box';
import { Button } from '../ui/button';
import Textarea from '../ui/textarea';

export interface PromptFormProps {
  onSubmitPrompt: (prompt: string, isEgirlActive: boolean) => void;
  maxHeight?: number;
  errorMessage?: string;
}

export default function PromptForm({
  onSubmitPrompt,
  maxHeight = 320,
  errorMessage,
}: PromptFormProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const isEgirlActive = formData.get('egirlActive') === 'on';
    const prompt = formData.get('prompt') as string;
    if (prompt.trim() === '') {
      return;
    }
    onSubmitPrompt(prompt, isEgirlActive);

    // Reset the textarea
    if (textAreaRef.current) {
      textAreaRef.current.value = '';
      textAreaRef.current.style.height = 'auto';
    }
  };

  return (
    <Box as="article">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {errorMessage !== 'null' && (
          <div>
            <p className="text-red-500 text-xs">{errorMessage}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Textarea
            ref={textAreaRef}
            className="overflow-auto outline-none resize-none"
            name="prompt"
            autoFocus
            autoCorrect="off"
            autoCapitalize="off"
            onInput={(event) => {
              const target = event.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              const scrollHeight = target.scrollHeight;

              if (scrollHeight < maxHeight) {
                target.style.height = `${target.scrollHeight + 8}px`;
              } else {
                target.style.height = maxHeight + 'px';
              }
            }}
          />
        </div>
        <div className="flex justify-end gap-6">
          <div className="flex items-center gap-1">
            <input type="checkbox" id="mode" name="egirlActive" />
            <label htmlFor="mode">E-girl Mode</label>
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Box>
  );
}
