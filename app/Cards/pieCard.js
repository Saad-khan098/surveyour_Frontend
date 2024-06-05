'use client';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCard = ({data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.valuePercents,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#7D0DC3'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#570987'],
      },
    ],
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, borderRadius: 2 }}>
      <CardContent>
        <div style={{ width: '25%', margin: 'auto' }}>
          <Pie data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieCard;
