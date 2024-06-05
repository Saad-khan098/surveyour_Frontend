import React, { useRef, useState } from 'react'
import getCookie from '@/utils/getCookie'
import axios from 'axios';
import { Button, Input } from '@mui/material';
import styles from './dashboard.module.css'
import { useRouter } from 'next/navigation';
import NotPaid from './NotPaid';

const authToken = getCookie('authToken');


export default function CreateForm() {

    const [notPaid, setnotPaid] = useState(false);

    function openNotPaid(){
        setnotPaid(true)
    }
    function closeNotPaid(){
        setnotPaid(false)
    }


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
            if(e.response.status == 400){
                alert('Enter Form Name');
            }
            if(e.response.status == 403){
                openNotPaid();
            }
        }
    }
    return (
        <div className={styles.createForm}>
            <NotPaid open={notPaid} handleOpen={openNotPaid} handleClose={closeNotPaid} />
            <Input type="text" placeholder='enter form name' inputRef={formName}/>
            <Button variant='contained'
            onClick={createForm}>Create Form</Button>
        </div>
    )
}
