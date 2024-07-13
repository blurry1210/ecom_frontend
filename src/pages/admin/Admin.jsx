import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import UserManagement from "./UserManagement";
import AdminLogin from "./AdminLogin";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <UserManagement />
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default Admin;
