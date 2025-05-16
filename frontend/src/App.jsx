import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import Evaluation from './components/EvaluationPage/Evaluation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/evaluation" element={<Evaluation />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 