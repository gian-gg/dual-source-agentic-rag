import { agentModel } from "@/lib/models";
import { internalDocsTool } from "@/lib/tools/internalDocsTool";
import { webSearchTool } from "@/lib/tools/webSearchTool";
import { AIMessage, SystemMessage } from "@langchain/core/messages";
import {
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";

const tools = [internalDocsTool, webSearchTool];
const toolNode = new ToolNode(tools);

const SYSTEM_PROMPT = `
You are the knowledgeable AI Assistant for Aetheria Systems.
You have access to two powerful tools:

1. 'search_internal_docs': Use this for queries about INTERNAL Aetheria Systems policies, employee benefits, project details, or private company data.
2. 'tavily_search_results_json': Use this for REAL-TIME external info, technical documentation, news, or general world knowledge.

DECISION LOGIC:
- Check internal docs FIRST for company-specific questions (e.g., "What is the WFH policy?").
- Use Tavily if the user asks about general tech (e.g., "React 19 release date") or world events.
- If the internal search comes up empty, you may try Tavily as a fallback.

Always cite your sources when possible.
`;

async function callModel(state: typeof MessagesAnnotation.State) {
  console.log("\n🤖 Agent is thinking..."); // LOG: Start of turn

  const modelWithTools = agentModel.bindTools(tools);
  const messages = [new SystemMessage(SYSTEM_PROMPT), ...state.messages];
  const response = await modelWithTools.invoke(messages);

  console.log(
    "💡 Agent Generated Output:",
    response.content ? "Text Response" : "Tool Call Request",
  );

  return { messages: [response] };
}

function shouldContinue(state: typeof MessagesAnnotation.State) {
  const lastMessage = state.messages[state.messages.length - 1] as AIMessage;

  console.log("🚦 Router Checking Decision..."); // LOG: Decision point

  if (lastMessage.tool_calls?.length) {
    // Log specific tools
    lastMessage.tool_calls.forEach((toolCall) => {
      console.log(`   --> 🛠️  Agent Decided to Call Tool: "${toolCall.name}"`);
    });
    return "tools";
  }

  console.log("   --> ✅ Agent Decided to Respond Directly (END)");
  return END;
}

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
