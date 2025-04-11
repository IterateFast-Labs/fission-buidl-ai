import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryClient } from '@/providers/tanstack-query';

const queryKey = ['counter'] as const;

export interface Counter {
  count: number;
}

export function useCounter() {
  const { data } = useQuery<Counter>({
    queryKey: [...queryKey],
    initialData: {
      count: 0,
    },
    meta: {
      persist: true,
    },
  });

  return data;
}

export function useCounterAction() {
  const client = useQueryClient();

  function set(counter: Counter) {
    client.setQueryData(queryKey, counter);
  }

  return {
    set,
  };
}

export function getCounter() {
  const query = queryClient.getQueryCache().find({
    queryKey: queryKey,
    exact: true,
  });

  const counter = query?.state.data as Counter;

  return counter;
}
