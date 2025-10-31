import AddTaskDialog from '../AddTaskDialog';

export default function AddTaskDialogExample() {
  return (
    <AddTaskDialog 
      onAddTask={(task) => console.log('New task:', task)}
    />
  );
}
