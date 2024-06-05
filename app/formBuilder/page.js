import React from 'react'
import Form from './Form';
import { redirect } from "next/navigation"
import getCookie from '@/utils/getCookie';
import { cookies } from 'next/headers'
import BaseLayout from '../Components/BaseLayout';



export default async function FormBuilder({ searchParams }) {


  const cookieStore = cookies()
  const authToken = cookieStore.get('authToken');


  const { formId } = searchParams

  const requestOptions = {
    method: 'GET', // Or any other HTTP method you're using
    headers: {
      'Authorization': `Bearer ${authToken?.value}`,
      'Cache-Control': 'no-store'
    }
  };

 
  var elementTypes = await fetch('http://localhost:3001/element/elementTypes').then(data => data.json());

  return (
    <BaseLayout>
      <Form elementTypes={elementTypes} formId={formId}></Form>
    </BaseLayout>
  )
}
