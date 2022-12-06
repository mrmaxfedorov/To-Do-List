import React, {ChangeEvent, KeyboardEvent} from "react";
import {Task} from "../types";
import {useTaskStore} from "../hooks/useTaskStore";

type Props = {};

const ListPage: React.FC<Props> = () => {
  const {addTask, tasks, setTasks, updateTaskCompletion} = useTaskStore()
  const [newTaskLabel, setNewTaskLabel] = React.useState('');

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value)

  const handleNewTaskKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newTaskLabel !== '') {
      addTask({label: newTaskLabel});
      setNewTaskLabel('');
    }
  };

  const handleTaskCompleteChange = (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
    updateTaskCompletion(task.id, e.target.checked)
  };
  console.log(tasks);

  const handleClearClick = () =>
    setTasks(tasks => tasks.filter(task => !task.isComplete))

  const handleTaskDeleteClick = (handledTask: Task) => () => {
    setTasks(tasks => tasks.filter(task => task.id !== handledTask.id))
  }

  return (
    <div>
      <div>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isComplete} onChange={handleTaskCompleteChange(task)}/>{task.label}
              <button onClick={handleTaskDeleteClick(task)}>delete</button>
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