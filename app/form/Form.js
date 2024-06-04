'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './form.module.css'
import { Formik, Field, Form } from 'formik'
import { MenuItem, FormControl, InputLabel, Select, Input, Radio, RadioGroup, FormControlLabel, FormLabel, Button, Checkbox } from '@mui/material';
import getCookie from '@/utils/getCookie'
import Success from './Success';

export default function MyForm({ formData, elementTypes, formId }) {

    const authToken = getCookie('authToken');

    const [page, setpage] = useState(1);

    const [displaySuccess, setdisplaySuccess] = useState(false);

    function handleSuccessClose(){
        setdisplaySuccess(false)
    }

    async function nextPage(values) {
        savePage(page, values);
        getForm(page + 1);
        setpage(prev => prev + 1);
    }
    function prevPage(values) {
        savePage(page, values);
        getForm(page - 1);
        setpage(prev => prev - 1);
    }

    async function submitForm(values) {

        let answers = [];
        let submissions = JSON.parse(localStorage.getItem(`${formId}`)) || [];
        submissions.forEach(elem => {
            if (elem.page != page) {

                Object.keys(elem.values).forEach(key => {
                    let obj = {
                        element: key,
                        answer: elem.values[key]
                    };
                    answers.push(obj);
                })
            }
        })
        Object.keys(values).forEach(key => {
            let obj = {
                element: key,
                answer: values[key]
            };
            answers.push(obj);
        })
        console.log(answers);

        try {

            const data = await axios.post(`http://localhost:3001/response/create/${formId}`,
                {
                    answers: answers
                },

                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            )

            localStorage.removeItem(`${formId}`);
            setdisplaySuccess(true);
        }
        catch (e) {
            console.log(e);
            alert('some error occurred');
        }
    }

    function savePage(page, values) {
        const submission = {
            values: values,
            page: page
        };

        // Retrieve existing submissions from local storage or initialize as an empty array
        let existingSubmissions = JSON.parse(localStorage.getItem(`${formId}`)) || [];

        // Check if a submission with the same page number already exists
        const existingIndex = existingSubmissions.findIndex(sub => sub.page === page);

        if (existingIndex !== -1) {
            // If a submission with the same page exists, replace it
            existingSubmissions[existingIndex] = submission;
        } else {
            // If not, append the new submission to the array
            existingSubmissions.push(submission);
        }

        // Store the updated array back in local storage
        localStorage.setItem(`${formId}`, JSON.stringify(existingSubmissions));
    }

    async function getForm(page) {
        setform(null);
        try {
            const data = await axios.get(`http://localhost:3001/form/${formId}?page=${page}`)
            setform(data.data);
        }
        catch (e) {
            alert('some error occurred');
        }
    }

    const [form, setform] = useState(null);


    useEffect(() => {
        setform(formData);
    }, []);


    if (!form) return;

    console.log(form);


    let initialValues = {};

    const existingSubmissions = JSON.parse(localStorage.getItem(`${formId}`)) || [];
    const currentPageSubmission = existingSubmissions.find(sub => sub.page === page);

    if (currentPageSubmission) {
        form.elements.forEach(element => {
            initialValues[element._id] = currentPageSubmission.values[element._id] || '';
        });
    } else {
        form.elements.forEach(element => {
            initialValues[element._id] = '';
        });
    }

    return (
        <>
            <div className={styles.page}>

                {
                    <Success open={displaySuccess} handleClose={handleSuccessClose}/>
                }

                <div className={styles.form}>
                    <div className={styles.element}>

                    </div>
                    <Formik
                        initialValues={initialValues}
                        validate={values => {
                            const errors = {};
                            form.elements.forEach(elem => {
                                if (elem.required) {
                                    if (!values[elem._id]) {
                                        errors[elem._id] = 'Required'
                                    }
                                }
                            })
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log('submitting');
                            submitForm(values);
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
                            validateForm,
                            setFieldValue
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <h2>{form.form.name}</h2>

                                <div className={styles.elements}>
                                    {
                                        form &&
                                        form.elements.map((elem, index) => {
                                            if (elem.elementType == 0) {
                                                return (
                                                    <div className={styles.element} key={elem._id}>
                                                        <div className={styles.top}>
                                                            <p>{elem.question}</p>
                                                            <div className={styles.error}>
                                                                {
                                                                    elem.required &&
                                                                    <p>*</p>
                                                                }
                                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                                            </div>
                                                        </div>
                                                        <Input
                                                            type="text"
                                                            name={elem._id}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values[elem._id]}
                                                            placeholder='Enter Text'
                                                        />
                                                    </div>
                                                )
                                            }

                                            if (elem.elementType == 1) {
                                                return (
                                                    <div className={styles.element} key={elem._id}>

                                                        <div className={styles.top}>
                                                            <p>{elem.question}</p>
                                                            <div className={styles.error}>
                                                                {
                                                                    elem.required &&
                                                                    <p>*</p>
                                                                }
                                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                                            </div>
                                                        </div>

                                                        <Input
                                                            type="number"
                                                            name={elem._id}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values[elem._id]}
                                                            placeholder='Enter Number'
                                                        />
                                                    </div>
                                                )
                                            }
                                            if (elem.elementType == 2) {
                                                return (
                                                    <div className={styles.element} key={elem._id}>
                                                        <div className={styles.top}>
                                                            <p>{elem.question}</p>
                                                            <div className={styles.error}>
                                                                {
                                                                    elem.required &&
                                                                    <p>*</p>
                                                                }
                                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                                            </div>
                                                        </div>
                                                        <Input
                                                            type="date"
                                                            name={elem._id}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values[elem._id]}
                                                        />
                                                    </div>
                                                )
                                            }
                                            if (elem.elementType == 3) {
                                                return (
                                                    <div className={styles.element} key={elem._id}>
                                                        <div className={styles.top}>
                                                            <p>{elem.question}</p>
                                                            <div className={styles.error}>
                                                                {
                                                                    elem.required &&
                                                                    <p>*</p>
                                                                }
                                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                                            </div>
                                                        </div>
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend">{elem.question}</FormLabel>
                                                            <RadioGroup
                                                                aria-label={elem.question}
                                                                name={elem._id}
                                                                value={values[elem._id]}
                                                                onChange={handleChange}
                                                            >
                                                                {elem.option.map((option, i) => (
                                                                    <FormControlLabel
                                                                        key={option}
                                                                        value={option}
                                                                        control={<Radio />}
                                                                        label={option}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                );
                                            }
                                            if (elem.elementType === 4) {
                                                return (
                                                    <div className={styles.element} key={elem._id}>
                                                        <div className={styles.top}>
                                                            <p>{elem.question}</p>
                                                            <div className={styles.error}>
                                                                {
                                                                    elem.required &&
                                                                    <p>*</p>
                                                                }
                                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                                            </div>
                                                        </div>
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend">{elem.question}</FormLabel>
                                                            {elem.option.map((option, i) => (
                                                                <FormControlLabel
                                                                    key={option}
                                                                    control={
                                                                        <Checkbox
                                                                            name={elem._id}
                                                                            value={option}
                                                                            checked={values[elem._id].includes(option)}
                                                                            onChange={(event) => {
                                                                                const set = new Set(values[elem._id]);
                                                                                if (event.target.checked) {
                                                                                    set.add(option);
                                                                                } else {
                                                                                    set.delete(option);
                                                                                }
                                                                                setFieldValue(elem._id, Array.from(set));
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                        />
                                                                    }
                                                                    label={option}
                                                                />
                                                            ))}
                                                        </FormControl>
                                                    </div>
                                                );
                                            }

                                            if (elem.elementType === 5) {
                                                return (
                                                    <div className={styles.element} key={elem._id}>

                                                        <div className={styles.top}>
                                                            <p>{elem.question}</p>
                                                            <div className={styles.error}>
                                                                {
                                                                    elem.required &&
                                                                    <p>*</p>
                                                                }
                                                                {errors && errors[elem._id] && touched[elem._id] && <p>{errors[elem._id]}</p>}
                                                            </div>
                                                        </div>

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
                                                           
                                                        </FormControl>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <div className={styles.buttons}>
                                    {
                                        page != 1
                                        &&
                                        <Button
                                            type="submit"
                                            onClick={() => validateForm().then(errors => {
                                                if (Object.keys(errors).length === 0) {
                                                    prevPage(values);
                                                } else {
                                                }
                                            })} variant='contained'>
                                            Previous
                                        </Button>
                                    }
                                    {
                                        page < form.form.pages
                                        &&
                                        <Button
                                            type="submit"
                                            onClick={() => validateForm().then(errors => {
                                                if (Object.keys(errors).length === 0) {
                                                    nextPage(values);
                                                } else {
                                                }
                                            })} variant='contained'>
                                            Next
                                        </Button>
                                    }
                                    {
                                        page == form.form.pages
                                        &&
                                        <Button type="submit" disabled={isSubmitting} variant='contained'
                                        >
                                            Submit
                                        </Button>
                                    }
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
