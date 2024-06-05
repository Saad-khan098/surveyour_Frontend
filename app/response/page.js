"use client"

import React, { useState, useEffect } from 'react'
import BaseLayout from '../Components/BaseLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import getCookie from '@/utils/getCookie'
import styles from './response.module.css'

import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Input,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Button,
    Checkbox
} from '@mui/material';

export default function Response() {
    const authToken = getCookie('authToken');
    const params = useSearchParams();
    const responseId = params.get('responseId');

    const [page, setPage] = useState(1);
    const [response, setResponse] = useState(null);
    console.log(response);

    const getResponse = async (page) => {
        console.log('getting resposne');
        console.log(page);
        try {
            const data = await axios.get(`http://localhost:3001/response/${responseId}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(data);
            setResponse(data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const nextPage = async () => {
        await getResponse(page + 1);
        setPage(prev => prev + 1);
    }

    const prevPage = async () => {
        await getResponse(page - 1);
        setPage(prev => prev - 1);
    }

    useEffect(() => {
        getResponse(page);
    }, [])

    return (
        <BaseLayout>
            <div className={styles.page}>
                <form>
                    <div className={styles.elements}>
                        {
                            response &&
                            response.responses.map(elem => {
                                switch (elem.elementType) {
                                    case 0:
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <div className={styles.top}>
                                                    <p>{elem.question}</p>
                                                </div>
                                                <Input
                                                    type="text"
                                                    name={elem._id}
                                                    value={elem.answer}
                                                />
                                            </div>
                                        );
                                    case 1:
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <div className={styles.top}>
                                                    <p>{elem.question}</p>
                                                </div>
                                                <Input
                                                    type="number"
                                                    name={elem._id}
                                                    value={elem.answer}
                                                />
                                            </div>
                                        );
                                    case 2:
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <div className={styles.top}>
                                                    <p>{elem.question}</p>
                                                </div>
                                                <Input
                                                    type="date"
                                                    name={elem._id}
                                                    value={elem.answer}
                                                />
                                            </div>
                                        );
                                    case 3:
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <div className={styles.top}>
                                                    <p>{elem.question}</p>
                                                </div>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">{elem.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-label={elem.question}
                                                        name={elem._id}
                                                        value={elem._id}
                                                    >
                                                        {elem.option.map((option, i) => (
                                                            <FormControlLabel
                                                                key={option}
                                                                value={option}
                                                                control={<Radio />}
                                                                checked={option == elem.answer}
                                                                label={option}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        );
                                    case 4:
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <div className={styles.top}>
                                                    <p>{elem.question}</p>
                                                </div>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">{elem.question}</FormLabel>
                                                    {elem.option.map((option, i) => (
                                                        <FormControlLabel
                                                            key={option}
                                                            checked={elem.answer.includes(option)}
                                                            control={
                                                                <Checkbox
                                                                    name={elem._id}
                                                                    value={option}
                                                                />
                                                            }
                                                            label={option}
                                                        />
                                                    ))}
                                                </FormControl>
                                            </div>
                                        );
                                    case 5:
                                        return (
                                            <div className={styles.element} key={elem._id}>
                                                <div className={styles.top}>
                                                    <p>{elem.question}</p>
                                                </div>
                                                <FormControl fullWidth>
                                                    <InputLabel>{elem.question}</InputLabel>
                                                    <Select
                                                        value={elem.answer}
                                                        onChange={(e) => {
                                                            // Handle dropdown change
                                                        }}
                                                        name={elem._id}
                                                    >
                                                        {elem.option.map((option, i) => (
                                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })
                        }
                    </div>
                    <div className={styles.buttons}>
                        {page != 1 && <Button variant='contained' onClick={prevPage}>Previous</Button>}
                        {page < response?.pages && <Button variant='contained' onClick={nextPage}>Next</Button>}
                    </div>
                </form>
            </div>
        </BaseLayout>
    )
}
