import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Code, Search, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

export const ChatInput = ({ onSendMessage, isProcessing }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [inputMode, setInputMode] = useState<"chat" | "code" | "search" | "think">("chat");

  const handleSend = () => {
    if (message.trim() && !isProcessing) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const modes = [
    { id: "chat", icon: Mic, label: "Chat", color: "text-neon" },
    { id: "code", icon: Code, label: "Code", color: "text-matrix" },
    { id: "search", icon: Search, label: "Search", color: "text-cyber" },
    { id: "think", icon: Brain, label: "Think", color: "text-hologram" },
  ] as const;

  return (
    <div className="p-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
      {/* Mode Selector */}
      <div className="flex gap-2 mb-4 justify-center">
        {modes.map(({ id, icon: Icon, label, color }) => (
          <Button
            key={id}
            variant={inputMode === id ? "default" : "ghost"}
            size="sm"
            onClick={() => setInputMode(id)}
            className={cn(
              "transition-all duration-300",
              inputMode === id 
                ? "bg-gradient-elena glow-neon" 
                : "hover:bg-muted/50",
              color
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Ask Elena anything... (${inputMode} mode)`}
            disabled={isProcessing}
            className={cn(
              "min-h-[50px] pr-12 transition-all duration-300",
              "bg-input/50 border-border/50 focus:border-neon focus:ring-neon",
              "placeholder:text-muted-foreground/70",
              isProcessing && "opacity-50"
            )}
          />
          
          {/* Mode indicator */}
          <div className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2",
            "w-2 h-2 rounded-full animate-pulse",
            inputMode === "chat" && "bg-neon",
            inputMode === "code" && "bg-matrix", 
            inputMode === "search" && "bg-cyber",
            inputMode === "think" && "bg-hologram"
          )} />
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim() || isProcessing}
          className={cn(
            "h-[50px] px-6 transition-all duration-300",
            "bg-gradient-elena hover:scale-105 glow-neon",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Status indicator */}
      {isProcessing && (
        <div className="flex items-center justify-center mt-3 gap-2">
          <div className="animate-pulse text-neon">
            <Brain className="h-4 w-4" />
          </div>
          <span className="text-sm text-muted-foreground animate-pulse">
            Elena is thinking...
          </span>
        </div>
      )}
    </div>
  );
};