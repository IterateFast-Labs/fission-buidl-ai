import { useMutation, useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";

export async function doInitialAnalysis(agenda: string) {
  const { result } = await fetcher<{ result: string }>(
    "/api/initial-analysis",
    {
      method: "POST",
      body: JSON.stringify({
        agenda,
      }),
    }
  );

  return result;
}

export async function doResourceAnalysis(initialAnalysis: string) {
  const { result } = await fetcher<{ result: string }>(
    "/api/resource-analysis",
    {
      method: "POST",
      body: JSON.stringify({
        initial_analysis: initialAnalysis,
      }),
    }
  );

  return result;
}

export async function doDecisionAnalysis({
  agenda,
  initialAnalysis,
  resourceAnalysis,
  agentPersonality = "",
}: {
  agenda: string;
  initialAnalysis: string;
  resourceAnalysis: string;
  agentPersonality?: string;
}) {
  const { result } = await fetcher<{ result: string }>(
    "/api/decision-analysis",
    {
      method: "POST",
      body: JSON.stringify({
        agenda,
        initial_analysis: initialAnalysis,
        resource_analysis: resourceAnalysis,
        agent_personality: agentPersonality,
      }),
    }
  );

  return result;
}

export function useInitialAnalysis({ agenda }: { agenda: string }) {
  return useQuery({
    queryKey: ["analysis", "initial", agenda],
    // mutationFn: doInitialAnalysis,
    queryFn: () => doInitialAnalysis(agenda),
    enabled: !!agenda,
    refetchOnWindowFocus: false,
  });
}

export function useResourceAnalysis() {
  return useMutation({
    mutationKey: ["analysis", "resource"],
    mutationFn: doResourceAnalysis,
  });
}

export function useDecisionAnalysis() {
  return useMutation({
    mutationKey: ["analysis", "decision"],
    mutationFn: doDecisionAnalysis,
  });
}
