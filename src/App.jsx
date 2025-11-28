import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";
import Instructor from "./components/Instructor";
import Certificate from "./components/Certificate";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import { isLoggedIn, getRole } from "./services/auth";

function App() {
  const logged = isLoggedIn();
  const role = getRole();

  return (
    <Router>
      <Routes>
        <Route path="/" element={logged ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />
        <Route path="/courses/:id" element={
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        } />
        <Route path="/quiz/:courseId/:quizId" element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/certificate/:courseId" element={
          <ProtectedRoute>
            <Certificate />
          </ProtectedRoute>
        } />
        <Route path="/instructor" element={
          <ProtectedRoute allowedRole="instructor">
            <Instructor />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
