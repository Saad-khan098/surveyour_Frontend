"use client"

import React, { useState, useEffect } from 'react'
import BaseLayout from '../Components/BaseLayout';
import styles from './buy.module.css'
import getCookie from '@/utils/getCookie'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Button } from '@mui/material';



export default function Buy() {
  const router = useRouter();

  const authToken = getCookie('authToken');
  const user = jwt.decode(authToken);

  const [plans, setplans] = useState(null);

  if (!user) {
    router.push('/login');
    return;
  }

  const getPlans = async function () {
    try {
      const data = await axios.get('http://localhost:3001/plans/', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setplans(data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPlans();
  }, [])

  async function subscribe(id) {
    try {
      const data = await axios.post('http://localhost:3001/checkout/createSession',
        {
          planId: id
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
      router.push(data.data.redirect)
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <BaseLayout>
      <div className={styles.page}>
        <h1>Plans</h1>
        <div className={styles.line}></div>
      </div>

      <div className={styles.plans}>
        {
          plans&&
          <div className={styles.plan}>
          <h2>Free</h2>
          <img src="/free.png" alt="" />
          <div className={styles.price}>
            <h1>Free</h1>
            <p>forever</p>
          </div>

          <p>You can create upto five forms for free</p>
        </div>
        }
        {
          plans &&
          plans.map(plan => {
            return (
              <div className={styles.plan}>
                <h2>Premium</h2>
                <img src="/crown.png" alt="" />
                <div className={styles.price}>
                  <h1>${plan.priceInCents / 100}</h1>
                  <p>per {plan.interval}</p>
                </div>

                <p>Upgrade To Premium and create as many forms you like</p>
                <Button
                  variant='contained'
                  onClick={() => {
                    subscribe(plan.priceId)
                  }}
                >
                  Subscribe
                </Button>
              </div>
            )
          })
        }
      </div>
    </BaseLayout>
  )
}
