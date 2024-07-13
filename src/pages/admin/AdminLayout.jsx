import React from "react";
import "./Admin.less";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
