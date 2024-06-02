import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';


export default function SuccessAlert({open, handleClose, msg}) {
    
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
  )
}
