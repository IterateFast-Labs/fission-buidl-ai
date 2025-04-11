import { useEffect, useState } from "react";
import Frame from "../frame";
import {
  useDecisionAnalysis,
  useInitialAnalysis,
  useResourceAnalysis,
} from "@/lib/use-analysis";
import { Typing } from "../ui/typing";
import { Button } from "../ui/button";

enum AnalysisMode {
  INITIAL = "INITIAL",
  DECISION = "DECISION",
  RESOURCE = "RESOURCE",
}

export default function Analysis({
  agenda,
  setAgenda,
}: {
  agenda: string;
  setAgenda?: (agenda: string) => void;
}) {
  const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.INITIAL);

  const initial = useInitialAnalysis({
    agenda,
  });
  const resource = useResourceAnalysis();
  const decision = useDecisionAnalysis();

  const message = {
    [AnalysisMode.INITIAL]: {
      content: (
        <div className="whitespace-pre-line">
          <Typing
            key={`initial-${initial.status}`}
            text={initial?.data ?? "...Conducting initial analysis..."}
            className="text-sm"
          />
        </div>
      ),
      action: (
        <Button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setMode(AnalysisMode.RESOURCE);
          }}
          disabled={initial.status === "pending"}
        >
          {initial.status === "pending"
            ? "Finalizing..."
            : "Continue to Resource Analysis"}
        </Button>
      ),
    },
    [AnalysisMode.RESOURCE]: {
      content: (
        <div className="whitespace-pre-line">
          <Typing
            key="resource"
            text={resource?.data ?? "...Conducting resource analysis..."}
            className="text-sm font-mono"
          />
        </div>
      ),
      action: (
        <Button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setMode(AnalysisMode.DECISION);
          }}
          disabled={resource.status === "pending"}
        >
          {resource.status === "pending"
            ? "Finalizing..."
            : "Continue to Decision Analysis"}
        </Button>
      ),
    },
    [AnalysisMode.DECISION]: {
      content: (
        <div className="whitespace-pre-line">
          <Typing
            key="decision"
            text={decision?.data ?? "...Conducting decision analysis..."}
            className="text-sm font-mono"
          />
        </div>
      ),
      action: (
        <Button
          className="btn btn-sm btn-primary"
          disabled={decision.status === "pending"}
          onClick={() => {
            setMode(AnalysisMode.INITIAL);
            setAgenda?.("");
          }}
        >
          {decision.status === "pending"
            ? "Finalizing..."
            : "Start New Analysis"}
        </Button>
      ),
    },
  };

  useEffect(() => {
    if (mode === AnalysisMode.RESOURCE) {
      resource.mutate(initial?.data ?? "");
    }

    if (mode === AnalysisMode.DECISION) {
      decision.mutate({
        agenda,
        initialAnalysis: initial?.data ?? "",
        resourceAnalysis: resource?.data ?? "",
      });
    }
  }, [mode, agenda]);

  return (
    <Frame
      agenda={agenda}
      message={message[mode].content}
      className="flex-grow"
      action={message[mode].action}
    />
  );
}
