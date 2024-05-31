'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';


ChartJS.register(ArcElement, Tooltip, Legend);


const PieCard = ({ elementId, questionText }) => {
  const [chartData, setChartData] = useState({ labels: [], values: [] });


  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/response/elementStats/${elementId}`);
        const labels = data.map(item => item._id);
        const values = data.map(item => item.count);
        setChartData({ labels, values });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };


    fetchChartData();
  }, [elementId]);


  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {questionText}
        </Typography>
        <div style={{ width: '100%', height: '200px' }}>
          <Pie data={{
            labels: chartData.labels,
            datasets: [
              {
                data: chartData.values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              },
            ],
          }} />
        </div>
      </CardContent>
    </Card>
  );
};


export default PieCard;



