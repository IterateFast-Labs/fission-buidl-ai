import { MutationStatus } from '@tanstack/react-query';
import { Typing } from '../ui/typing';

export default function ResponseItem({
  message,
  status,
  lastItem = false,
}: {
  message: {
    prompt: string;
    response: string;
  };
  status: MutationStatus;
  lastItem?: boolean;
}) {
  if (status === 'pending') {
    return <p className="text-center p-4">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-start">
        <p className="whitespace-pre-line border w-fit px-4 py-2">
          {message.prompt}
        </p>
      </div>
      <div>
        <Typing
          enableTypingEffect={lastItem}
          className="whitespace-pre-line px-4 pt-2 pb-6 w-full"
          text={message.response}
        />
      </div>
    </div>
  );
}
