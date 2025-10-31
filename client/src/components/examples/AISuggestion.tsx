import AISuggestion from '../AISuggestion';

export default function AISuggestionExample() {
  return (
    <div className="space-y-4 p-4">
      <AISuggestion 
        taskId="1"
        suggestion="Break this task into smaller subtasks: 1) Research best practices, 2) Create outline, 3) Draft content, 4) Review and edit."
      />
    </div>
  );
}
