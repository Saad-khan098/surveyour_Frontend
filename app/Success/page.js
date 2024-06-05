"use client"

import React, {useEffect} from 'react'
import styles from './success.module.css'
import { Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCookies } from 'react-cookie';


export default function page() {
    const router = useRouter();
    const params = useSearchParams();
    const token = params.get('token');

    const [, setCookie] = useCookies(['authToken']);

    setCookie('authToken', token, { path: '/', expires: new Date(Date.now() + 3600 * 1000 * 24) }); // Cookie expires in 24 hours


    useEffect(()=>{
        const t = setTimeout(() => {
            router.push('/Dashboard');
        }, 7000);
        return (
            ()=>{
                clearTimeout(t);
            }
        )
    })


  return (
    <div className={styles.page}>
        <div className={styles.img}>
            <img src="/successful.png" alt="" />
        </div>

        <div className={styles.body}>
            <h1>Thank you!</h1>
            <h3>Payment done Successfully</h3>
            <p>You will be redirected to Dashboard shortly or click here to return to Dashboard</p>
            <Button
            variant='contained'
            onClick={()=>{
                router.push('/Dashboard');
            }}
            >
                Dashboard
            </Button>
        </div>
    </div>
  )
}
