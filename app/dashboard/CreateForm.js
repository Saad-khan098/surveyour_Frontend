import React, { useRef } from 'react'
import getCookie from '@/utils/getCookie'
import axios from 'axios';

const authToken = getCookie('authToken');


export default function CreateForm() {
    const formName = useRef();
    async function createForm() {
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
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <input type="text" placeholder='enter form name' ref={formName}/>
            <button onClick={createForm}>create form</button>
        </div>
    )
}
