import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Stats.less';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Stats = ({ userId }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatuses, setOrderStatuses] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          setError('No token found, authorization denied.');
          return;
        }

        console.log(`Fetching stats for distributor with ID: ${userId}`);
        const response = await axios.get(`http://localhost:3003/api/stats/distributor/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log('Stats data fetched:', response.data);
        setStats(response.data);

        const statusesResponse = await axios.get(`http://localhost:3003/api/stats/distributor/${userId}/statuses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Order statuses fetched:', statusesResponse.data);
        setOrderStatuses(statusesResponse.data);

      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(`Error fetching stats: ${error.response ? error.response.data.message : error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const data = {
    labels: ['Total Orders', 'Total Products', 'Total Sales'],
    datasets: [
      {
        label: 'Distributor Stats',
        data: [stats.totalOrders, stats.totalProducts, stats.totalSales || 0], 
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      },
    ],
  };

  const statusData = {
    labels: Object.keys(orderStatuses),
    datasets: [
      {
        label: 'Order Statuses',
        data: Object.values(orderStatuses),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="stats-container">
      <h2>Statistics</h2>
      <div className="chart-container">
        <Bar data={data} key={JSON.stringify(stats)} />
      </div>
      <h3>Order Statuses</h3>
      <div className="chart-container">
        <Doughnut data={statusData} />
      </div>
    </div>
  );
};

export default Stats;
