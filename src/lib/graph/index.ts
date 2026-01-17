import {
  StateGraph,
  START,
  END,
  MessagesAnnotation,
} from "@langchain/langgraph";
import { agentModel } from "../models";

async function callModel(state: typeof MessagesAnnotation.State) {
  const response = await agentModel.invoke(state.messages);

  return { messages: [response] };
}

export const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addEdge(START, "agent")
  .addEdge("agent", END) // temp
  .compile();
