import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { useNotification } from '../../components/notifications/NotificationContext';
import './ResetPassword.less';

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState('');
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const showNotification = useNotification();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/reset-password/${userId}/${token}`,
        { password }
      );
  
      if (response.status === 200) {
        navigate("/login");
        showNotification("Password has been reset successfully!", "success");
      } else {
        showNotification("Failed to reset password", "error");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      showNotification("Error resetting password", "error");
    }
  };
  

  return (
    <div className="stilreset">
      <p className="resetmessage">Enter your new password</p>
      <form
        className="stilform"
        action="#"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          type="password"
          value={password}
          onChange={handleChange}
          className="passwordinput"
          placeholder="New Password"
          required
        />
        <Button type="submit">Reset Password</Button>
      </form>
    </div>
  );
};

export default ResetPasswordComponent;
