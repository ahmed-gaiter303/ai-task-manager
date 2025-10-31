import TaskItem from "./TaskItem";
import type { Task } from "@shared/schema";
import { CheckCircle2, Sparkles } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
  onGenerateSuggestion?: (taskId: string) => void;
  loadingSuggestionId?: string;
  showCompleted?: boolean;
}

export default function TaskList({ 
  tasks, 
  onToggleComplete, 
  onDelete,
  onEdit,
  onGenerateSuggestion,
  loadingSuggestionId,
  showCompleted = true
}: TaskListProps) {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 space-y-6 animate-fade-in" data-testid="container-empty-state">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-cyan-purple opacity-20 blur-2xl animate-pulse-slow" />
            <div className="relative p-6 bg-card rounded-full shadow-glow-md">
              <Sparkles className="h-16 w-16 text-primary animate-spin-slow" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-cyan-purple bg-clip-text text-transparent">
            Your productivity journey starts here
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create your first task and let AI help you stay organized and achieve more
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {activeTasks.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Active Tasks</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <div className="space-y-3">
            {activeTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
                onGenerateSuggestion={onGenerateSuggestion}
                loadingSuggestion={loadingSuggestionId === task.id}
              />
            ))}
          </div>
        </div>
      )}

      {showCompleted && completedTasks.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-muted-foreground">Completed Tasks</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
          </div>
          <div className="space-y-3">
            {completedTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
