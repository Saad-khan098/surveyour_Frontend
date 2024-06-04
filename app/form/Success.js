import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, Button } from '@mui/material';
import styles from './Success.module.css'
import { useRouter } from 'next/navigation';

export default function Success({ open, hanleOpen, handleClose }) {

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
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h3 className={styles.heading}>Successfully Submitted Form</h3>
                    </DialogContentText>

                    <p className={styles.para}>Would You like to Submit another Response?</p>
                    <div className={styles.buttons}>

                        <Button
                            variant='contained'
                            onClick={() => {
                                router.push('/');
                            }}
                        >
                            No
                        </Button>
                        <Button
                            variant='contained'
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Yes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
