import {
  StateGraph,
  START,
  END,
  MessagesAnnotation,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { agentModel } from "@/lib/models";
import { internalDocsTool } from "@/lib/tools/internalDocsTool";
import { AIMessage } from "@langchain/core/messages";

async function callModel(state: typeof MessagesAnnotation.State) {
  const modelWithTools = agentModel.bindTools([internalDocsTool]);

  const response = await modelWithTools.invoke(state.messages);

  return { messages: [response] };
}

function shouldContinue(state: typeof MessagesAnnotation.State) {
  const lastMessage = state.messages[state.messages.length - 1] as AIMessage;

  if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
    return "tools";
  }

  return END;
}

const toolNode = new ToolNode([internalDocsTool]);

export const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue, {
    tools: "tools",
    [END]: END,
  })
  .addEdge("tools", "agent")
  .compile();
