import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ListPage from "./pages/ListPage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/focus" element={<div>Focus view</div>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
