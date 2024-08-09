import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from "../../components/button/Button";
import TopBar from "../../components/TopBar/TopBar";
import './register.less';

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const register = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, ...userData } = user;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      console.log('Registering user:', userData);
      const response = await axios.post('http://localhost:3000/api/auth/register', { ...userData, password });
      console.log('User created:', response.data);
      setSuccess('Registration successful! Please check your email to verify your account.');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register, please check your credentials and try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center">Create a new account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form autoComplete="off" onSubmit={register}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="role"
                  value="user"
                  checked={user.role === "user"}
                  onChange={handleChange}
                />
                <label className="form-check-label">User</label>
              </div>
              <div className="form-group form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="role"
                  value="distributor"
                  checked={user.role === "distributor"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Distributor</label>
              </div>
              <Button type="submit" className="btn btn-primary btn-block">Register</Button>
            </form>
            <div className="text-center mt-3">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
