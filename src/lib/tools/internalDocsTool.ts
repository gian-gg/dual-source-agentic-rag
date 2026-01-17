import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { supabase } from "@/lib/supabase";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: process.env.EMBEDDING_MODEL_ID!,
  apiKey: process.env.GOOGLE_API_KEY!,
});

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabase,
  tableName: "documents",
  queryName: "match_documents",
});

export const internalDocsTool = tool(
  async ({ query }) => {
    try {
      console.log(`🔍 Searching internal docs for: "${query}"`);

      const results = await vectorStore.similaritySearch(query, 5); // retrieve top 5 most similar chunks

      if (results.length === 0) {
        return "No relevant information found in the internal knowledge base.";
      }

      return results
        .map(
          (doc) => `
SOURCE: ${doc.metadata.source}
CONTENT:
${doc.pageContent}
`,
        )
        .join("\n\n---\n\n");
    } catch (error) {
      console.error("❌ Vector Search Failed:", error);
      return "Error retrieving internal documents.";
    }
  },
  {
    name: "search_internal_docs",
    description:
      "Search the internal knowledge base for company policies, technical documentation, and project details. Always use this first for questions about specific internal topics.",
    schema: z.object({
      query: z
        .string()
        .describe(
          "The semantic search query. Try to capture the core meaning of the user's request.",
        ),
    }),
  },
);
