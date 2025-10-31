import TaskList from '../TaskList';

export default function TaskListExample() {
  const tasks = [
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive docs for the new AI features',
      priority: 'high',
      completed: false,
      aiSuggestion: 'Start by outlining the main sections, then detail each AI feature with examples.',
    },
    {
      id: '2',
      title: 'Review pull requests',
      description: null,
      priority: 'medium',
      completed: false,
      aiSuggestion: null,
    },
    {
      id: '3',
      title: 'Update dependencies',
      description: 'Check for outdated packages',
      priority: 'low',
      completed: true,
      aiSuggestion: null,
    },
  ];

  return (
    <TaskList 
      tasks={tasks}
      onToggleComplete={(id) => console.log('Toggle:', id)}
      onDelete={(id) => console.log('Delete:', id)}
      onGenerateSuggestion={(id) => console.log('Generate suggestion:', id)}
    />
  );
}
