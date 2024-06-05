import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

export default function ButtonAppBar() {
    const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={()=>{router.push('/Dashboard')}}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={()=>{router.push('/login')}} sx={{marginRight: '20px'}}>Login</Button>
          <Button variant='contained' color="primary" onClick={()=>{router.push('/signup')}}>Signup</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}