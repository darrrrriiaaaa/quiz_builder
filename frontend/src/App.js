import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import QuizListPage from "./pages/QuizListPage.tsx";
import QuizDetailPage from "./pages/QuizDetailPage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import Header from "./components/Header.tsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/quizzes" />} />
          <Route path="/quizzes" element={<QuizListPage />} />
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
