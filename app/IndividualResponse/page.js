'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import getCookie from '@/utils/getCookie'
import { useRouter } from 'next/navigation';
import ResponseCard from '../Cards/responseCard';
import TableCard from '../Cards/tableCard';
import Button from '@mui/joy/Button';



const authToken = getCookie('authToken');


export default function page() {
  const [forms, setforms] = useState(null);
  
  const router = useRouter();

  const getForms = async function () {
    console.log(authToken);
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

  console.log(forms);
  return (
    <div>
      <Button size="lg" color="success">
      Go Back
      </Button>
      <div>
        {
          forms?.forms?.map(elem => {
            return (
              <div key={elem._id} onClick={()=>{router.push(`/formBuilder?formId=${elem._id}`)}}>
                <p>{elem.name}</p>
              </div>
            )
          })
        }
      </div>
      <h1> (Sample Form Name for which this is a response)</h1>
      <h3> Response Number: 28</h3>
      <div style={{ paddingLeft: '20px' }}>
      < ResponseCard />
      </div>
    </div>
  )
}