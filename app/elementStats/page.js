"use client"

import React from 'react'
import styles from './elementStats.module.css'
import BaseLayout from '../Components/BaseLayout'
import { useRouter, useSearchParams } from 'next/navigation';


export default function ElementStats() {
    const router = useRouter();
    const params = useSearchParams();
    const elementId = params.get('elementId');

    

  return (
    <BaseLayout>
        <div className={styles.page}>
        </div>
    </BaseLayout>
  )
}
