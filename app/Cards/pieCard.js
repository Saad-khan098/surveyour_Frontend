'use client';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCard = ({ question, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {question}
        </Typography>
        <div style={{ width: '25%', margin: 'auto' }}>
          <Pie data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieCard;
