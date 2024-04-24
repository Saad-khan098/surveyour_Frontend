import React from 'react'
import styles from '../form.module.css'
import TextField from '@mui/material/TextField';

export default function Date({data}) {
  return (
    <div className={styles.formElement}>
        <p>{data.question}</p>
        <TextField id="standard-basic" label="Your Answer (Date)" variant="standard" disabled/>    
      </div>
  )
}
