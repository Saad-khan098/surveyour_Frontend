import React, { useRef } from 'react'
import getCookie from '@/utils/getCookie'
import axios from 'axios';
import { Button, Input } from '@mui/material';
import styles from './dashboard.module.css'
import { useRouter } from 'next/navigation';

const authToken = getCookie('authToken');


export default function CreateForm() {
    const router = useRouter();
    const formName = useRef();
    async function createForm() {
        console.log('crearing form');
        console.log(formName.current.value);
        try {
            const data = await axios.post('http://localhost:3001/form/create',
                {
                    name: formName.current.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
            console.log(data);
            router.push(`formBuilder?formId=${data.data.form._id}`)
        }
        catch (e) {
            console.log(e);
            if(e.response.status == 409){
                alert('form with this name already exists');
            }
        }
    }
    return (
        <div className={styles.createForm}>
            <Input type="text" placeholder='enter form name' inputRef={formName}/>
            <Button variant='contained'
            onClick={createForm}>Create Form</Button>
        </div>
    )
}
