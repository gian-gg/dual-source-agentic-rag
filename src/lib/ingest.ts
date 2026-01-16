"use server";

import { embeddingModel } from "./models";
import { supabase } from "./supabase";
import { TaskType } from "@google/generative-ai";

export async function addDocument(content: string, source: string) {
  try {
    const result = await embeddingModel.embedContent({
      content: {
        role: "user",
        parts: [{ text: content }],
      },
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: source,
    });

    const vector = result.embedding.values;

    const { error } = await supabase.from("documents").insert({
      content,
      metadata: { source },
      embedding: vector,
    });

    if (error) throw error;
    console.log(`✅ Ingested: ${source}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Ingestion Failed:", error);
    return { success: false, error };
  }
}
