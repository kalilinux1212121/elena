import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Code, 
  Search, 
  MessageSquare, 
  Settings, 
  Zap,
  Activity,
  Database,
  Wifi,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const capabilities = [
    { icon: Brain, label: "Neural Processing", status: "active", color: "text-neon" },
    { icon: Code, label: "Code Generation", status: "active", color: "text-matrix" },
    { icon: Search, label: "Web Integration", status: "limited", color: "text-cyber" },
    { icon: Database, label: "Memory Systems", status: "active", color: "text-hologram" },
  ];

  const stats = [
    { label: "Processing Power", value: "∞", unit: "TFLOPS" },
    { label: "Response Time", value: "<1", unit: "sec" },
    { label: "Accuracy Rate", value: "99.7", unit: "%" },
    { label: "Learning Speed", value: "Real", unit: "time" },
  ];

  return (
    <div className={cn(
      "h-full border-r border-border/50 bg-sidebar/30 backdrop-blur-sm transition-all duration-300",
      isExpanded ? "w-80" : "w-16",
      className
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            {isExpanded && (
              <div>
                <h2 className="text-xl font-bold hologram">ELENA</h2>
                <p className="text-xs text-muted-foreground">AI Assistant v2.1</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-neon"
            >
              {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="p-4">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-lg bg-card/50 border transition-all duration-300",
            "border-neon/30 glow-neon"
          )}>
            <div className="relative">
              <Activity className="h-5 w-5 text-neon" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon rounded-full animate-pulse" />
            </div>
            {isExpanded && (
              <div>
                <p className="text-sm font-semibold text-neon">ONLINE</p>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </div>
            )}
          </div>
        </div>

        {/* Capabilities */}
        {isExpanded && (
          <>
            <div className="px-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">CAPABILITIES</h3>
              <div className="space-y-2">
                {capabilities.map(({ icon: Icon, label, status, color }) => (
                  <div key={label} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-4 w-4", color)} />
                      <span className="text-sm">{label}</span>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      status === "active" ? "bg-matrix animate-pulse" : "bg-muted"
                    )} />
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4 mx-4 bg-border/30" />

            {/* Performance Stats */}
            <div className="px-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">PERFORMANCE</h3>
              <div className="grid grid-cols-2 gap-2">
                {stats.map(({ label, value, unit }) => (
                  <Card key={label} className="p-3 bg-card/30 border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">{label}</div>
                    <div className="font-bold text-sm">
                      <span className="text-neon">{value}</span>
                      <span className="text-muted-foreground ml-1">{unit}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="mt-auto p-4 border-t border-border/50">
          <div className={cn("space-y-2", !isExpanded && "space-y-1")}>
            <Button
              variant="ghost"
              size={isExpanded ? "sm" : "icon"}
              className={cn(
                "w-full justify-start text-muted-foreground hover:text-neon transition-colors",
                !isExpanded && "justify-center"
              )}
            >
              <MessageSquare className="h-4 w-4" />
              {isExpanded && <span className="ml-2">New Chat</span>}
            </Button>
            <Button
              variant="ghost"
              size={isExpanded ? "sm" : "icon"}
              className={cn(
                "w-full justify-start text-muted-foreground hover:text-cyber transition-colors",
                !isExpanded && "justify-center"
              )}
            >
              <Settings className="h-4 w-4" />
              {isExpanded && <span className="ml-2">Settings</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};