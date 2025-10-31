import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import type { InsertTask } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface AddTaskDialogProps {
  onAddTask?: (task: InsertTask) => void;
}

export default function AddTaskDialog({ onAddTask }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newTask: InsertTask = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      completed: false,
    };

    if (onAddTask) {
      onAddTask(newTask);
    }

    toast({
      title: "Task created!",
      description: "Your new task has been added successfully.",
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setOpen(false);
  };

  const charLimit = 500;
  const remainingChars = charLimit - description.length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-cyan-purple hover:opacity-90 border-0 shadow-glow-md animate-pulse-slow hover:animate-none transition-all" 
          data-testid="button-add-task"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] animate-scale-in" data-testid="dialog-add-task">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-cyan-purple bg-clip-text text-transparent">Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your list and let AI help you stay productive
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="transition-all duration-200 focus:shadow-glow-sm"
              data-testid="input-task-title"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-sm font-medium">Description (Optional)</Label>
              <span className={`text-xs ${remainingChars < 50 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {remainingChars} characters left
              </span>
            </div>
            <Textarea
              id="description"
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, charLimit))}
              rows={3}
              className="transition-all duration-200 focus:shadow-glow-sm resize-none"
              data-testid="input-task-description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-sm font-medium">Priority Level</Label>
            <Select value={priority} onValueChange={(value: "high" | "medium" | "low") => setPriority(value)}>
              <SelectTrigger id="priority" className="transition-all duration-200 focus:shadow-glow-sm" data-testid="select-task-priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">🔴 High Priority</SelectItem>
                <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                <SelectItem value="low">🟢 Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              data-testid="button-cancel-task"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-cyan-purple hover:opacity-90 border-0 shadow-glow-sm"
              disabled={!title.trim()}
              data-testid="button-submit-task"
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
