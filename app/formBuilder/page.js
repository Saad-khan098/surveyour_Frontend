import React from 'react'
import Form from './Form';
import { redirect } from "next/navigation"
import getCookie from '@/utils/getCookie';
import { cookies } from 'next/headers'



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

  const formDataResponse = await fetch(`http://localhost:3001/form/${formId}`, requestOptions);
  if (formDataResponse.status === 401) {
    redirect('/login');
  }
  const formData = await formDataResponse.json();
  var elementTypes = await fetch('http://localhost:3001/element/elementTypes').then(data => data.json());

  return (
    <Form formData={formData} elementTypes={elementTypes} formId={formId}></Form>
  )
}
