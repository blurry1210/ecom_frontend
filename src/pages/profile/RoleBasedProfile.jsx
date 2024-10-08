import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import DistributorProfile from './DistributorProfile';
import { useAuth } from '../login/AuthContext'; 

const RoleBasedProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:3000/api/auth/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!auth.user || !auth.user.id) {
      setLoading(false);
      setError('User ID is missing');
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [auth, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return user.role === 'distributor' ? (
    <DistributorProfile userId={userId} />
  ) : (
    <Profile user={user} />
  );
};

export default RoleBasedProfile;
