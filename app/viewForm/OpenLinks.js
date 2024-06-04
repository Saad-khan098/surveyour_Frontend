
import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input,Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function FormEdit({open, handleOpen, handleClose, formId}) {

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
            Share Links
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
            
            <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}
            >
                <p>Send this link to people who you want to fill the form</p>
                <a onClick={()=>{console.log('fjksdnfjk');router.push(`/form?formId=${formId}`)}} style={{color: 'blue'}}>{window.location.host}/form?formId={formId}</a>
            </div>

            
        </DialogContent>
      </Dialog>
    </>
  )
}
