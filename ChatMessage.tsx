import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import elenaAvatar from "@/assets/elena-avatar.jpg";

interface ChatMessageProps {
  message: string;
  isElena: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isElena, timestamp, isTyping }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-4 p-4", !isElena && "flex-row-reverse")}>
      <Avatar className={cn("h-12 w-12 border-2 transition-all duration-300", 
        isElena ? "border-neon glow-neon" : "border-cyber glow-cyber")}>
        <AvatarImage 
          src={isElena ? elenaAvatar : undefined} 
          alt={isElena ? "Elena" : "User"} 
        />
        <AvatarFallback className={cn("font-bold text-lg", 
          isElena ? "bg-gradient-elena text-primary-foreground" : "bg-cyber text-primary-foreground")}>
          {isElena ? "E" : "U"}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn("flex flex-col gap-2 max-w-[80%]", !isElena && "items-end")}>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-semibold", 
            isElena ? "hologram" : "text-cyber")}>
            {isElena ? "Elena" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
        
        <Card className={cn(
          "p-4 border transition-all duration-300",
          isElena 
            ? "bg-gradient-chat border-neon/30 glow-neural" 
            : "bg-card/50 border-cyber/30 glow-cyber"
        )}>
          <p className={cn(
            "text-sm leading-relaxed",
            isTyping && "animate-typing overflow-hidden whitespace-nowrap border-r-2 border-neon pr-2"
          )}>
            {message}
          </p>
        </Card>
      </div>
    </div>
  );
};