import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function CircleProgress ({ value, size = 40 }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={value} size={size}/>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary" fontSize={18}>
          {`${value}%`}
        </Typography>
      </Box>
    </Box>
  );
};
