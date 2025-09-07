import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Wifi, 
  Zap,
  MonitorSpeaker 
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const systemStats = [
    { icon: Cpu, label: "CPU", value: "i5-14400F", usage: "45%", color: "text-neon" },
    { icon: MemoryStick, label: "RAM", value: "32GB", usage: "8.2GB", color: "text-cyber" },
    { icon: HardDrive, label: "GPU", value: "RTX 3060", usage: "12GB", color: "text-matrix" },
    { icon: Wifi, label: "Network", value: "Online", usage: "Fast", color: "text-hologram" },
  ];

  return (
    <header className="border-b border-border/50 bg-background/30 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between">
        {/* Elena Branding */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Zap className="h-8 w-8 text-neon animate-pulse" />
            <div className="absolute inset-0 animate-ping">
              <Zap className="h-8 w-8 text-neon opacity-20" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold hologram">Elena AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Advanced Neural Intelligence System
            </p>
          </div>
        </div>

        {/* System Monitor */}
        <div className="flex items-center gap-3">
          {systemStats.map(({ icon: Icon, label, value, usage, color }) => (
            <Card key={label} className="p-3 bg-card/50 border-border/30 min-w-[120px]">
              <div className="flex items-center justify-between mb-2">
                <Icon className={cn("h-4 w-4", color)} />
                <Badge variant="secondary" className="text-xs">
                  {label}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold">{value}</div>
                <div className="text-xs text-muted-foreground">{usage}</div>
                <div className="w-full bg-muted/30 rounded-full h-1">
                  <div 
                    className={cn("h-1 rounded-full transition-all duration-300", 
                      label === "CPU" && "bg-neon w-[45%]",
                      label === "RAM" && "bg-cyber w-[26%]",
                      label === "GPU" && "bg-matrix w-[15%]",
                      label === "Network" && "bg-hologram w-[85%]"
                    )} 
                  />
                </div>
              </div>
            </Card>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-neon"
          >
            <MonitorSpeaker className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};