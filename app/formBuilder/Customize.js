import React, { useState, useRef, useEffect } from 'react';
import TextCustomizer from './FormCustomizors/Text';
import styles from './customize.module.css';

export default function Customize({ element, index, changeName, changeOption ,optionAdd }) {

  const [question, setquestion] = useState(element.question);


  const changeQuestion = function () {
    changeName(index, question);
  };
  useEffect(() => {
    setquestion(element.question);
  }, [element])


  const [addOption, setaddOption] = useState(null);

  return (
    <div>
      <h1>Customize</h1>
      <div>
        <div>
          <input type="text" value={question} onChange={(e) => { setquestion(e.target.value) }} />
          <button onClick={changeQuestion}>change</button>
        </div>

        {
          element.option&&

          <div className={styles.options}>
            <h3>Options</h3>
            {
              element.option.map((option, i) => {
                return (
                  <Option data={option} index={index} changeOption={changeOption} optionIndex={i} key={i} />
                )
              })
            }

            <input type="text" value={addOption} onChange={(e)=>{setaddOption(e.target.value)}}/>
            <button onClick={()=>{optionAdd(index,addOption)}}>add option</button>
          </div>
        }

      </div>
    </div>
  )
}

function Option({ data, index, changeOption, optionIndex }) {
  const [option, setoption] = useState(data)

  useEffect(() => {
    setoption(data);
  }, [data])

  async function change() {
    changeOption(index, optionIndex, option)
  }
  return (
    <div>
      <input type="text" value={option} onChange={(e) => { setoption(e.target.value) }} />
      <button onClick={change}>change</button>
    </div>
  )
}
