import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatOpenAI } from "@langchain/openai";

export const agentModel = new ChatOpenAI({
  modelName: process.env.AGENT_MODEL_ID!,
  apiKey: process.env.OPENROUTER_API_KEY!,
  configuration: { baseURL: "https://openrouter.ai/api/v1" },
});

// im using google's embedding model which is not available on openrouter
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
export const embeddingModel = genAI.getGenerativeModel({
  model: process.env.EMBEDDING_MODEL_ID!,
});
