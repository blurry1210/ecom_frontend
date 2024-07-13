import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.less";
import Button from "../../components/button/Button";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users"); // Verifică URL-ul
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, {
        role: newRole,
      });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
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
            <div>
              <br />
              <Button className="butonsave">Save</Button>
            </div>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UserManagement;
