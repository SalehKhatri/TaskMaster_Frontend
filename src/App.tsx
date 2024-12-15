import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as React from "react";
import Signup from "@/pages/Signup.tsx";
import PublicLayout from "@/layout/PublicLayout.tsx";
import Login from "@/pages/Login.tsx";
import ProtectedLayout from "@/layout/ProtectedLayout.tsx";
import RootLayout from "@/layout/RootLayout.jsx.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Tasks from "@/pages/Tasks.tsx";

function App(): React.ReactElement {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          {/*  Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path={"*"} element={<NotFound />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
