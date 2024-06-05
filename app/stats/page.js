"use client"

import React, { useState, useEffect } from 'react';
import BaseLayout from '../Components/BaseLayout';
import styles from './stats.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios';
import getCookie from '@/utils/getCookie'
import FormElements from './FormElements'



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
    Checkbox,
    Pagination
} from '@mui/material';

import Stats from './Stats';



export default function Statistics() {

    const authToken = getCookie('authToken');

    const params = useSearchParams();
    const formId = params.get('formId');

    if (!formId) return;
    const router = useRouter();

    const [form, setform] = useState(null);

    const [stats, setstats] = useState({});
    console.log(stats);

    const [page, setpage] = useState(1);

    const getForm = async (page) => {
        try {
            const data = await axios.get(`http://localhost:3001/form/${formId}?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
            setform(data.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    async function getStats(elementId) {
        try {
            const data = await axios.get(`http://localhost:3001/response/elementStats/${elementId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
            setstats(prev => {
                return(
                    { ...prev, [elementId]: data.data }
                )
            });

            
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getForm(page);
    }, [])

    useEffect(() => {
        if (form) {
            form.elements.forEach(elem => {
                getStats(elem._id);
            })
        }
    }, [form])

    if (!form) return;
    return (
        <BaseLayout>
            <div className={styles.page}>
                <div className={styles.top}>
                    <h1>{form.form.name}</h1>
                </div>

                <div className={styles.elements}>
                    <h2>Element Wise Stats</h2>
                    {
                        form &&
                        form.elements.map(elem => {
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
                                                placeholder='Enter Text'
                                                disabled
                                            />
                                            <Stats stats={stats} elem={elem}/>
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
                                                placeholder='Enter Numner'
                                                disabled
                                            />
                                            <Stats stats={stats} elem={elem}/>
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
                                                disabled
                                            />
                                            <Stats stats={stats} elem={elem}/>
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
                                                >
                                                    {elem.option.map((option, i) => (
                                                        <FormControlLabel
                                                            key={option}
                                                            control={<Radio checked={false} disabled/>}
                                                            label={option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <Stats stats={stats} elem={elem}/>
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
                                                        control={
                                                            <Checkbox
                                                                name={elem._id}
                                                                checked={false}
                                                                disabled
                                                            />
                                                        }
                                                        label={option}
                                                    />
                                                ))}
                                            </FormControl>
                                            <Stats stats={stats} elem={elem}/>
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
                                                    onChange={(e) => {
                                                        // Handle dropdown change
                                                    }}
                                                    name={elem._id}
                                                >
                                                    {elem.option.map((option, i) => (
                                                        <MenuItem  key={option} disabled>{option}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <Stats stats={stats} elem={elem}/>
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })
                    }
                    <Pagination
                        onChange={async (e, newPage) => {
                            await getForm(newPage);
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                              });
                            setpage(parseInt(newPage));
                        }}
                        count={form.form.pages}
                        page={page}
                    />
                </div>
            </div>
        </BaseLayout>
    )
}
