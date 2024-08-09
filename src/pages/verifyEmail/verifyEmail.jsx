import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log(`Attempting to verify email with userId: ${userId} and token: ${token}`);
        const url = `http://localhost:3000/api/auth/verify/${userId}/${token}`;
        const response = await axios.get(url);
        console.log('Verification response:', response.data);
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Error verifying email:', error);
        navigate('/login', { replace: true });
      }
    };

    verifyEmail();
  }, [userId, token, navigate]);

  return (
    <div>
      <h2>Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
