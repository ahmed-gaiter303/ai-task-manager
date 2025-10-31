import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: "high" | "medium" | "low";
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const styles = {
    high: "bg-priority-high/20 text-priority-high border-priority-high/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
    medium: "bg-priority-medium/20 text-priority-medium border-priority-medium/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
    low: "bg-priority-low/20 text-priority-low border-priority-low/40 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
  };

  const labels = {
    high: "High Priority",
    medium: "Medium Priority",
    low: "Low Priority",
  };

  return (
    <Badge 
      className={`${styles[priority]} border transition-all duration-200 hover:scale-105`} 
      data-testid={`badge-priority-${priority}`}
    >
      {labels[priority]}
    </Badge>
  );
}
