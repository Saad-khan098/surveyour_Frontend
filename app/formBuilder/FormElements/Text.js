import React from 'react'
import styles from '../form.module.css'
import TextField from '@mui/material/TextField';

export default function Text({data}) {
  return (
    <div className={styles.formElement}>
        <p>{data.question}</p>
        <TextField id="standard-basic" label="Your Answer (Text)" variant="standard" disabled/>    
      </div>
  )
}
