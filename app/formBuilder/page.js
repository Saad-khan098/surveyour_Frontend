import React from 'react'
import Form from './Form';

export default async function FormBuilder({searchParams}) {
  const {formId} = searchParams

    try{

        var formData = await fetch(`http://localhost:3001/form/${formId}`, {cache: 'no-store'}).then(data=>data.json());
        var elementTypes = await fetch('http://localhost:3001/element/elementTypes').then(data=>data.json());
    }
    catch(e){
        console.log(e);
    }

  return (
    <Form formData={formData} elementTypes={elementTypes}></Form>
  )
}
