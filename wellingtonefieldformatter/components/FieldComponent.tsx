import * as React from 'react';
import {useState, useEffect} from 'react';
import { ITextFieldProps, TextField } from '@fluentui/react';

export const FieldComponent: React.FC = (props:any) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if(typeof props.value == 'number' 
    && props.value !== value)
      setValue(props.value);

    if(props.value == undefined)
      setValue('')
  },[props.value])


  const checkValue = (value:any) => {
    if(value == undefined || !isNaN(+value))
    {
      setValue(value);
      props.onChange(+value)
    }
  }

  return (
    <TextField
        value={value}
        style={{backgroundColor: props.bgColour, color: props.fColour}}
        onChange={(e:any) => checkValue(e.target.value)}
        disabled={props.disabled}
      />
    );
  }