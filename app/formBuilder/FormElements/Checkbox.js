import React from 'react'
import styles from '../form.module.css'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormGroup } from '@mui/material';
import {Checkbox} from '@mui/material';

export default function RadioComponent({ data }) {
    return (
        <div className={styles.formElement}>
            <p>{data.question}</p>
           
            <FormGroup>
                {
                    data.option.map(elem => {
                        return (
                            <FormControlLabel disabled control={<Checkbox/>} label={elem} value={elem} />
                        )
                    })
                }
            </FormGroup>
        </div>
    )
}
