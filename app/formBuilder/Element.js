import React from 'react'
import styles from './elementTypes.module.css'
import { Draggable } from './Draggable'
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DialpadIcon from '@mui/icons-material/Dialpad';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Element({data,index}) {

  const icons = [
    <TextFieldsIcon />,
    <DialpadIcon />,
    <CalendarMonthIcon />,
    <RadioButtonCheckedIcon />,
    <CheckBoxIcon />,
    <ArrowDropDownIcon />,
  ]

  return (
    <Draggable id={data.name} type={'new'}>
        <div className={styles.element}>
            {icons[index]}
            <p>{data.name}</p>
        </div>
    </Draggable>
  )
}
