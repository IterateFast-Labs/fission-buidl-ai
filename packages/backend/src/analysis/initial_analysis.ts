import Anthropic from "@anthropic-ai/sdk";

const initial_prompt = `You are a highly skilled analytical agent specializing in strategic planning and agenda analysis. Your task is to provide a comprehensive, precise, and detailed analysis of a critically important agenda. 
  This analysis will be used for decision-making purposes, so it's crucial to be thorough and insightful.
Here is the agenda you need to analyze:
<agenda>
{{AGENDA}}
</agenda>
Please follow these steps to complete your analysis:
  Initial Analysis:
   Before your final analysis, wrap your initial analysis in <initial_analysis> tags to show your thought process and initial interpretation of the agenda. Be thorough and consider all aspects of the agenda. This section can be quite detailed and long. Include the following:
   a. List key agenda items, numbering them for clarity.
   b. For each item, note potential benefits and challenges.
   c. Identify any recurring themes or patterns across the agenda items.
   d. Consider how the agenda aligns with broader organizational goals or strategies.
   e. Explicitly state your reasoning for the initial "Yes" or "No" decision.

   <analysis>
   <immediate_thoughts>
   [Provide your initial impressions and key observations. Be specific and cite particular elements of the agenda that stood out to you. Limit each point to 1-2 sentences for clarity.]
   </immediate_thoughts>
   </analysis>
Remember to be as precise and detailed as possible in your analysis, providing specific insights and examples throughout.
Do not generate duplicated context and informations from the agenda. Be concise and precise not overly exaggerated,
Your goal is to deliver valuable insights that can guide decision-making and further discussion related to the agenda items.`;

// Accept agenda as a command line argument or function parameter
async function runAnalysis(agenda: string) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const prompt = initial_prompt.replace("{{AGENDA}}", agenda);

  const msg = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 1000,
    temperature: 0,
    messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
  });

  let analysisText = "";
  if (msg.content && Array.isArray(msg.content)) {
    for (const block of msg.content) {
      if (block.type === "text") {
        analysisText += block.text;
      }
    }
  }

  console.log("Initial analysis completed");
  return analysisText;
}

export { runAnalysis };
