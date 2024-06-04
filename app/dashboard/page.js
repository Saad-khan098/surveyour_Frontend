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






export default function page() {
  const router = useRouter();

  const authToken = getCookie('authToken');
  const user = jwt.decode(authToken);

  if (!user) {
    router.push('/login');
    return;
  }



  const [forms, setforms] = useState(null);

  const getForms = async function () {
    try {
      const recipes = await axios.get('http://localhost:3001/form/all', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setforms(recipes.data);
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getForms();
  }, [])

  console.log({ forms });
  return (
    <BaseLayout>
      <div className={styles.page}>

        <div className={styles.welcome}>
          <h1>Welcome </h1>
          <IconButton sx={{ p: 0 }}>
            <Avatar>{user.name[0].toUpperCase()}</Avatar>
          </IconButton>
          <h1>{user.name}</h1>
        </div>



        <section>
          <div className={styles.header}>
            <h2>Your Forms</h2>
            <div className={styles.line}></div>
          </div>

          <div className={styles.body}>
            {
              forms &&
              <FormTable forms={forms.forms} />
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
