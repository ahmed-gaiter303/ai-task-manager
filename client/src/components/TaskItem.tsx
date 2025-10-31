import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import AISuggestion from "./AISuggestion";
import type { Task } from "@shared/schema";

interface TaskItemProps {
  task: Task;
  onToggleComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
  onGenerateSuggestion?: (taskId: string) => void;
  loadingSuggestion?: boolean;
  index?: number;
}

export default function TaskItem({ 
  task, 
  onToggleComplete, 
  onDelete,
  onEdit,
  onGenerateSuggestion,
  loadingSuggestion,
  index = 0
}: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
    if (onToggleComplete) {
      onToggleComplete(task.id);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      if (onDelete) {
        onDelete(task.id);
      }
    }, 300);
  };

  const priorityBorderColors = {
    high: "border-l-priority-high shadow-[inset_4px_0_0_0_rgba(239,68,68,0.3)]",
    medium: "border-l-priority-medium shadow-[inset_4px_0_0_0_rgba(245,158,11,0.3)]",
    low: "border-l-priority-low shadow-[inset_4px_0_0_0_rgba(34,197,94,0.3)]",
  };

  return (
    <Card 
      className={`border-l-4 ${priorityBorderColors[task.priority as keyof typeof priorityBorderColors]} transition-all duration-300 hover:shadow-lg ${
        isCompleted ? 'opacity-60' : ''
      } ${isDeleting ? 'animate-slide-out' : 'animate-slide-in'} hover-elevate border-card-border/50`}
      style={{ animationDelay: `${index * 50}ms` }}
      data-testid={`card-task-${task.id}`}
    >
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={handleToggle}
            className={`mt-1 transition-all duration-300 ${isCompleted ? 'animate-checkmark' : ''}`}
            data-testid={`checkbox-complete-${task.id}`}
          />
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 
                  className={`text-base font-medium transition-all duration-300 ${isCompleted ? 'line-through text-muted-foreground' : ''}`}
                  data-testid={`text-task-title-${task.id}`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1" data-testid={`text-task-description-${task.id}`}>
                    {task.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <PriorityBadge priority={task.priority as "high" | "medium" | "low"} />
                {!isCompleted && onEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(task.id)}
                    className="hover:text-primary h-8 w-8"
                    data-testid={`button-edit-${task.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="hover:text-destructive h-8 w-8"
                  data-testid={`button-delete-${task.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isCompleted && (
              <AISuggestion
                taskId={task.id}
                suggestion={task.aiSuggestion || undefined}
                onGenerateSuggestion={onGenerateSuggestion}
                loading={loadingSuggestion}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
