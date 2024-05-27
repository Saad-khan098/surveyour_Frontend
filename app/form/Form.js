'use client'

import React from 'react'
import styles from './form.module.css'
import { Formik, Field, Form } from 'formik'
import { MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';

export default function MyForm({ form, elementTypes, formId }) {
    let initialValues = {};
    form.elements.forEach(element => {
        initialValues[element._id] = '';
    });
    return (
        <div className={styles.page}>
            <div className={styles.form}>
                <div className={styles.element}>

                </div>
                <Formik
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        form.elements.forEach(elem => {
                            if (elem.required) {
                                console.log(values[elem.id])
                                if (!values[elem.id]) {
                                    errors[elem.id] = 'Required'
                                }
                            }
                        })
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
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
                                form.elements.map((elem, index) => {
                                    if (elem.elementType == 0) {
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <p>{elem.question}</p>
                                                <input
                                                    type="text"
                                                    name={elem._id}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values[elem._id]}
                                                />
                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                            </div>
                                        )
                                    }

                                    if (elem.elementType == 1) {
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <p>{elem.question}</p>
                                                <input
                                                    type="number"
                                                    name={elem._id}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values[elem._id]}
                                                />
                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                            </div>
                                        )
                                    }
                                    if (elem.elementType == 2) {
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <p>{elem.question}</p>
                                                <input
                                                    type="date"
                                                    name={elem._id}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values[elem._id]}
                                                />
                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                            </div>
                                        )
                                    }
                                    if (elem.elementType == 3) {
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <p>{elem.question}</p>
                                                {
                                                    elem.option.map((option, i) => {
                                                        return (
                                                            <div>
                                                                <label htmlFor={option}>{option}</label>
                                                                <input
                                                                    id={option}
                                                                    type="radio"
                                                                    name={elem._id}
                                                                    value={option}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                            </div>
                                        );
                                    }
                                    if (elem.elementType === 4) {
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <p>{elem.question}</p>
                                                {
                                                    elem.option.map((option, i) => {
                                                        return (

                                                            <div>
                                                                <label htmlFor={option}>{option}</label>
                                                                <input
                                                                    id={option}
                                                                    type="checkbox"
                                                                    name={elem._id}
                                                                    value={option}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                            </div>
                                        );
                                    }

                                    if (elem.elementType === 5) {
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <p>{elem.question}</p>

                                                <FormControl className={styles.dropdown}>
                                                    <InputLabel>{'Select'}</InputLabel>
                                                    <Select
                                                        name={elem._id}
                                                        value={values[elem._id]}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {elem.option.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {errors[elem._id] && touched[elem._id] && (
                                                        <p>{errors[elem._id]}</p>
                                                    )}
                                                </FormControl>
                                            </div>
                                        )
                                    }


                                })
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
