import React from 'react'
import styles from './elementTypes.module.css'
import { Draggable } from './Draggable'

export default function Element({data}) {
  return (
    <Draggable id={data.name} type={'new'}>
        <div className={styles.element}>
            <p>{data.name}</p>
        </div>
    </Draggable>
  )
}
