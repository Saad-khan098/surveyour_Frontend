import React from 'react'
import Element from './Element'
import styles from './elementTypes.module.css'

export default function ElementTypes({ elementTypes }) {
    return (
        <div className={styles.elements}>

            {
                elementTypes.map(elem => {
                    return (
                        <Element data={elem} key={elem.name}/>
                    )
                })
            }
        </div>
    )
}
