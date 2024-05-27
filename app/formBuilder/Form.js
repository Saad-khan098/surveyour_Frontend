"use client"

import React, { useState, useRef, useEffect } from 'react';
import styles from './layout.module.css';
import ElementTypes from './ElementTypes';
import FormElements from './FormElements';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import Text from './FormElements/Text';
import Numerical from './FormElements/Numerical';
import Customize from './Customize';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import getCookie from '@/utils/getCookie'
import { Button } from '@mui/material';



const types = [
  <Text data={{ question: 'sfsfsfs' }} />,
  <Text data={{ question: 'sfsfsfs' }} />,
  <Text data={{ question: 'sfsfsfs' }} />,
  <Text data={{ question: 'sfsfsfs' }} />,
  <Text data={{ question: 'sfsfsfs' }} />,
]

export default function Form({ formData, elementTypes, formId }) {
  
  const authToken = getCookie('authToken');

  const router = useRouter();


  const [form, setform] = useState(formData);
  const [overlayIndex, setoverlayIndex] = useState(null);
  const [selectElement, setselectElement] = useState(null);
  const [newId, setnewId] = useState(1);
  const [draggingIndex, setdraggingIndex] = useState(-1);
  const isFirstRender = useRef(true); // Ref to track initial mount


  const [page, setpage] = useState(1);

  const [changes, setchanges] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      setselectElement(false);
    };

    // Add event listener
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  function changeName(index, question) {
    setform(prev => {
      let newArr = [...prev.elements];
      newArr[index].question = question;
      return { ...prev, elements: newArr }
    })
    setchanges(true);
  }

  function changeRequired(index, required){
    setform(prev => {
      let newArr = [...prev.elements];
      newArr[index].required = required;
      return { ...prev, elements: newArr }
    })
    setchanges(true);
  }

  function changeOption(index, optionIndex, option) {
    setform(prev => {
      const newArr = [...prev.elements];
      newArr[index].option[optionIndex] = option;
      return { ...prev, elements: newArr };
    })
    setchanges(true)
  }

  function optionAdd(index, option) {
    let newArr = [...form.elements]
    newArr[index].option.push(option);
    setform({ ...form, elements: newArr })
    setchanges(true)
  }

  function deleteOption(index, optionIndex) {
    let newArr = [...form.elements];
    newArr[index].option.splice(optionIndex, 1);
    setform({ ...form, elements: newArr });
    setchanges(true);
  }

  function handleDragEnd(event) {
    setoverlayIndex(null);

    if (event.active.data.current.type === 'new') {
      let elementType = elementTypes.findIndex(elem => elem.name == event.active.id);
      const newElement = {
        isNew: true,
        _id: newId,
        elementType: elementType,
        question: `New Question (${newId})`,
        required: true,
        option: elementType <= 2 ? null : ['option1', 'option2']
      };
      if (event.over && event.over.id === 'droppable') {
        setform(prev => {
          return { ...prev, elements: [newElement, ...prev.elements] }
        })
        setchanges(true);
      }
      else if (event.over) {
        let index = event?.over?.data?.current?.index;
        index++;
        setform(prev => {
          const newArray = [...prev.elements];
          newArray.splice(index, 0, newElement);
          return { ...prev, elements: newArray };
        });
        setchanges(true);
      }
      setnewId(prev => prev + 1);
    }
    else if (event.active.data.current.type === 'change') {

      const isValidIndex = event?.over?.data?.current?.index !== undefined && event?.over?.data?.current?.index !== null;
      if (!isValidIndex || event.over.id == event.active.id) return;

      let index = event.over.data.current.index;
      let index2 = event.active.data.current.index;

      if(index2 > index)index++;

      setform(prev => {
        const elementToRemove = prev.elements[index2];
        const newArr = [...prev.elements];
        newArr.splice(index2, 1);
        newArr.splice(index, 0, elementToRemove);
        return { ...prev, elements: newArr };
      })
      setchanges(true);
    }
  }


  function hadnleDragOver(event) {
    let index = event?.active?.data?.current?.index;
    setselectElement(index);


    console.log(event);
    console.log(event.over)
    if (event.over == null) {
      console.log('match');
      setoverlayIndex(null);
      return;
    }
    console.log('checking');
    if(event.over.id == 'droppable' && event.active?.data?.current?.type == 'new'){
      setoverlayIndex('droppable');
      return;
    }
    index = event?.over?.data?.current?.index;
    if (event?.over?.data?.current?.index != event?.active?.data?.current?.index)
      setoverlayIndex(index);
  }
  function handleDragStart(event) {
    let elementType = elementTypes.findIndex(elem => elem.name == event.active.id);
    setdraggingIndex(elementType);
  }

  async function getForm(pageNo) {
    try {
      console.log('getting form');
      const data = await axios.get(`http://localhost:3001/form/${formId}?page=${pageNo}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      console.log(data);
      setform(data.data);
    }
    catch (e) {
      console.log(e);
    }
  }


  function handlePageChange(e) {
    if (page == e.target.innerText) return;
    getForm(e.target.innerText)
    setpage(e.target.innerText);

  }
  function addPage() {
    axios.put(`http://localhost:3001/form/addPage/${formId}`,
      {
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    setform(prev => {
      return { ...prev, form: { ...prev.form, pages: prev.form.pages + 1 } }
    })
  }

  console.log(form);

  async function saveChanges(){
    console.log('saving changes');
    const data = await axios.put(`http://localhost:3001/form/save/${formId}`,
      {
        form: form,
        page: page
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    setchanges(false);
  }

  async function publishForm(){
    console.log('publishing form');
    const data = await axios.put(`http://localhost:3001/form/publish/${formId}`,
      {
        form: form,
        page: page
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
  }

  if (!form) return;

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={hadnleDragOver} onDragStart={handleDragStart}>
      <DragOverlay>
        {types[draggingIndex]}
      </DragOverlay>
      <div className={styles.page} >
        <div className={styles.left}>
          <Droppable>
            <FormElements data={form} setform={setform} elementTypes={elementTypes} overlayIndex={overlayIndex} />
          </Droppable>
          <div className={styles.pageination}>
            <Pagination count={form.form.pages} page={parseInt(page)} onChange={handlePageChange} hidePrevButton hideNextButton />
            <div className={styles.new} onClick={addPage}>+</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.buttons}>
            <Button variant='contained' disabled={!changes} onClick={saveChanges}>Save Changes</Button>
            <Button variant={'contained'} onClick={publishForm}>Publish Form</Button>
          </div>
          <ElementTypes elementTypes={elementTypes} />
          {
            typeof selectElement == 'number'
            &&
            <div className={styles.customize}>
              <Customize element={form.elements[selectElement]} index={selectElement} changeRequired={changeRequired} changeName={changeName} changeOption={changeOption} optionAdd={optionAdd} deleteOption={deleteOption} />
            </div>
          }
        </div>
      </div>
    </DndContext>

  )
}
