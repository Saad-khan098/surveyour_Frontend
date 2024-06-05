"use client"

import React, { useState, useRef, useEffect } from 'react';
import styles from './layout.module.css';
import ElementTypes from './ElementTypes';
import FormElements from './FormElements';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import Text from './FormElements/Text';
import Numerical from './FormElements/Numerical';
import Date from './FormElements/Date';
import Checkbox from './FormElements/Checkbox';
import Radio from './FormElements/Radio';
import Dropdown from './FormElements/Dropdown';
import Customize from './Customize';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import getCookie from '@/utils/getCookie'
import { Button } from '@mui/material';
import SuccessAlert from '../Components/SuccessAlert';
import EditIcon from '@mui/icons-material/Edit';
import FormEdit from './FormEdit';
import ConfirmDeletePage from './ConfirmDeletePage';
import UnSaveedChanges from './UnSavedChanges';

export default function Form({elementTypes, formId }) {




  const authToken = getCookie('authToken');

  const router = useRouter();


  const [form, setform] = useState(null);
  const [overlayIndex, setoverlayIndex] = useState(null);
  const [selectElement, setselectElement] = useState(null);
  const [newId, setnewId] = useState(1);
  const [draggingIndex, setdraggingIndex] = useState(-1);
  const isFirstRender = useRef(true);

  const types = [
    <Text data={{ question: `New Question` }} />,
    <Numerical data={{ question: `New Question` }} />,
    <Date data={{ question: `New Question` }} />,
    <Radio data={{ question: `New Question`, option: ['option1', 'option2'] }} />,
    <Checkbox data={{ question: `New Question`, option: ['option1', 'option2'] }} />,
    <Dropdown data={{ question: `New Question`, option: ['option1', 'option2'] }} />,
  ]


  const [page, setpage] = useState(1);

  const [changes, setchanges] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      console.log('sdjkjkasdbjkjkascjk')
      console.log(event.target.tagName);
      const interactiveElements = ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'A', 'LABEL', "SPAN", "svg", "path"];
      if (!interactiveElements.includes(event.target.tagName)) {
        setselectElement(null);
      }
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
  function deleteElement(index) {
    setform(prev => {
      let newArr = [...prev.elements];
      newArr[index].isDeleted = true;
      return { ...prev, elements: newArr }
    })
    setchanges(true);
  }

  function changeRequired(index, required) {
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
        question: `New Question`,
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

      if (index2 > index) index++;

      setform(prev => {
        const elementToRemove = prev.elements[index2];
        const newArr = [...prev.elements];
        newArr.splice(index2, 1);
        newArr.splice(index, 0, elementToRemove);
        return { ...prev, elements: newArr };
      })
      setchanges(true);
      setselectElement(null);
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
    if (event.over.id == 'droppable' && event.active?.data?.current?.type == 'new') {
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
      console.log(pageNo);
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

  useEffect(()=>{
    getForm(page);
  }, [])

  const [unsavedChanges, setunsavedChanges] = useState(false)
  const [takeToPage, settakeToPage] = useState(null);

  function openUnSavedChanges(){
    setunsavedChanges(true);
  }
  function closeUnSavedChanges(){
    setunsavedChanges(false);
  }

  function handlePageChange(e) {
    if (page == e.target.innerText) return;

    if(changes){
      openUnSavedChanges();
      settakeToPage(parseInt(e.target.innerText))
    }
    else{
      getForm(e.target.innerText)
      setpage(e.target.innerText);
    }
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

  async function saveChanges(page) {
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
    setopen3(true);
  }

  async function publishForm(type) {
    const data = await axios.put(`http://localhost:3001/form/publish/${formId}?type=${type}`,
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
    setform({ ...form, form: { ...form.form, public: type == -1 ? false : true } })
    if (type == -1) {
      setopen2(true);
    }
    else {
      setopen(true);
    }
  }

  async function deletePage() {
    try {

      const data = await axios.delete(`http://localhost:3001/form/page/${formId}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )
    window.location.reload();
    }
    catch (e) {
      alert('some error occurred');
    }
  }

  const [open, setopen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen(false);
  };
  const [open2, setopen2] = useState(false);

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen2(false);
  };
  const [open3, setopen3] = useState(false);

  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen3(false);
  };


  const [openFormEdit, setopenFormEdit] = useState(false);

  function handleFormEditOpen() {
    setopenFormEdit(true);
  }
  function handleFormEditClose() {
    setopenFormEdit(false);
  }



  const [confirmDeletePage, setconfirmDeletePage] = useState(false)

  function handleConfirmDeleteOpen() {
    setconfirmDeletePage(true);
  }
  function handleConfirmDeleteClose() {
    setconfirmDeletePage(false);
  }

  
  if (!form) return;

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} onDragOver={hadnleDragOver} onDragStart={handleDragStart}>
        <DragOverlay>
          {types[draggingIndex]}
        </DragOverlay>
        <div className={styles.page} >
          <div className={styles.left}>
            <div className={styles.top}>
              <h1>{form.form.name}</h1>
              <EditIcon onClick={handleFormEditOpen} />
            </div>
            <Droppable>
              {
                form.elements.length == 0
                &&
                <div className={`${styles.drag} ${overlayIndex == 'droppable' ? styles.overlay : ''}`}>
                  <img src="/drag-and-drop.png" alt="" />
                </div>
              }
              <FormElements data={form} setform={setform} elementTypes={elementTypes} overlayIndex={overlayIndex} selectElement={selectElement} />
            </Droppable>
            <div className={styles.pageination}>
              <Pagination count={form.form.pages} page={parseInt(page)} onChange={handlePageChange} hidePrevButton hideNextButton />
              <div className={styles.new} onClick={addPage} style={{cursor: 'pointer'}}>+</div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.buttons}>
              <Button variant='contained' color="success" disabled={!changes} onClick={()=>{saveChanges(page)}}>Save Changes</Button>
              <Button variant='contained' color="success" disabled={changes} onClick={()=>{
                console.log('going back');
                router.push(`/viewForm?formId=${formId}`)
              }}>Go Back</Button>
              {
                form.form.public ?
                  <Button variant={'contained'} onClick={() => { publishForm(-1) }}>Unpublish Form</Button>
                  :
                  <Button variant={'contained'} onClick={() => { publishForm(1) }}>Publish Form</Button>
              }
              <Button onClick={handleConfirmDeleteOpen} variant='contained' color='error'>
                Delete Page
              </Button>
            </div>
            {
              selectElement == null
              &&
              <ElementTypes elementTypes={elementTypes} />
            }
            {
              typeof selectElement == 'number'
              &&
              <div >
                {
                  form?.elements[selectElement]&&
                  <Customize element={form.elements[selectElement]} index={selectElement} changeRequired={changeRequired} changeName={changeName} changeOption={changeOption} optionAdd={optionAdd} deleteOption={deleteOption} deleteElement={deleteElement} />
                }
              </div>
            }
          </div>
        </div>
      </DndContext>

      <SuccessAlert open={open} handleClose={handleClose} msg={"Successfully published form"} />
      <SuccessAlert open={open2} handleClose={handleClose2} msg={"Successfully unpublished form"} />
      <SuccessAlert open={open3} handleClose={handleClose3} msg={"Successfully saved changes"} />


      <FormEdit open={openFormEdit} handleFormEditOpen={handleFormEditOpen} handleFormEditClose={handleFormEditClose} form={form} setform={setform} setchanges={setchanges} />
      <ConfirmDeletePage open={confirmDeletePage} handleClose={handleConfirmDeleteClose} deletePage={deletePage}/>
      <UnSaveedChanges open={unsavedChanges} handleclose={closeUnSavedChanges} page={page} setpage={setpage} saveChanges={saveChanges} getForm={getForm} takeToPage={takeToPage}/>
    </>

  )
}
