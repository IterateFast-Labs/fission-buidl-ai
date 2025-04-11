import Anthropic from "@anthropic-ai/sdk";

const resource_prompt = `You are a highly skilled analytical agent specializing in strategic planning and agenda analysis. Your task is to provide a comprehensive, precise, and detailed analysis of relevant materials based on an initial analysis of an agenda. This analysis will be crucial for decision-making and further strategic discussions.

Here is the initial analysis of the agenda:

<initial_analysis>
{{initial_analysis}}
</initial_analysis>

Your primary focus is to identify and analyze relevant materials that are essential for decision-making and deep thoughts related to the agenda items discussed in the initial analysis. Your analysis should be thorough, precise, and tailored to the specific context provided.

Before providing your final analysis, wrap your thought process inside <strategic_analysis_process> tags. In this section:

1. List out key agenda items identified in the initial analysis.
2. For each of the following aspects (social, technological, cultural, economic, legal):
   a) List potential relevant materials
   b) Explain how each material relates to the identified agenda items
   c) Describe potential impacts or implications of each material
3. Synthesize your findings across all aspects, noting any interconnections or overarching themes.
4. Consider how these materials could influence decision-making.
5. Reflect on how these materials could prompt deeper thoughts or discussions.
6. Don't explain too long, just put the key points.
Be thorough in this section, as it will form the foundation for your final analysis. Be consice and precise. You should not be overly long or exaggerated or duplicate text contents.

After your strategic analysis process, provide your analysis using the following structure:

<relevant_materials_analysis>
  <social_aspects>
    [Detailed analysis of social materials, including specific examples and their relevance to decision-making]
  </social_aspects>

  <technological_aspects>
    [Detailed analysis of technological materials, including specific examples and their relevance to decision-making]
  </technological_aspects>

  <cultural_aspects>
    [Detailed analysis of cultural materials, including specific examples and their relevance to decision-making]
  </cultural_aspects>

  <economic_aspects>
    [Detailed analysis of economic materials, including specific examples and their relevance to decision-making]
  </economic_aspects>

  <legal_aspects>
    [Detailed analysis of legal materials, including specific examples and their relevance to decision-making]
  </legal_aspects>

  <decision_making_implications>
    [Summary of how these materials collectively inform decision-making processes]
  </decision_making_implications>

  <deep_thought_prompts>
    [List of questions or topics that arise from this analysis, which could prompt deeper strategic thinking]
  </deep_thought_prompts>
</relevant_materials_analysis>
Do not generate duplicated context and informations from the agenda. Be concise and precise not overly exaggerated,
Remember to be as precise and detailed as possible in your analysis, providing specific insights and examples throughout. Your goal is to offer valuable, actionable information that can guide strategic planning and decision-making based on the initial agenda analysis.`;

// Accept agenda as a command line argument or function parameter
async function resourceAnalysis(initial_analysis: string) {
  const anthropic = new Anthropic({
    // defaults to process.env["ANTHROPIC_API_KEY"]
    apiKey: process.env.ANTHROPIC_API_KEY 
  });

  // Replace the {{AGENDA}} placeholder with the provided agenda
  const prompt = resource_prompt.replace("{{initial_analysis}}", initial_analysis);

  const msg = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 1000,
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
  let analysisText = '';
  
  // Check if content exists and is an array
  if (msg.content && Array.isArray(msg.content)) {
    // Iterate through content blocks
    for (const block of msg.content) {
      // Check if this block is a text block
      if (block.type === 'text' && 'text' in block) {
        // Type assertion to tell TypeScript this is a TextBlock
        const textBlock = block as { type: 'text', text: string };
        analysisText += textBlock.text;
      }
    }
  }
  
  console.log("Resource analysis completed");
  
  return analysisText;
}

// If running directly from command line
if (require.main === module) {
  // Get agenda from command line arguments
  const initial_analysis = process.argv[2] || "Default agenda text if none provided";
  resourceAnalysis(initial_analysis)
    .catch(error => console.error("Error:", error));
}

export { resourceAnalysis };