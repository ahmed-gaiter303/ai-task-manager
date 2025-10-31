import FilterTabs from '../FilterTabs';
import { useState } from 'react';

export default function FilterTabsExample() {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "completed">("all");
  
  return (
    <FilterTabs 
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      counts={{ all: 15, active: 10, completed: 5 }}
    />
  );
}
