import React from 'react'
import {TextField} from '@mui/material';

export default function ComboBox(props) {

  return (
    <TextField 
        sx={{
            "& .MuiFormLabel-root": {
                color: '#fff'
            },
            "& .MuiFormLabel-root.Mui-focused": {
                color: '#03a9f4'
            },
            "& fieldset": {
                borderColor: '#fff'
            },
            "&:hover fieldset":{
                borderColor: '#03a9f4!important'
            },
            "& .MuiButtonBase-root":{
                color: '#fff'
            },
            "& .MuiInputBase-input":{
                color: '#fff'
            }
        }}
        {...props.params} label={props.label} />
  )
}
