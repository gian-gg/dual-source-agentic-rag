import { Chat } from "@/components/chat";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col items-center p-4 relative overflow-hidden gap-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 pb-2">
        dual-source-agentic-rag
      </h1>
      <main className="w-full min-h-0 max-w-4xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700 flex-1">
        <Chat />
      </main>

      <div className="text-center text-xs text-muted-foreground font-mono">
        <Link
          href="https://github.com/gian-gg"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          by gian-gg
        </Link>
      </div>
    </div>
  );
}
