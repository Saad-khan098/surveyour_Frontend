'use client'

import React from 'react'
import styles from './form.module.css'
import { Formik } from 'formik'

export default function Form({ form, elementTypes, formId }) {
    console.log(form);

    let initialValues = {};
    form.elements.forEach(element => {
        initialValues[element._id] = '';
    });
    console.log(initialValues)
    return (
        <div className={styles.page}>
            <div className={styles.form}>
                <Formik
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        console.log('validating');
                        form.elements.forEach(elem=>{
                            if(elem.required){
                                if(!values[elem._id]){
                                    errors[elem._id] = 'Required'
                                }
                            }
                        })
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('submitting');
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {
                                form.elements.map((elem) => (
                                    <div className={styles.element}>
                                        <p>{elem.question}</p>
                                        <input
                                            key={elem._id}  // Add a unique key for each input
                                            type="text"
                                            name={elem._id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[elem._id]}  // Use the correct field from values
                                        />
                                        <p>{errors[elem._id]}</p>
                                    </div>
                                ))
                            }
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
