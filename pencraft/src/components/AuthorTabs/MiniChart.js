import React from 'react';
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const MiniChart = ({ data }) => {
  // You may need to transform your data to fit into a recharts-compatible format
  const chartData = Object.keys(data).map(key => ({
    name: key,
    value: data[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MiniChart;
