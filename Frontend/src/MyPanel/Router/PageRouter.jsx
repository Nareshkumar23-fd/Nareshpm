import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../Layout/DashboardLayout";
import ContactDetail from "../Pages/ContactDetail"
import Dashboard from "../Pages/DashBoard";
import Experience from "../Pages/Experience";
import Notifications from "../Pages/Notifications";
import TechnicalSkills from "../Pages/TechnicalSkills";
import Projects from "../Pages/Projects";
import NotFound from "../Pages/NotFound";
import Settings from "../Pages/Settings";
import Education from "../pages/Education";
import Protect from "../Components/Protect";
import UserManagement from "../Pages/UserManagement";




const PageRouter = () => {
  return (
    <Routes>
      {/* Routes with Layout */}
      <Route element={<Protect />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/tech-skills" element={<TechnicalSkills />} />
          <Route path="/contact" element={<ContactDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/education" element={<Education />} />
          <Route path="/users" element={<UserManagement />} />
        </Route>
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
};

export default PageRouter;