import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  gradient?: boolean;
  delay?: number;
}

export default function StatCard({ title, value, icon: Icon, gradient, delay = 0 }: StatCardProps) {
  return (
    <Card 
      className="hover-elevate transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm animate-scale-in border-card-border/50"
      style={{ animationDelay: `${delay}ms` }}
      data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-4xl font-bold" data-testid={`text-stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              <AnimatedCounter value={value} />
            </p>
          </div>
          <div className={`p-3 rounded-md transition-all duration-300 ${gradient ? 'bg-gradient-cyan-purple shadow-glow-sm' : 'bg-muted'}`}>
            <Icon className={`h-6 w-6 ${gradient ? 'text-white' : 'text-foreground'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
