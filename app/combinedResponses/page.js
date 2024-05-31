'use client';
import React from 'react';
import {Button, Container, Typography } from '@mui/material';
import NumCard from '../Cards/numCard';
import PieCard from '../Cards/pieCard';

const CombinedResponses = () => {
  const numQuestion = 'How satisfied are you with our service?';
  const numAverage = 4.2;

  const pieQuestion = 'Which features do you use the most?';
  const pieData = {
    labels: ['Feature A', 'Feature B', 'Feature C'],
    values: [10, 20, 30],
  };

  return (
    <Container>
      <Button variant="contained" color="primary">
          View All Responses
        </Button>
        <Typography variant="h4" component="h1">
        Response Statistics:
        </Typography>
      <NumCard question={numQuestion} average={numAverage} />
      <PieCard question={pieQuestion} data={pieData} />
    </Container>
  );
};

export default CombinedResponses;
