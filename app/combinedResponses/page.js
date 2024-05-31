// app/combinedResponses/[formId]/page.js
'use client'
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import NumCard from '../Cards/numCard';
import PieCard from '../Cards/pieCard';


//const authToken = getCookie('authToken');


const CombinedResponses = () => {
  const router = useRouter();
  const { formId } = router.query;
  const [elements, setElements] = useState([]);


  useEffect(() => {
    if (formId) {
      const fetchElements = async () => {
        try {
          const { data } = await axios.get(`http://localhost:3001/form/${formId}/elements`);
          setElements(data.elements);
        } catch (error) {
          console.error('Error fetching elements:', error);
        }
      };


      fetchElements();
    }
  }, [formId]);


  const handleViewAllResponses = () => {
    router.push(`/allResponses/${formId}`);
  };


  // Render nothing or a loading indicator until formId is available
  if (!formId) {
    return <Typography variant="h5" component="div">Loading...</Typography>;
  }


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
      <Button variant="contained" color="primary" onClick={handleViewAllResponses}>
          View All Responses
        </Button>
        <Typography variant="h4" component="h1">
        Response Statistics:
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {elements.map((element) => {
          if (element.elementType === 2) {
            return (
              <Grid item xs={12} md={6} lg={4} key={element._id}>
                <NumCard elementId={element._id} questionText={element.question} />
              </Grid>
            );
          } else if ([4, 5, 6].includes(element.elementType)) {
            return (
              <Grid item xs={12} md={6} lg={4} key={element._id}>
                <PieCard elementId={element._id} questionText={element.question} />
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Container>
  );
};


export default CombinedResponses;



