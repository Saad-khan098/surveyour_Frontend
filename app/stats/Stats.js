import React from 'react'
import styles from './stats.module.css'
import CircleProgress from './CircleProgress'
import { CircularProgress } from '@mui/material';
import PieCard from '../Cards/pieCard';

export default function Stats({ stats, elem }) {

    if (stats[elem._id] && [3, 4, 5].includes(elem.elementType)) {
        console.log('ssdfsdjfn');

        let labels = [];
        let values = [];

        let groups = stats[elem._id].groups;
        console.log(groups);

        groups.forEach(elem => {
            labels.push(elem._id.join(','));
            values.push(elem.count)
        })


        let total = values.reduce((acc, elem) => {
            return acc += elem
        }, 0)

        let valuePercents = values.map((elem) => {
            return elem / total * 100
        })
        var pieData = { labels: labels, values: values, valuePercents: valuePercents }
    }

    return (
        <div className={styles.stats}>
            <h3>Statistics</h3>

            {
                stats[elem._id] ?
                    <>
                        <div className={styles.top}>
                            <div>
                                <p>Total Responses</p>
                                <p>{stats[elem._id].totalResponses}</p>
                            </div>
                            <div>
                                <p>Total Answers</p>
                                <p>{stats[elem._id].totalAnswers}</p>
                            </div>
                            <div className={styles.percent}>
                                <CircleProgress size={100} value={(stats[elem._id].totalAnswers / stats[elem._id].totalResponses * 100).toFixed(1)} />
                                <p>people answered this question</p>
                            </div>
                        </div>

                        {
                            [3, 4, 5].includes(elem.elementType) ?
                                <div className={styles.multiple}>
                                    {
                                        <PieCard data={pieData} />
                                    }

                                    <div className={styles.data}>
                                        <h3>Option Breakdown</h3>
                                        {
                                            pieData.labels.map((elem, index) => {
                                                return (
                                                    <div>
                                                        <p>{elem}</p>
                                                        <p>{pieData.values[index]}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </>

                    :
                    <CircularProgress />
            }
        </div>
    )
}
