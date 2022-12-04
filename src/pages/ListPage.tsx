import React, {ChangeEvent, KeyboardEvent} from "react";
import {nanoid} from "nanoid";

type Props = {};

type Task = {
  id: string;
  label: string;
  isComplete: boolean;
}

const ListPage: React.FC<Props> = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [newTaskLabel, setNewTaskLabel] = React.useState('');

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value)

  const handleNewTaskKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newTaskLabel !== '') {
      setTasks((tasks) => [...tasks, {id: nanoid(), label: newTaskLabel, isComplete: false}]);
      setNewTaskLabel('');
    }
  };

  const handleCompleteChange = (handledTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === handledTask.id) return {...task, isComplete: e.target.checked};
      return task;
    }))
  };
  console.log(tasks);
  const handleClearClick = () =>
    setTasks(tasks => tasks.filter(task => !task.isComplete))

  return (
    <div>
      <div>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isComplete} onChange={handleCompleteChange(task)}/>{task.label}
            </li>
            ))}
        </ul>
      </div>
      List view
      <input
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}></input>
      <button onClick={handleClearClick}>
        Clear completed
      </button>
    </div>
  )
}

export default ListPage