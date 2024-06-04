"use client"

import React, { useEffect, useState } from 'react'
import BaseLayout from '../Components/BaseLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import getCookie from '@/utils/getCookie'
import axios from 'axios'
import styles from './viewForm.module.css'
import { Button } from '@mui/material'
import ResponseTable from './ResponseTable'
import Pagination from '@mui/material/Pagination';
import OpenLinks from './OpenLinks'



export default function page() {

    const authToken = getCookie('authToken');


    const router = useRouter();
    const params = useSearchParams()
    const formId = params.get('formId');

    if (!formId) return;
    console.log(formId);

    const [form, setform] = useState(null);
    const [responses, setresponses] = useState(null);

    console.log({responses});

    const [responsesPage, setresponsesPage] = useState(1);

    function handlePageChange(e,newPage){
        getResponses(parseInt(newPage));
        setresponsesPage(parseInt(newPage));
    }
    const getForm = async () => {
        try {
            const data = await axios.get(`http://localhost:3001/form/meta/${formId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
            console.log(data);
            setform(data.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    const getResponses = async (page) => {
        try {
            const data = await axios.get(`http://localhost:3001/response/all/${formId}?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
            console.log(data);
            setresponses(data.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getForm();
        getResponses(responsesPage);
    }, [])


    async function publishForm(type) {
        const data = await axios.put(`http://localhost:3001/form/publish/${formId}?type=${type}`,
            {
                form: form,
                page: page
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        console.log('publishing');
        console.log(form);
        setform({ ...form,public: type == -1 ? false : true })
    }

    const [openLinks, setopenLinks] = useState(false);

    function activateOpenLinks(){
        setopenLinks(true);
    }
    function closeOpenLinks(){
        setopenLinks(false);
    }


    if (!form) return;
    return (
        <BaseLayout>

            <OpenLinks  handleOpen={activateOpenLinks} handleClose={closeOpenLinks} open={openLinks} formId={formId} />

            <div className={styles.page}>
                <div className={styles.top}>
                    <h1>{form.name}</h1>
                    <div className={styles.buttons}>
                        <Button variant='contained'
                            onClick={() => {
                                router.push(`/formBuilder?formId=${formId}`)
                            }}
                        >
                            Edit
                        </Button>

                        <Button
                            variant='contained'
                            onClick={() => {
                                router.push(`/stats?formId=${formId}`)
                            }}
                        >
                            Statistics
                        </Button>
                        {
                            form.public ?
                                <Button variant={'contained'} onClick={() => { publishForm(-1) }}>Unpublish Form</Button>
                                :
                                <Button variant={'contained'} onClick={() => { publishForm(1) }}>Publish Form</Button>
                        }
                        {
                            form.public
                            &&
                            <Button
                            variant='contained'
                            onClick={()=>{activateOpenLinks()}}
                            >
                                Share Link  
                            </Button>
                        }
                    </div>
                </div>

                <section className={styles.responses}>
                    <div className={styles.header}>
                        <h2>Responses</h2>
                        <div className={styles.line}></div>
                    </div>
                    <div className={styles.body}>
                        {
                            responses
                            &&
                            <>
                                <ResponseTable responses={responses.responses} pagination={responses.pagination} />
                                <Pagination
                                count = {Math.ceil(responses.pagination.total / responses.pagination.perPage)}
                                page={responsesPage}
                                onChange={handlePageChange}  
                                />
                            </>
                        }
                    </div>
                </section>

            </div>


        </BaseLayout>
    )
}
