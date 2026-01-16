// RUN: bun tsx -r tsconfig-paths/register scripts/ingest-local-docs.ts

import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { addDocument } from "../src/lib/ingest";

// --- Configuration ---
const DATA_DIR = "./data";
const CHUNK_SIZE = 2500;
const CHUNK_OVERLAP = 250;

// Pass "markdown" as a string directly
const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: CHUNK_SIZE,
  chunkOverlap: CHUNK_OVERLAP,
});

async function main() {
  try {
    const files = await fs.readdir(DATA_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    console.log(
      `📂 Found ${mdFiles.length} markdown files. Starting ingestion...`,
    );

    for (const fileName of mdFiles) {
      const filePath = path.join(DATA_DIR, fileName);
      const content = await fs.readFile(filePath, "utf-8");

      // 1. Split the file into chunks
      const chunks = await splitter.splitText(content);
      console.log(`📄 Splitting "${fileName}" into ${chunks.length} chunks...`);

      // 2. Ingest each chunk
      for (let i = 0; i < chunks.length; i++) {
        await addDocument(
          chunks[i],
          `${fileName} (chunk ${i + 1}/${chunks.length})`,
        );
      }
    }

    console.log("✅ Ingestion complete!");
  } catch (error) {
    console.error("❌ Batch ingestion failed:", error);
  }
}

main();
