import TaskItem from '../TaskItem';

export default function TaskItemExample() {
  const task = {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive docs for the new AI features',
    priority: 'high',
    completed: false,
    aiSuggestion: 'Start by outlining the main sections, then detail each AI feature with examples.',
  };

  return (
    <TaskItem 
      task={task}
      onToggleComplete={(id) => console.log('Toggle task:', id)}
      onDelete={(id) => console.log('Delete task:', id)}
      onGenerateSuggestion={(id) => console.log('Generate suggestion for:', id)}
    />
  );
}
