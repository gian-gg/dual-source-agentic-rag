"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export function Chat() {
  const { messages, status, sendMessage } = useChat();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <Card className="w-full h-full max-w-md md:max-w-2xl flex-1">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Agentic RAG Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about your data or perform web searches.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0! overflow-hidden relative">
        <ScrollArea ref={scrollRef} className="h-full px-4 w-full">
          <div className="flex flex-col gap-4 pb-8">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground mt-20 text-sm">
                No messages yet. Start the conversation!
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8 border border-border">
                  <AvatarFallback
                    className={
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }
                  >
                    {m.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  {m.parts ? (
                    m.parts.map((part, i) => {
                      if (part.type === "text")
                        return (
                          <div
                            key={i}
                            className="space-y-4 prose prose-sm dark:prose-invert max-w-none prose-pre:bg-background/50 prose-pre:border prose-pre:border-border"
                          >
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeHighlight]}
                            >
                              {part.text}
                            </ReactMarkdown>
                          </div>
                        );
                      return null;
                    })
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <Avatar className="w-8 h-8 border border-border">
                  <AvatarFallback className="bg-muted">
                    <Bot className="w-4 h-4 animate-pulse" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-foreground rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center gap-1">
                  <span className="text-muted-foreground">Thinking</span>
                  <div className="flex gap-1 ml-1">
                    <span
                      className="w-1 h-1 bg-foreground/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms", animationDuration: "1s" }}
                    />
                    <span
                      className="w-1 h-1 bg-foreground/60 rounded-full animate-bounce"
                      style={{
                        animationDelay: "150ms",
                        animationDuration: "1s",
                      }}
                    />
                    <span
                      className="w-1 h-1 bg-foreground/60 rounded-full animate-bounce"
                      style={{
                        animationDelay: "300ms",
                        animationDuration: "1s",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t border-border/50">
        <form onSubmit={handleSend} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-background/50 border-border/50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
