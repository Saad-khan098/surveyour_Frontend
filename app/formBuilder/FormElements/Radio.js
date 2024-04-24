import React from 'react'
import styles from '../form.module.css'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioComponent({ data }) {
    return (
        <div className={styles.formElement}>
            <p>{data.question}</p>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >
                    {
                        data.option.map(elem=>{
                            return (
                                <FormControlLabel disabled value={elem} control={<Radio />} label={elem}/>
                            )
                        })
                    }
                </RadioGroup>
            </FormControl>
        </div>
    )
}
