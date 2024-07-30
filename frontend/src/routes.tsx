import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Calendar from "./pages/Calendar";
import Trash from "./pages/Trash";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/note" element={<Notes />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/trash" element={<Trash />} />
    </Routes>
  );
};

export default AppRoutes;
