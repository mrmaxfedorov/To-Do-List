import React, {ChangeEvent} from 'react';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import ListPage from "./pages/ListPage";
import {Task} from "./types";
import FocusPage from "./pages/FocusPage";
import {shuffle} from "lodash";
import {nanoid} from "nanoid";

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [focusedTaskId, setFocusedTaskId] = React.useState<string | undefined>(undefined);

  const addTask = (task: Pick<Task, 'label'>) => {
    const id = nanoid();
    setTasks((tasks) => [
      ...tasks,
      { id, label: task.label, isComplete: false},
      ]);
    if (!focusedTaskId) setFocusedTaskId(id);
    };

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === taskId) return {...task, isComplete};
      return task;
    }))
  };

  const focusedTask = tasks.find((task) => task.id === focusedTaskId);

  const shuffleFocusedTask = () => {
    setFocusedTaskId(
      shuffle(tasks.filter(task => !task.isComplete))[0]?.id
    )
  }

  const tasksApi = {
    addTask,
    focusedTask,
    tasks,
    setTasks,
    shuffleFocusedTask,
    updateTaskCompletion};

  return (
      <BrowserRouter>
        <nav>
          <NavLink to="/">List view!</NavLink>
          <NavLink to="/focus">Focus view!</NavLink>
        </nav>
          <Routes>
              <Route path="/" element={<ListPage {...tasksApi} />} />
              <Route path="/focus" element={<FocusPage {...tasksApi}/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
