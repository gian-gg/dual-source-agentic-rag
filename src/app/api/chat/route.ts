import { workflow } from "@/lib/graph";
import { toBaseMessages, toUIMessageStream } from "@ai-sdk/langchain";
import { createUIMessageStreamResponse } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const langchainMessages = await toBaseMessages(messages);

  const stream = await workflow.stream(
    { messages: langchainMessages },
    { streamMode: ["values", "messages"] },
  );

  return createUIMessageStreamResponse({
    stream: toUIMessageStream(stream),
  });
}
