import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input,Button } from '@mui/material';
import styles from './FormEdit.module.css'

export default function FormEdit({open, handleFormEditOpen, handleFormEditClose, form, setform, setchanges}) {

    const [formName, setformName] = useState(form.form.name);

    const [confirmDelete, setconfirmDelete] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleFormEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Edit Form</h3>
          </DialogContentText>

            <div className={styles.changeName}>
                <Input
                value={formName} 
                onChange={(e)=>{setformName(e.target.value)}}
                />
                <Button variant='contained' size='small'
                onClick={()=>{
                    setform({...form, form: {...form.form, name: formName, isChanged: true}})
                    setchanges(true);
                }}
                >
                    Change Name
                </Button>
            </div>

            <div className={styles.delete}>
                <Button variant='contained' color='error' onClick={()=>{setconfirmDelete(true)}}>
                  Delete Form
                </Button>
            </div>
            
            {
              confirmDelete
              &&
              <div className={styles.confirmDelete}>  
                <p>All your data including form elements and user responses will be lost. Are you sure you want to delete this form?</p>
                <Button variant='contained' size="small">No</Button>
                <Button variant='contained' size="small">Yes</Button>
              </div>
            }
        </DialogContent>
      </Dialog>
    </>
  )
}
