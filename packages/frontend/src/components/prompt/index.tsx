import useLLM, { LlmMode, useLLMHistory } from '@/lib/use-llm';
import PromptForm from './prompt-form';
import ResponseList from './response-list';

export default function Prompt() {
  const { mutateAsync, status, error } = useLLM();
  const history = useLLMHistory();

  const handleSubmitPrompt = async (prompt: string, isEgirlActive: boolean) => {
    console.log('Prompt submitted:', prompt, isEgirlActive);
    try {
      await mutateAsync({
        prompt,
        mode: isEgirlActive ? LlmMode.EGIRL : LlmMode.Plain,
        history,
      });
    } catch (error) {
      console.error('Error submitting prompt:', error);
    }
  };

  return (
    <div className="flex h-[calc(100svh_-_48px)] flex-col gap-4">
      <ResponseList status={status} />

      <div className="shrink-0">
        <PromptForm
          errorMessage={error?.message}
          onSubmitPrompt={(prompt, isEgirlActive) =>
            handleSubmitPrompt(prompt, isEgirlActive)
          }
        />
      </div>
    </div>
  );
}
