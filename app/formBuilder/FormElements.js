import React from 'react'
import styles from './form.module.css'
import FormElement from './FormElement'
import { Droppable } from './Droppable'
import { Draggable } from './Draggable'


export default function FormElements({data, elementTypes, overlayIndex, selectElement}) {

  console.log({data})

  return (
    <div className={styles.form}>
      <Droppable>
        {
          data.elements.length > 0
          &&
          <div className={`${styles.top}`}>
          {
            overlayIndex == 'droppable'
            &&
            <div></div>
          }
        </div>
        }
      </Droppable>
        {
          data?.elements&&
            data.elements.map((elem,index)=>{
              if(elem.isDeleted)return;
                return(
                        <Draggable id={elem._id} type="change" index={index}>
                            <FormElement data={elem} key={elem._id} elementTypes={elementTypes} overlay={overlayIndex==index} index={index} selected={selectElement==index}/>
                        </Draggable>
                )
            })
        }
    </div>
  )
}
