import React from 'react'
import { redirect } from "next/navigation"
import getCookie from '@/utils/getCookie';
import { cookies } from 'next/headers'
import Form from './Form';



export default async function FormBuilder({ searchParams }) {


  const cookieStore = cookies()
  const authToken = cookieStore.get('authToken');


  const { formId } = searchParams

  const formDataResponse = await fetch(`http://localhost:3001/form/${formId}`);
  if (formDataResponse.status === 401) {
    redirect('/login');
  }
  const formData = await formDataResponse.json();
  var elementTypes = await fetch('http://localhost:3001/element/elementTypes').then(data => data.json());

  return (
    <Form formData={formData} elementTypes={elementTypes} formId={formId}></Form>
  )
}
