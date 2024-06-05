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

export default function UnSaveedChanges({open, handleclose, handleOpen, page, setpage,  saveChanges, getForm,takeToPage }) {
    
    

  return (
    <>
      <Dialog
        open={open}
        onClose={handleclose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Un saved changes
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have unsaved changes on this page. Would you like to save these changes before exiting this page
          </DialogContentText>

            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px'}}>
                <Button
                variant='contained'
                onClick={async ()=>{
                    await saveChanges(page);
                    await getForm(takeToPage);
                    setpage(takeToPage);
                    handleclose();
                }}
                >
                    Save Changes
                </Button>
                <Button
                variant='contained'

                onClick={async ()=>{
                    await getForm(takeToPage);
                    setpage(takeToPage);
                    handleclose()
                }}
                >
                    Proceed anyway
                </Button>
            </div>
            
        </DialogContent>
      </Dialog>
    </>
  )
}
