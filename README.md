# Dual-Source Agentic RAG

A TypeScript lab implementation of Dual-Source Agentic RAG orchestrated by **LangGraph**. This project implements a cyclic agent workflow capable of autonomous tool usage and decision making.

> **Note:** Built on **Next.js 16** to demonstrate seamless integration with modern React frameworks and the Vercel AI SDK.

## Overview

This project demonstrates **Level 2 Agentic RAG** patterns. It orchestrates a stateful "Brain" that can autonomously decide between:

1.  **Retrieval:** Querying internal knowledge via Supabase (pgvector).
2.  **Web Search:** Fetching real-time data via Tavily.
3.  **Reasoning:** Looping back to analyze results before answering.

## Tech Stack

- **Orchestration**: LangGraph
- **Model**: Agnostic (via OpenRouter)
- **Vector Database**: Supabase (pgvector)
