'use client';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const NumCard = ({ question, average }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {question}
        </Typography>
        <Typography variant="body1" component="div">
          Average Answer: {average}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NumCard;
