import React from 'react';
import {HashRouter, Routes, Route, NavLink} from "react-router-dom";
import ListPage from "./pages/ListPage";
import {Task} from "./types";
import FocusPage from "./pages/FocusPage";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {TaskContext} from "./contexts/taskStore";
import styled from "styled-components";
import {GlobalStyle} from "./styles";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px;
  min-height: 100vh;
`;
const Nav = styled.nav`
  display: flex;
  margin-bottom: 45px;
`;
const TabButton = styled(NavLink)`
  width: 120px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #fff;
  background: #000;
  
  &:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  
  &:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  
  &.active {
    color: black;
    background-color: #FFC93F;
  }
`;

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  return (
    <>
      <GlobalStyle/>
      <HashRouter>
        <TaskContext.Provider value={[tasks, setTasks]}>
          <Layout>
            <Nav>
              <TabButton to="/">List</TabButton>
              <TabButton to="/focus">Focus</TabButton>
            </Nav>
            <Routes>
              <Route path="/" element={<ListPage/>} />
              <Route path="/focus" element={<FocusPage/>} />
            </Routes>
          </Layout>
        </TaskContext.Provider>
      </HashRouter>
    </>
  );
}

export default App;
