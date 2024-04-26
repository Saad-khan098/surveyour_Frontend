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

export default function formCard() {
  return (
    <Card
    variant="outlined"
      sx={{
        width: 340,
        height: 150 ,
        "--Card-radius": "20px",
        "--Card-padding": "16px"
        // to make the card resizable
        // overflow: 'auto',
        // resize: 'horizontal',
      }}
    >
      <CardContent>
        <Typography level="title-lg" style={{ fontSize: '26px' }}>Sample Form Name</Typography>
        <Typography level="body-sm">
          Created At: 11/03/24 <br />
          Responses: 37
        </Typography>
      </CardContent>
      <CardActions buttonFlex="flex">
        <Button variant="outlined" color="neutral">
          Edit Form
        </Button>
        <Button style={{ display: 'inline-block' }} variant="solid" color="primary">
          View Responses
        </Button>
      </CardActions>
    </Card>
  );
}