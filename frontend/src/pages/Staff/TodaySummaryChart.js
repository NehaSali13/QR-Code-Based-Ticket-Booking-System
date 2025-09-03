// src/components/TodaySummaryChart.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const TodaySummaryChart = () => {
  const [summaryData, setSummaryData] = useState({
    adults: 0,
    children: 0,
    bike: 0,
    car: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/visitors/today-summary'); // Update API if different
        setSummaryData(response.data);
      } catch (error) {
        console.error('Error fetching today\'s summary:', error);
      }
    };

    fetchSummary();
  }, []);

  const chartData = [
    { category: 'Adults', count: summaryData.adults },
    { category: 'Children', count: summaryData.children },
    { category: 'Bike', count: summaryData.bike },
    { category: 'Car', count: summaryData.car },
  ];

  return (
    <div className="w-full h-96 p-4 shadow-lg bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Today's Visitor Summary</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TodaySummaryChart;
