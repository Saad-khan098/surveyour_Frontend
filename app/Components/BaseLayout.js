"use client"

import React from 'react'
import styles from './baselayout.module.css'
import Navbar from './Navbar';

export default function BaseLayout({children}) {
  return (
    <div className={styles.page}>
        <Navbar />
        <main>
            {children}
        </main>
    </div>
  )
}
