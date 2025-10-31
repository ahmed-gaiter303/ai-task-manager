import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import TaskList from "@/components/TaskList";
import AddTaskDialog from "@/components/AddTaskDialog";
import FilterTabs, { FilterType } from "@/components/FilterTabs";
import SearchBar from "@/components/SearchBar";
import { Sparkles, Keyboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Task, InsertTask } from "@shared/schema";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create a modern, responsive landing page with hero section',
      priority: 'high',
      completed: false,
      aiSuggestion: 'Break this into phases: wireframing, design mockups, and implementation. Start with mobile-first approach.',
    },
    {
      id: '2',
      title: 'Review team code submissions',
      description: null,
      priority: 'medium',
      completed: false,
      aiSuggestion: 'Set aside 2 hours for focused review. Check for code quality, tests, and documentation.',
    },
    {
      id: '3',
      title: 'Update project dependencies',
      description: 'Check for security updates and breaking changes',
      priority: 'low',
      completed: false,
      aiSuggestion: null,
    },
    {
      id: '4',
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      priority: 'high',
      completed: false,
      aiSuggestion: null,
    },
    {
      id: '5',
      title: 'Write unit tests',
      description: 'Add tests for new authentication features',
      priority: 'medium',
      completed: true,
      aiSuggestion: null,
    },
  ]);

  const [loadingSuggestionId, setLoadingSuggestionId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('[data-testid="input-search"]')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleAddTask = (newTask: InsertTask) => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || null,
      priority: newTask.priority || 'medium',
      completed: newTask.completed || false,
      aiSuggestion: null,
    };
    setTasks([task, ...tasks]);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task reopened" : "Task completed!",
        description: task.completed ? "Keep pushing forward!" : "Great job! Keep up the momentum! 🎉",
      });
    }
  };

  const handleDelete = (taskId: string) => {
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== taskId));
      toast({
        title: "Task deleted",
        description: "The task has been removed from your list.",
      });
    }, 300);
  };

  const handleEdit = (taskId: string) => {
    console.log('Edit task:', taskId);
    toast({
      title: "Edit feature",
      description: "Task editing coming soon!",
    });
  };

  const handleGenerateSuggestion = (taskId: string) => {
    setLoadingSuggestionId(taskId);
    
    setTimeout(() => {
      const suggestions = [
        'Break this task into smaller, manageable chunks. Start with the most critical piece first.',
        'Consider delegating parts of this task if possible. Focus on high-impact activities.',
        'Set a specific time block for this task. Use the Pomodoro technique for better focus.',
        'Review similar past tasks for best practices. Document your approach for future reference.',
        'Identify dependencies and potential blockers early. Create a clear action plan.',
        'Start with a quick prototype to validate your approach before full implementation.',
      ];
      
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, aiSuggestion: suggestions[Math.floor(Math.random() * suggestions.length)] }
          : task
      ));
      setLoadingSuggestionId(undefined);
    }, 1500);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesFilter = 
      activeFilter === "all" ? true :
      activeFilter === "active" ? !task.completed :
      task.completed;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
  };

  const filterCounts = {
    all: tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || (t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)).length,
    active: tasks.filter(t => !t.completed && (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || (t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false))).length,
    completed: tasks.filter(t => t.completed && (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || (t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false))).length,
  };

  return (
    <div className="min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        <header className="flex flex-col gap-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-cyan-purple rounded-md shadow-glow-md">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-vibrant bg-clip-text text-transparent">
                  AI Task Manager
                </h1>
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                Boost your productivity with AI-powered task suggestions
                <span className="hidden sm:inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Keyboard className="h-3 w-3" />
                  Press ⌘K to search
                </span>
              </p>
            </div>
            <AddTaskDialog onAddTask={handleAddTask} />
          </div>

          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tasks... (⌘K)"
          />
        </header>

        <Dashboard
          totalTasks={stats.total}
          completedTasks={stats.completed}
          pendingTasks={stats.pending}
          highPriorityTasks={stats.highPriority}
        />

        <div className="space-y-6">
          <FilterTabs 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={filterCounts}
          />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onGenerateSuggestion={handleGenerateSuggestion}
            loadingSuggestionId={loadingSuggestionId}
            showCompleted={activeFilter !== "active"}
          />
        </div>

        <footer className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground animate-fade-in">
          <p>AI Task Manager · Built with precision and care · v1.0.0</p>
        </footer>
      </div>
    </div>
  );
}
