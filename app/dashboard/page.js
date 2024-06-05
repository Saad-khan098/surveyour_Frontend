'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import getCookie from '@/utils/getCookie'
import CreateForm from './CreateForm';
import { useRouter } from 'next/navigation';
import FormCard from '../Cards/formCard';
import BaseLayout from '../Components/BaseLayout';
import styles from './dashboard.module.css'
import jwt from 'jsonwebtoken';
import FormTable from './FormTable';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';

export default function page() {
  const router = useRouter();

  const authToken = getCookie('authToken');
  console.log(authToken);
  const user = jwt.decode(authToken);
  console.log(user);

  if (!user) {
    router.push('/login');
    return;
  }



  const [forms, setforms] = useState(null);

  const [page, setpage] = useState(1);

  const getForms = async function (page) {
    console.log('getting forms');
    console.log(page);
    try {
      const data = await axios.get(`http://localhost:3001/form/all?page=${page}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setforms(data.data);
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getForms(page);
  }, [])

  console.log({ forms });
  return (
    <BaseLayout>
      <div className={styles.page}>

        <div className={styles.welcome}>
          <h1>Welcome </h1>
          {
            user.name &&
            <>
              <IconButton sx={{ p: 0 }}>
                <Avatar>{user.name[0].toUpperCase()}</Avatar>
              </IconButton>
              <h1>{user.name}</h1>
            </>
          }
        </div>



        <section>
          <div className={styles.header}>
            <h2>Your Forms</h2>
            <div className={styles.line}></div>
          </div>

          <div className={styles.body}>
            {
              forms &&
              <>
                <FormTable forms={forms.forms} />
                <Pagination
                sx={{marginTop: '20px'}}
                  count={Math.ceil(forms.pagination.total / forms.pagination.perPage)}
                  page={page}
                  onChange={async (e, newPage) => {
                    await getForms(newPage);
                    setpage(newPage);
                  }}
                />
              </>

            }
          </div>
        </section>

        <section>
          <div className={styles.header}>
            <h2>Create Form</h2>
            <div className={styles.line}></div>
          </div>
          <div className={styles.body}>
            <CreateForm />
          </div>
        </section>

      </div>

    </BaseLayout>
  )
}
