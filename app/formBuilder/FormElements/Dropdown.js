import React from 'react';
import styles from '../form.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function RadioComponent({ data }) {
    return (
        <div className={styles.formElement}>
            <p>{data.question}</p>


            <Accordion defaultExpanded style={{width: '100%', maxWidth: '300px'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Select
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.options}>

                    {
                        data.option.map(elem=>{
                            return (
                                <div className={styles.option}>
                                    <p>{elem}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
