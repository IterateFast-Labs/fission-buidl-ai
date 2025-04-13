# Fission

Fission is an AI-driven governance framework that combines **autonomous decision-making**, **transparent benchmarking**, and **on-chain execution** for more efficient, data-driven DAO operations. By integrating large language models (LLMs), futarchy-based prediction markets, and specialized Solidity contracts, Fission aims to streamline decentralized governance processes and expand into DeSAI (decentralized science), Bio Protocol, and more.

## Table of Contents

1. [Overview](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#overview)
2. [Key Features](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#key-features)
3. [Architecture](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#architecture)
4. [Installation & Setup](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#installation--setup)
5. [Usage](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#usage)
6. [Benchmarking with G-Eval](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#benchmarking-with-g-eval)
7. [Challenges](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#challenges)
8. [Roadmap](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#roadmap)
9. [Contributing](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#contributing)
10. [License](https://chatgpt.com/c/67faf206-9354-800a-9235-c381d4d66774#license)

---

## Overview

Decentralized governance often faces issues of low voter turnout, information overload, and difficulties in aligning community incentives. **Fission** addresses these by introducing:

1. **AI Decision Agent** that autonomously parses complex governance proposals, summarizes core points, and recommends or executes on-chain votes.
2. **Transparent Benchmarking** to evaluate the reasoning quality of decision process, ensuring reliability and traceability in AI-driven decisions.
3. **Specialized On-chain Governance Contracts** that securely integrate the AI agent’s decisions into DAO voting mechanisms, including potential futarchy-based signals (prediction markets) and other cross-chain or tool integrations.

By combining these elements, Fission reduces human overhead and subjectivity, bringing **efficiency, transparency, and accountability** to decentralized decision-making.

---

## Key Features

1. **AI Decision Agent**
    - *Natural Language Understanding:* Analyzes governance proposals in plain language.
    - *Reasoning Transparency:* Logs how the AI arrives at its conclusions (reasoning trace with indepth anlaysis).
    - *Futarchy Integration (Optional):* Incorporates prediction market indicators to inform decisions.
    - *On-Chain Execution:* Supports autonomous or semi-autonomous vote casting on DAO proposals.
2. **Benchmark**
    - *G-Eval Integration:* We utilize a custom LLM-based benchmarking suite (G-Eval) to measure coherence, comprehensiveness, consistency, transparency, and ambiguity.
    - *Comparative Analysis:* Compare different LLMs (e.g., GPT-4, Sonnet-3.7) or custom models (Fission’s own) on both simple and deep decision scenarios.
    - *Evaluation base on simple and complex scenarios:* Provide numeric scores and qualitative feedback base on diverse scenarios for real world feasibility.
3. **Agent-Specialized Governance Solidity Code**
    - *Security & Access Control:* Ensures only trusted AI agents can submit or finalize votes on-chain.
    - *Modular Design:* Easy integration with existing governance frameworks (e.g., OpenZeppelin Governor, custom DAO solutions).
    - Persona Adaptation : flexibly configure a variety of AI agent personas based on the proposal and context, enabling the immediate deployment of agents tailored to specific objectives and problem-solving approaches.
    - *Auditable Logs:* Stores reasoning references and decision data on or off-chain for community verification.

---

## Architecture

```
┌─────────────────────────────────────────┐
│         User / Community DAO          │
└─────────────────────────────────────────┘
              │         ▲
              │         │ Governance Proposals / Feedback
              ▼         │
┌─────────────────────────────────────────┐
│         AI Decision Agent             │
│  (LLM Parser, Futarchy Inputs, etc.)  │
└─────────────────────────────────────────┘
              │
              │  Summaries & Votes
              ▼
┌─────────────────────────────────────────┐
│   Governance Smart Contracts (DAO)     │
│   (Agent-Specialized Solidity Code)    │
└─────────────────────────────────────────┘
              │
              │  On-chain Transactions
              ▼
┌─────────────────────────────────────────┐
│        Blockchain / Data Layer         │
└─────────────────────────────────────────┘

```

1. **Data Gathering:** The agent aggregates forum discussions, historical proposals, relevant prediction market data, and optional external sources (e.g., IPFS-stored research or transcripts).
2. **AI Analysis & Decision:** The LLM parses the proposal, references real-time futarchy signals (if configured), and arrives at a recommended action with transparent reasoning logs.
3. **Voting Execution:** If certain confidence thresholds and safety checks are met, the agent executes a transaction on the governance contract (testnet or mainnet).
4. **Benchmarks & Logs:** Each decision includes G-Eval scoring data, stored and visible to all stakeholders for post-hoc analysis and trust-building.

---

## Usage

### **Prerequisites**

- Node.js (v16+)
- npm or yarn
- Redis server (for PIN-AI-MPC)
- Anthropic API key

### **Setup**

1. Clone the repository
    
    ```jsx
    git clone https://github.com/your-org/fission-buidl-ai.git
    cd fission-buidl-ai
    ```
    
2. Install dependencies
    
    ```jsx
    npm install
    ```
    
3. Set up environment variables
    
    Create `.env` files in the appropriate directories:
    
    **Backend (.env in packages/backend/)**
    
    ```jsx
    echo "API_PASSWORD=your_secure_password" > packages/backend/.env
    echo "ANTHROPIC_API_KEY=your_anthropic_api_key" >> packages/backend/.env
    ```
    
    **Frontend (.env in packages/frontend/)**
    
    ```jsx
    echo "VITE_API_URL=http://localhost:3000" > packages/frontend/.env
    ```
    
    **PIN-AI-MPC (.env in packages/pin-ai-mpc/)**
    
    ```jsx
    echo "REDIS_URL=redis://localhost:6379" > packages/pin-ai-mpc/.env
    ```
    
    Be sure to add valid api-keys. Most errors occurred by invalid api-keys.
    
    ## **Running the Application**
    
    ### **Development Mode**
    
    1. Start the backend server
    
    ```jsx
    cd packages/backend
    npm run dev
    ```
    
    1. Start the frontend application (in a new terminal)
    
    ```jsx
    cd packages/frontend
    npm run dev
    ```
    
    1. (only for PIN-AI-MPC) Start the PIN-AI-MPC server (if needed, in a new terminal)
    
    ```jsx
    cd packages/pin-ai-mpc
    npm run dev
    ```
    
    - add following configuration in claude-desktop config file
    
    ```jsx
    {
      "mcpServers": {
    	    "tay_tool": {
    	      "command": "npx",
    	      "args": ["mcp-remote", "URL of your vercel(redis connected) project"]
    	    }
    	  }
    }
    ```
    
    ### **Production Mode**
    
    1. Build the packages and start the services
    
    ```jsx
    npm run build
    
    //backend
    cd packages/backend
    npm start
    
    //frontend
    cd packages/frontend
    npm start
    
    //only for pin-ai
    cd packages/pin-ai-mpc
    npm start
    ```
    

---

## Benchmarking with G-Eval

We employ **G-Eval** to measure the AI’s decision-making quality across two main tasks:

- **Simple Decision Making** (1-2 sentences) : **2.4%** improvement in evaluation metrics.
- **Scenario-based Deep Decision Making** (1-2 pages) : 8**%** improvement in evaluation metrics.

### Simple Decision Example

| Model | Coherence | Comprehensiveness | Consistency | Transparency | Ambiguity |
| --- | --- | --- | --- | --- | --- |
| GPT-4 (CoT) | 0.962 | 0.952 | 0.967 | 0.946 | 0.910 |
| Sonnet-3.7 (CoT) | 0.990 | 0.967 | 0.953 | 0.943 | 0.912 |
| **Fission** | **0.990** | **0.967** | **0.974** | **0.978** | **0.923** |

### Deep Decision Example

| Model | Coherence | Comprehensiveness | Consistency | Transparency | Ambiguity |
| --- | --- | --- | --- | --- | --- |
| GPT-4 (CoT) | 0.955 | 0.901 | 0.928 | 0.936 | 0.917 |
| Sonnet-3.7 (CoT) | 0.930 | 0.932 | 0.953 | 0.912 | 0.915 |
| **Fission** | **0.970** | **0.967** | **0.971** | **0.955** | **0.953** |

The results indicate **Fission** delivers strong consistency and transparency in complex decision scenarios.

Additionally, we conducted a test to assess whether the LLM models could infer answers about a research topic announced by Google DeepMind on March 25, 2025—a topic that these models had not been trained on. The topic was: *"Is SAE (Supervised Auto Encoder) effective and practical for interpreting LLMs?"* Among all models tested, only our proposed methodology and GPT-o1-pro provided the correct answer.(API access to o1-pro has not yet been tested.)

---

## Challenges

- **Hallucination & Accuracy:** Large language models can produce inaccurate or unsupported statements. We mitigate this via G-Eval scoring, additional fine-tuning, and a human-in-the-loop fallback for critical votes. In addition, we plan to incorporate a knowledge database retrieval module using MCP in the future to address this issue.
- **On-chain Security & Gas Constraints:** Deploying agent-driven votes required careful design to prevent malicious inputs, reduce gas usage, and ensure that only trusted entities can trigger votes autonomously.
- **Futarchy Data Integration:** Reliably pulling predictive market data on-chain and fusing it with the LLM’s text-based reasoning was non-trivial. We streamlined this through an off-chain aggregator that posts data to the agent at intervals.

---

## Roadmap

1. **Short Term (Hackathon MVP)**
    - Implement a minimal AI agent that can parse a proposal, produce a recommendation, and execute a simple on-chain vote on a testnet.
    - Integrate a basic G-Eval module to compare different LLM outputs.
2. **Mid Term (Production-Level)**
    - Finalize the agent’s futarchy integration for robust data-driven decisions.
    - Expand G-Eval to Deep Acyclic Graph(DAG) to track continuous improvements and advanced error analysis.
3. **Long Term (Ecosystem Integration)**
    - Apply the framework to multiple DAOs, including those in DeSAI and Bio Protocol contexts.
    - Provide open-source modular libraries for other developers to integrate AI decision-making into their governance processes.
    - Releasing datasets and fine-tuned open-source models that enable more efficient decision-making.

---

## Contributing

Contributions are welcome! If you’d like to help with:

- **Feature Development** (LLM models, futarchy modules, solidity contracts)
- **Documentation** or **Testing**
- **Community Management** or **Design**

Please open an issue or submit a pull request. Check our [Contributing Guidelines](https://chatgpt.com/c/CONTRIBUTING.md) for details.

---

## License

This project is licensed under the [MIT License](https://chatgpt.com/c/LICENSE). Feel free to use, modify, and distribute it as you see fit, while attributing the original source.

---

**Fission** – Empowering AI-driven decisions for a more transparent, efficient, and scalable future in decentralized governance.
