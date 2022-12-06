import React from 'react';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import ListPage from "./pages/ListPage";
import {Task} from "./types";
import FocusPage from "./pages/FocusPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { TaskContext} from "./contexts/taskStore";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  return (
      <BrowserRouter>
        <TaskContext.Provider value={[tasks, setTasks]}>
        <nav>
          <NavLink to="/">List view!</NavLink>
          <NavLink to="/focus">Focus view!</NavLink>
        </nav>
          <Routes>
              <Route path="/" element={<ListPage/>} />
              <Route path="/focus" element={<FocusPage/>} />
          </Routes>
        </TaskContext.Provider>
      </BrowserRouter>
  );
}

export default App;
