import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function pieCard() {
  return (
    <Card
    variant="outlined"
      sx={{
        width: 600,
        height: 'auto',
        minHeight: 600,
        "--Card-radius": "20px",
        "--Card-padding": "16px"
      }}
    >
      <CardContent>
        <Typography level="title-lg" style={{ fontSize: '26px', paddingTop: '18px'}}>
            Q1: What is your name:
        </Typography>
        <Typography level="body-lg">
          A1: Musab Iqbal 
        </Typography>
 
        <Typography level="title-lg" style={{ fontSize: '26px', paddingTop: '18px' }}>
            Q2: What is your Email Address:
        </Typography>
        <Typography level="body-lg">
          A2: Sample@mail.com
        </Typography>

        <Typography level="title-lg" style={{ fontSize: '26px' , paddingTop: '18px'}}>
            Q3: What is your income range (please provide it in pakistani rupees)?
        </Typography>
        <Typography level="body-lg">
          A3: C. 60,000-80,000
        </Typography>

        <Typography level="title-lg" style={{ fontSize: '26px' , paddingTop: '18px'}}>
            Q4: What is your job title?
        </Typography>
        <Typography level="body-lg">
          A4: Project Manager
        </Typography>

        <Typography level="title-lg" style={{ fontSize: '26px' , paddingTop: '18px'}}>
            Q5: Which city do you live in?
        </Typography>
        <Typography level="body-lg">
          A5: Karachi
        </Typography>

        <Typography level="title-lg" style={{ fontSize: '26px' , paddingTop: '18px'}}>
            Q6: Do you have any experience working remotely?
        </Typography>
        <Typography level="body-lg">
          A6: B. No
        </Typography>

      </CardContent>
    </Card>
  );
}