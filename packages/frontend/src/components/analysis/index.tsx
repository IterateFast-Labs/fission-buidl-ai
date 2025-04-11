import { useState } from "react";
import Frame from "../frame";
import {
  useDecisionAnalysis,
  useInitialAnalysis,
  useResourceAnalysis,
} from "@/lib/use-analysis";

enum AnalysisMode {
  INITIAL = "INITIAL",
  DECISION = "DECISION",
  RESOURCE = "RESOURCE",
}

export default function Analysis({ agenda }: { agenda: string }) {
  const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.INITIAL);

  const initial = useInitialAnalysis();
  const resource = useResourceAnalysis();
  const decision = useDecisionAnalysis();

  return <Frame agenda={agenda} message="213" className="flex-grow" />;
}
