import React from 'react'
import styles from './form.module.css'
import FormElement from './FormElement'
import { Droppable } from './Droppable'
import { Draggable } from './Draggable'


export default function FormElements({data, elementTypes, overlayIndex}) {

  console.log({overlayIndex})

  return (
    <div className={styles.form}>
      <Droppable>
        <div className={`${styles.top}`}>
          {
            overlayIndex == 'droppable'
            &&
            <div></div>
          }
        </div>
      </Droppable>
        {
          data?.elements&&
            data.elements.map((elem,index)=>{
                return(
                        <Draggable id={elem._id} type="change" index={index}>
                            <FormElement data={elem} key={elem._id} elementTypes={elementTypes} overlay={overlayIndex==index} index={index}/>
                        </Draggable>
                )
            })
        }
    </div>
  )
}
