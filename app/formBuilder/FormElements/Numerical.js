import React from 'react'
import styles from '../form.module.css'
import TextField from '@mui/material/TextField';

export default function Numerical({data}) {
  return (
    <div className={styles.formElement}>
        <p>{data.question}</p>
        <TextField id="standard-basic" label="Your Answer (Number)" variant="standard" disabled/>    
      </div>
  )
}
