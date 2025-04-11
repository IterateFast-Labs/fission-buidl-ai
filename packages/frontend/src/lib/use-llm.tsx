/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MutationState,
  useMutation,
  useMutationState,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { sleep } from "./sleep";

export enum LlmMode {
  Plain = "PLAIN",
  EGIRL = "EGIRL",
}

export async function getLLMResponse({
  prompt,
  mode = LlmMode.Plain,
  history,
}: {
  prompt: string;
  mode?: LlmMode;
  history?: MutationState[];
}) {
  await sleep(1200);
  if (!prompt) {
    throw new Error("Prompt is required");
  }

  if (prompt.trim() === "") {
    throw new Error("Prompt cannot be empty");
  }

  const recentHistory = history?.slice(-4) || [];

  const output =
    mode === LlmMode.Plain
      ? "Please respond in a plain and concise manner, without any emojis or excessive cuteness. maximum 280 chars"
      : 'in "V-tuber gremlin energy" style with bunch of emoji, and e-girl cuteness. No hashtags, Use AA most used in japan community(≧∀≦), maximum 280 chars';

  const formattedPrompt = `
    You are a helpful assistant. Please respond to the following prompt:\n
    <prompt>\n
    ${prompt}
    </prompt>\n
    <output>\n
    ${output}\n
    \n
    Please respond in the same language as the input prompt (English <-> English, Korean -> Korean).\n
    \n
    The response should be maximum 240 characters.\n
    Always memorize previous history (ascending order) and avoid repeating the same response.\n
    </output>
    <previous_history>\n
    ${JSON.stringify(
      recentHistory.map((item) => ({
        prompt: (item.data as any).prompt,
        response: (item.data as any).response,
      }))
    )}
    </previous_history>
  `;

  console.log("Formatted Prompt:", formattedPrompt);

  const apiKey = import.meta.env.VITE_LLM_API_KEY as string;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: formattedPrompt }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch LLM response");
  }

  const data = await response.json();

  // extract response text
  const responseText = data.candidates[0].content.parts[0].text;

  return {
    prompt,
    response: responseText,
  };
}

export const mutationKey = ["llm-response"];

export default function useLLM() {
  return useMutation({
    mutationFn: getLLMResponse,
    mutationKey,
  });
}

const historyKey = "@fission-id:llm-history";

export function useLLMHistory() {
  const savedListString = localStorage.getItem(historyKey);
  const savedList: MutationState[] = savedListString
    ? JSON.parse(savedListString)
    : [];

  // Get the list of LLM responses from the mutation state
  const list = useMutationState({
    filters: {
      mutationKey,
      status: "success",
      exact: true,
    },
  });

  // 두개를 합치되, 중복된 submittedAt은 제거
  const merged = [...savedList, ...list] as MutationState[];

  const sanitized = merged.reduce(
    (acc: MutationState[], item: MutationState) => {
      const existingItem = acc.find((i) => i.submittedAt === item.submittedAt);
      if (!existingItem) {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  useEffect(() => {
    // update the local storage with the new list
    localStorage.setItem(
      historyKey,
      JSON.stringify(
        sanitized.map((item) => ({
          submittedAt: item.submittedAt,
          data: item.data,
          status: item.status,
        })) as MutationState[]
      )
    );
  }, [sanitized]);

  return sanitized;
}
