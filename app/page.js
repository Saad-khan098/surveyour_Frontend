"use client"

import React from 'react'
import Header from './LandingPageComponents/Header'
import GetStarted from './LandingPageComponents/GetStarted'
import Footer from './LandingPageComponents/Footer'
import Navbar from './LandingPageComponents/Navbar'

export default function LandingPage() {
  return (
    <div style={{backgroundColor: 'white', paddingTop: '60px'}}>
      <Navbar />
      <Header />
      <GetStarted />
      <Footer />
    </div>
  )
}
