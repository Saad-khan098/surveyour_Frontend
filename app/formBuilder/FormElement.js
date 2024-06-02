import React from 'react'
import styles from './form.module.css'
import Text from './FormElements/Text'
import Numerical from './FormElements/Numerical'
import Date from './FormElements/Date'
import Radio from './FormElements/Radio'
import Checkbox from './FormElements/Checkbox'
import Dropdown from './FormElements/Dropdown'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'


export default function FormElement({data, elementTypes,overlay,index, selected}) {
  
  const types = [
    <Text data={data}/>,
    <Numerical data={data} />,
    <Date data={data} />,
    <Radio data={data} />,
    <Checkbox data={data} />,
    <Dropdown data={data} />,
  ]


  
  return (
    <div className={`${styles.formElementContainer} ${selected?styles.selected: ''}`}>

            <Droppable id={data._id} index={index}>
      {types[data.elementType]}
        <div className={`${styles.dropArea} ${overlay?styles.overlay:''}`}>
          <div className={`${overlay?styles.overlay:''}`}></div>
        </div>
      </Droppable>
    </div>
  )
}
