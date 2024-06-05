import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input,Button } from '@mui/material';
import styles from './FormEdit.module.css'
import getCookie from '@/utils/getCookie'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function confirmDeletePage({open, handleClose, handleOpen, deleteForm, deletePage}) {

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure You want to delete this page. Doing so will result in deletion of your page elements along with any responses and stats.
          </DialogContentText>

            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px'}}>
                <Button
                variant='contained'
                onClick={deletePage}
                >
                    Yes
                </Button>
                <Button
                variant='contained'
                onClick={handleClose}
                >
                    No
                </Button>
            </div>
            
        </DialogContent>
      </Dialog>
    </>
  )
}
