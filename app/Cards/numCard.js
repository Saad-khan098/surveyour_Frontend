'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';


const NumCard = ({ elementId, questionText }) => {
  const [average, setAverage] = useState(0);


  useEffect(() => {
    const fetchAverage = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/response/elementStats/${elementId}`);
        const totalAnswers = data.reduce((sum, response) => sum + response.value, 0);
        const average = totalAnswers / data.length;
        setAverage(average);
      } catch (error) {
        console.error('Error fetching average:', error);
      }
    };


    fetchAverage();
  }, [elementId]);


  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {questionText}
        </Typography>
        <Typography variant="body1" component="div">
          Average Answer: {average.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};


export default NumCard;







