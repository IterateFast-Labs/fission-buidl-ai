import { useLLMHistory } from '@/lib/use-llm';
import { MutationStatus } from '@tanstack/react-query';
import ResponseItem from './response-item';
import { useEffect, useRef } from 'react';
import { Box } from '../ui/box';

export default function ResponseList({ status }: { status: MutationStatus }) {
  const list = useLLMHistory();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // 부드럽게 스크롤
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [status]);

  return (
    <Box
      as="div"
      className="flex-grow shrink overflow-y-auto no-scrollbar flex flex-col gap-4"
      ref={scrollRef}
    >
      <div className="space-y-4 h-full pb-4">
        {list.length === 0 && status === 'idle' && (
          <div className="flex-grow flex justify-center h-full items-center">
            <p className="text-center">
              Please enter a prompt to get a response.
            </p>
          </div>
        )}
        {list.map((item, index) => (
          <ResponseItem
            lastItem={index === list.length - 1}
            key={item.submittedAt}
            status={item.status as MutationStatus}
            message={
              item.data as {
                prompt: string;
                response: string;
              }
            }
          />
        ))}
        {status === 'pending' && (
          <ResponseItem
            key={Date.now()}
            status={status}
            message={{
              prompt: 'Loading...',
              response: '',
            }}
          />
        )}
      </div>
    </Box>
  );
}
