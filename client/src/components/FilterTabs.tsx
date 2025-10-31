import { Badge } from "@/components/ui/badge";

export type FilterType = "all" | "active" | "completed";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const tabs: { value: FilterType; label: string }[] = [
    { value: "all", label: "All Tasks" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex gap-2 border-b border-border/50">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={`
            relative px-4 py-2 text-sm font-medium transition-all duration-200
            ${activeFilter === tab.value 
              ? 'text-foreground' 
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
          data-testid={`button-filter-${tab.value}`}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            <Badge 
              variant="secondary" 
              className={`
                text-xs transition-all duration-200
                ${activeFilter === tab.value 
                  ? 'bg-gradient-cyan-purple text-white shadow-glow-sm' 
                  : ''
                }
              `}
            >
              {counts[tab.value]}
            </Badge>
          </span>
          {activeFilter === tab.value && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-cyan-purple shadow-glow-sm animate-scale-in" />
          )}
        </button>
      ))}
    </div>
  );
}
