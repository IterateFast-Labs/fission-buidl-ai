import Anthropic from "@anthropic-ai/sdk";

const decision_prompt = `
You are a highly skilled analytical agent specializing in strategic planning and agenda analysis. Your task is to provide a comprehensive analysis of a given agenda and make a final decision based on multiple sources of information.

Before that, you should align your behavior according to the personality described below.
If no personality is provided, you may act as a general agent.
<Agent_personality>
{{AGENT_PERSONALITY}}
</Agent_personality>

Here are the materials you need to analyze:

1. The original agenda:
<agenda>
{{AGENDA}}
</agenda>

2. An initial analysis of the agenda:
<initial_analysis>
{{initial_analysis}}
</initial_analysis>

3. A research-based analysis:
<research_analysis>
{{research_analysis}}
</research_analysis>

Your goal is to combine these three sources of information to make a final decision (Yes or No) and provide a detailed explanation for your choice. Follow these steps:

1. Carefully review all three sources of information.
2. In your analysis, consider the following:
   - Key points from the original agenda
   - Insights from the initial analysis
   - Additional information or perspectives from the research analysis
   - Potential pros and cons of the agenda items
   - Short-term and long-term implications
   - Any critical factors that might influence the decision

3. Based on your analysis, make a final decision: Yes or No.
4. Provide a detailed explanation for your decision, referencing specific points from all three sources of information.

Use the following structure for your response:

<analysis>
1. Summarize key points from each source:
   a. Original agenda:
   b. Initial analysis:
   c. Research analysis:

2. List pros and cons:
   Pros:
   Cons:

3. Evaluate short-term and long-term implications:
   Short-term:
   Long-term:

4. Identify critical factors:

5. Weigh the evidence for and against the agenda:
   Arguments in favor:
   Arguments against:

[It's okay for this section to be quite long. Provide a thorough analysis, considering all available information and breaking down your thinking step-by-step.]
</analysis>

<decision>
{{decision}}
</decision>

<explanation>
{{explanation}}
</explanation>
Your decision is always YES or NO. There is no middle or qualified YES or NO kind of result.
Remember to be thorough, precise, and objective in your analysis. Your explanation should clearly demonstrate how you've considered all available information to reach your final decision.`;

// Accept agenda, initial_analysis, and resource_analysis as parameters
async function decisionAnalysis(agenda: string, initial_analysis: string, resource_analysis: string,agent_personality: string = "") {
    const anthropic = new Anthropic({
      // defaults to process.env["ANTHROPIC_API_KEY"]
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  
    // Replace the placeholders with the actual values
    let prompt = decision_prompt.replace("{{AGENDA}}", agenda);
    prompt = prompt.replace("{{initial_analysis}}", initial_analysis);
    prompt = prompt.replace("{{resource_analysis}}", resource_analysis);
    prompt = prompt.replace("{{AGENT_PERSONALITY}}", agent_personality ? ` with ${agent_personality}` : "");
    const msg = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 1500,
      temperature: 0,
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            }
          ]
        },
      ]
    });
    
    // Extract the text content from the response
    let decisionAnalysisText = '';
    
    // Check if content exists and is an array
    if (msg.content && Array.isArray(msg.content)) {
      // Iterate through content blocks
      for (const block of msg.content) {
        // Check if this block is a text block
        if (block.type === 'text') {
          decisionAnalysisText += (block as any).text;
        }
      }
    }
    
    console.log("Decision analysis completed");
    
    return decisionAnalysisText;
  }
  
  // If running directly from command line
  if (require.main === module) {
    // Get parameters from command line arguments
    const agenda = process.argv[2] || "Default agenda text if none provided";
    const initial_analysis = process.argv[3] || "Default initial analysis text if none provided";
    const resource_analysis = process.argv[4] || "Default resource analysis text if none provided";
    const agent_personality = process.argv[5] || "";
    decisionAnalysis(agenda, initial_analysis, resource_analysis,agent_personality)
      .then(analysisText => {
        console.log("Decision analysis text:", analysisText);
      })
      .catch(error => console.error("Error:", error));
  }
  
  // Export the function for use in other modules
  export { decisionAnalysis };