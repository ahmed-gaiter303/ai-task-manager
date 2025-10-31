import StatCard from "./StatCard";
import { CheckCircle2, Clock, ListTodo, Zap } from "lucide-react";

interface DashboardProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  highPriorityTasks: number;
}

export default function Dashboard({ 
  totalTasks, 
  completedTasks, 
  pendingTasks, 
  highPriorityTasks 
}: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Tasks"
        value={totalTasks}
        icon={ListTodo}
        gradient
        delay={0}
      />
      <StatCard
        title="Completed"
        value={completedTasks}
        icon={CheckCircle2}
        delay={100}
      />
      <StatCard
        title="Pending"
        value={pendingTasks}
        icon={Clock}
        delay={200}
      />
      <StatCard
        title="High Priority"
        value={highPriorityTasks}
        icon={Zap}
        delay={300}
      />
    </div>
  );
}
