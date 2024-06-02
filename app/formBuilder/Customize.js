import React, { useState, useRef, useEffect } from 'react';
import TextCustomizer from './FormCustomizors/Text';
import styles from './customize.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import Switch from '@mui/material/Switch';
import { FormGroup, FormControlLabel } from '@mui/material';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';



export default function Customize({ element, index, changeName, changeOption, optionAdd, deleteOption, changeRequired, deleteElement }) {

  const [question, setquestion] = useState(element.question);
  const [required, setrequired] = useState(element.required);

  console.log({ required })


  const changeQuestion = function () {
    changeName(index, question);
  };
  useEffect(() => {
    setquestion(element.question);
    setrequired(element.required);
  }, [element])

  const [addOption, setaddOption] = useState(null);

  return (
    <div className={styles.customize}>
      <h2>Customize</h2>
      <div>
        <div className={styles.name}>
          <Input type="text" value={question} onChange={(e) => { setquestion(e.target.value) }} />
          <Button onClick={changeQuestion} variant='contained' size="small" >change</Button>
        </div>

        <div>
          <FormGroup>
            <FormControlLabel control={
              <Switch checked={required} onChange={
                (e) => {
                  console.log(e.target.checked);
                  changeRequired(index, !element.required);
                  setrequired(e.target.checked);
                }}
              />
            }
              label="Required" />
          </FormGroup>
        </div>

        {
          element.option &&

          <div className={styles.options}>
            <h3>Options</h3>
            <div>
              {
                element.option.map((option, i) => {
                  return (
                    <Option data={option} index={index} changeOption={changeOption} optionIndex={i} key={i} deleteOption={deleteOption} />
                  )
                })
              }
            </div>

            <div className={styles.addOption}>

              <Input type="text" value={addOption} onChange={(e) => { setaddOption(e.target.value) }} placeholder='add option'/>
              <Button
              variant='contained' 
              size='small'
              color='success'
              onClick={() => {
                optionAdd(index, addOption);
                setaddOption('');
              }}>add option</Button>
            </div>
          </div>
        }

        <div className={styles.delete}>
          <Button variant='contained' color='error'
          onClick={()=>{
            deleteElement(index)
          }}
          >Delete</Button>
        </div>

      </div>
    </div>
  )
}

function Option({ data, index, changeOption, optionIndex, deleteOption }) {
  const [option, setoption] = useState(data)

  useEffect(() => {
    setoption(data);
  }, [data])

  async function change() {
    changeOption(index, optionIndex, option)
  }
  return (
    <div className={styles.option}>
      <Input type="text" value={option} onChange={(e) => { setoption(e.target.value) }} />
      <Button onClick={change} variant='contained' size="small">change</Button>
      <ClearIcon onClick={() => { deleteOption(index, optionIndex) }} />
    </div>
  )
}
