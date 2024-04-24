"use client"

import React, { useState, useRef } from 'react';
import styles from './layout.module.css';
import ElementTypes from './ElementTypes';
import FormElements from './FormElements';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import Text from './FormElements/Text';
import Numerical from './FormElements/Numerical';
import Customize from './Customize';

export default function Form({ formData, elementTypes }) {

  const [form, setform] = useState(formData);
  const [overlayIndex, setoverlayIndex] = useState(null);
  const [selectElement, setselectElement] = useState(null);

  const [randomState, setrandomState] = useState(null);

  const [newId, setnewId] = useState(1);


  function changeName(index,question){
    setform(prev=>{
      let newArr = [...prev.elements];
      newArr[index].question = question;
      return {...prev, elements: newArr}
    })
  }

  function changeOption(index,optionIndex,option){
    setform(prev=>{
      const newArr = [...prev.elements];
      newArr[index].option[optionIndex] = option;
      return {...prev, elements: newArr};
    })
  }

  function optionAdd(index,option){
    let newArr = [...form.elements]
    newArr[index].option.push(option);
    setform({...form, elements: newArr})
  }

  function handleDragEnd(event) {
    setoverlayIndex(null);

    if (event.active.data.current.type === 'new') {
      let elementType = elementTypes.findIndex(elem=>elem.name == event.active.id);
      const newElement = {
        _id: newId,
        elementType: elementType,
        question: `New Question (${newId})`,
        required: true,
        option: elementType <= 2?null:['option1', 'option2']
      };
      if (event.over && event.over.id === 'droppable') {
        setform(prev => {
          return { ...prev, elements: [...prev.elements, newElement] }
        })
      }
      else if (event.over) {
        let index = event?.over?.data?.current?.index;
        index++;
        setform(prev => {
          const newArray = [...prev.elements];
          newArray.splice(index, 0, newElement);
          return { ...prev, elements: newArray };
        });
      }
      setnewId(prev=>prev+1);
    }
    else if(event.active.data.current.type === 'change'){
      
      const isValidIndex = event?.over?.data?.current?.index !== undefined && event?.over?.data?.current?.index !== null;
      if(!isValidIndex || event.over.id == event.active.id)return;
      
      let index = event.over.data.current.index;
      let index2 = event.active.data.current.index;

      setform(prev=>{
        const elementToRemove = prev.elements[index2];
        const newArr = [...prev.elements];
        newArr.splice(index2, 1); // Remove element at index2
        newArr.splice(index + 1, 0, elementToRemove); // Insert element after index
        return { ...prev, elements: newArr };
      })
    }
  }


  function hadnleDragOver(event) {
    let index = event?.active?.data?.current?.index;
    setselectElement(index);


    if(event.over == null || event.over.id == 'droppable' || event?.over?.data?.current?.index == event?.active?.data?.current?.index){
      setoverlayIndex(null);
      return;
    }
    
    index = event?.over?.data?.current?.index;
    if(event?.over?.data?.current?.index != event?.active?.data?.current?.index)
    setoverlayIndex(index);
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={hadnleDragOver}>
      <div className={styles.page} >
        <div className={styles.left}>
          <Droppable>
            <FormElements data={form} setform={setform} elementTypes={elementTypes} overlayIndex={overlayIndex} />
          </Droppable>
        </div>
        <div className={styles.right}>
          <ElementTypes elementTypes={elementTypes} />
          {
            typeof selectElement == 'number'
            &&
            <div className={styles.customize}>
              <Customize element={form.elements[selectElement]} index={selectElement} changeName={changeName} changeOption={changeOption} optionAdd={optionAdd}/>
            </div>
          }
        </div>
      </div>
    </DndContext>

  )
}
