<img src="public/logo.png" alt="Aetheria Logo" width="64" />

# Dual-Source Agentic RAG

A **TypeScript lab** implementation of Dual-Source Agentic RAG orchestrated by **LangGraph**. This project implements a cyclic agent workflow capable of autonomous tool usage, self-correction, and decision-making.

> **Note:** Built on **Next.js 16** to demonstrate seamless integration with modern React frameworks and the Vercel AI SDK.

## Overview

This project demonstrates **Level 2 Agentic RAG** patterns. It orchestrates a stateful "Brain" that can autonomously decide between:

1.  **Retrieval:** Querying internal knowledge via Supabase (pgvector).
2.  **Web Search:** Fetching real-time data via Tavily.
3.  **Reasoning:** Looping back to analyze results before answering.

## Tech Stack

- **Orchestration**: LangGraph (Cyclic State Graphs)
- **Frontend**: Next.js 16 + Vercel AI SDK
- **Model**: Agnostic (via OpenRouter)
- **Vector Database**: Supabase (pgvector)
- **Web Search**: Tavily AI

## 🧠 The Agent Lifecycle

Unlike linear chains (DAGs), this agent operates in a **Loop** (`Think` -> `Act` -> `Observe` -> `Refine`).

Below is a real capture of the agent's decision-making process for a complex query.

**Prompt:**

> _"Does Aetheria Systems have a remote work policy? Also, what is the current stock price of Microsoft?"_

**Logs:**

```text
🤖 Agent is thinking...
💡 Agent Generated Output: Text Response
🚦 Router Checking Decision...
   --> 🛠️  Agent Decided to Call Tool: "search_internal_docs"

🤖 Agent is thinking...
💡 Agent Generated Output: Text Response
🚦 Router Checking Decision...
   --> 🛠️  Agent Decided to Call Tool: "search_internal_docs"

🤖 Agent is thinking...
💡 Agent Generated Output: Text Response
🚦 Router Checking Decision...
   --> 🛠️  Agent Decided to Call Tool: "tavily_search"

🤖 Agent is thinking...
💡 Agent Generated Output: Text Response
🚦 Router Checking Decision...
   --> ✅ Agent Decided to Respond Directly (END)

```

## Features

- **Cyclic Orchestration:** Recursive thought-action-observation loops allow the AI to correct its own mistakes.
- **Dual-Source Retrieval:** Intelligently arbitrates between private company data and public internet data.
- **Stateful Streaming:** "Thoughts" and intermediate tool outputs are streamed to the UI in real-time.
