import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.less";
import Button from "../../components/button/Button";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/auth/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Failed to fetch users");
      }
    };
    

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/auth/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Role update response:', response.data);
  
      setUsers(users.map((user) =>
        user._id === userId ? { ...user, role: response.data.user.role } : user
      ));
    } catch (error) {
      console.error("Failed to update user role:", error.response ? error.response.data : error.message);
      setError("Failed to update user role");
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/api/auth/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Delete response:', response.data);
  
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error.response ? error.response.data : error.message);
      setError("Failed to delete user");
    }
  };
  

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Manage Users</h1>
      </header>
      <main className="admin-content">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="select_tip"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option className="optionstil" value="user">
                      User
                    </option>
                    <option className="optionstil" value="distributor">
                      Distributor
                    </option>
                  </select>
                </td>
                <td>
                  <button
                    className="butonrosu"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <p className="error-message">{error}</p>}
        <div>
          <br />
          <Button className="butonsave">Save</Button>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
