import * as React from 'react';
import {useState, useEffect} from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { IFieldType } from '../model/fieldType'

let FieldFormatterTimeout:any;

export const FieldComponent: React.FC = (props:any) => {
  const [value, setValue] = useState('');
  const [bColour, setBColour] = useState('');
  const [fColour, setFColour] = useState('');

  useEffect(() => {
    if(props.value !== undefined) {
      setValue(props.value);
      setBColour(getColour(props.value, props.colourRules).bgColour);
      setFColour(getColour(props.value, props.colourRules).fColour);
    }
      

    if(props.value == undefined)
      setValue('')
  },[props.value])


  const fieldChange = (value:any) => {
    setValue(value);
    if(FieldFormatterTimeout) clearTimeout(FieldFormatterTimeout);

    FieldFormatterTimeout = setTimeout(() => {
      props.onChange(value, props.fType);
    }, 500);
  }

  return (
    <TextField
        value={value}
        style={{backgroundColor: bColour, color: fColour}}
        onChange={(e:any) => fieldChange(e.target.value)}
        disabled={props.disabled}
      />
    );
  }

function getColour (value: IFieldType, colourRules:Array<any>)
	{
		if(value !== null && typeof value !== 'undefined')
		{
			for(var i=0; i<colourRules.length; i++)
			{
				switch(colourRules[i][0]) {
					case '<':
						if (value < colourRules[i][1])
						return { bgColour: colourRules[i][2], fColour: colourRules[i][3] }
					break;
					case '>':
						if (value > colourRules[i][1])
						return { bgColour: colourRules[i][2], fColour: colourRules[i][3] }
					break;
					case '==':
						if (value == colourRules[i][1])
						return { bgColour: colourRules[i][2], fColour: colourRules[i][3] }
					break;
				}
			}
		}

		return { bgColour: "#ffffff", fColour: "#000000" };
	}
