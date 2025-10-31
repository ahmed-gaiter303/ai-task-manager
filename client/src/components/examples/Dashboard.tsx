import Dashboard from '../Dashboard';

export default function DashboardExample() {
  return (
    <Dashboard 
      totalTasks={24}
      completedTasks={18}
      pendingTasks={6}
      highPriorityTasks={3}
    />
  );
}
