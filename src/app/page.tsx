import { Terminal, CheckCircle2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-2xl w-full space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-secondary/30 rounded-full mb-4 border border-border/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              System Online
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 pb-2">
            Dual Source
            <br />
            Agentic RAG
          </h1>

          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Advanced orchestration using directed acyclic graphs for stateful
            tool-calling and real-time synthesis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          {[
            {
              icon: Terminal,
              title: "Architecture",
              desc: "/src structure implemented",
            },
            {
              icon: Cpu,
              title: "Core Systems",
              desc: "Next.js 16 + React 19",
            },
            {
              icon: CheckCircle2,
              title: "Styling",
              desc: "Dark mode reinforced",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-colors duration-300"
            >
              <CardHeader>
                <item.icon className="w-6 h-6 text-primary mb-2" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button size="lg" className="px-8 font-medium">
            Initialize Workflow
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 text-center text-xs text-muted-foreground font-mono">
        v0.1.0 • @antigravity/dual-source
      </div>
    </div>
  );
}
