import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input,Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotPaid({open, handleOpen, handleClose,}) {

    const router = useRouter();

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Form Limit Reached
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are only allowed to create 5 forms for free. Would you like to Upgrade to Premium?
          </DialogContentText>

            <div style={{display: 'flex', gap: '10px', 'marginTop': '20px'}}>
                <Button variant='contained' onClick={()=>{router.push('/Buy')}}>
                    Yes
                </Button>
                <Button variant='contained' onClick={handleClose}>
                    No
                </Button>
            </div>
            
        </DialogContent>
      </Dialog>
    </>
  )
}
