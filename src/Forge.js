import React from 'react'
import styles from './css/forge.module.css';
import { useState } from 'react';
import Title from './Title';
import {Alert, TextField, MenuItem, ButtonGroup, Button} from '@mui/material';

const sx = {
    "&":{
        m: 1,
        minWidth: 100
    },
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
    "& .MuiSvgIcon-root":{
        color: '#fff'
    },
    "& .MuiInputBase-input":{
        color: '#fff'
    }
}
const sx_2 = {
    "&":{
        m: 1,
        maxWidth: 120
    },
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
}
const type = ["單手劍", "細劍", "短刀", "單手錘", "盾牌", "雙手劍", "太刀", "雙手斧", "長槍"];
const mine = ["16石", "16鐵"];

export default function Forge() {
  let [obj, setObj] = useState({
    'name':'',
    'talentPoint': '',
    'type': '',
    'mine': '',
    'atk': 0,
    'def': 0,
    'luk': 0,
    'wt': 0,
    'dur': 0,
    'r_atk': 0,
    'r_def': 0,
    'r_luk': 0,
    'r_wt': 0,
    'r_dur': 0
  });

  let [atk, setAtk] = useState(0);
  let [def, setDef] = useState(0);
  let [luk, setLuk] = useState(0);
  let [wt, setWt] = useState(0);
  let [dur, setDur] = useState(0);
  
  //更新表單
  function changeObj(key, value){
    let newObj = obj;
    newObj[key] = value;
    setObj(newObj);
    setAtk(newObj.atk);
    setDef(newObj.def);
    setLuk(newObj.luk);
    setWt(newObj.wt);
    setDur(newObj.dur);
  }
    
  return (
    <div>
        <Title mainTitle="測名"/>
        
        <div className='main'>

        <Alert variant="outlined" severity="warning" sx={{color:'#ff9800'}}>
            這邊還沒做完，主要是缺乏測試數據，之前浮游城版的測名計算機不知道還能不能用，
            如果有鍛造大佬想提供資料歡迎私訊.w.b
        </Alert>
        
        <div className={styles.forgeBlock}>
            <TextField
            required
            id="eq_1"
            label="裝備名稱"
            sx={sx}
            onChange={newValue => changeObj('name', newValue.target.value)}
            />
            <TextField
            required
            id="eq_2"
            label="鍛造天賦"
            sx={sx}
            type="number"
            onChange={newValue => changeObj('talentPoint', newValue.target.value)}
            />
            <TextField
            select
            required
            id="eq_3"
            label="類型"
            sx={sx}
            defaultValue={obj.type}
            onChange={newValue => changeObj('type', newValue.target.value)}
            >
            {type.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
            </TextField>
            <TextField
            select
            required
            id="eq_4"
            label="礦石"
            sx={sx}
            defaultValue={obj.mine}
            onChange={newValue => changeObj('mine', newValue.target.value)}
            >
            {mine.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
            </TextField>
        </div>

        <div className={styles.forgeBlock}>
            <h3>原始數值</h3>

            <TextField
            type="number"
            id="eq_5"
            label="攻擊"
            sx={sx_2}
            onChange={newValue => changeObj('atk', newValue.target.value)}
            />
            <TextField
            type="number"
            id="eq_6"
            label="防禦"
            sx={sx_2}
            onChange={newValue => changeObj('def', newValue.target.value)}
            />
            <TextField
            type="number"
            id="eq_7"
            label="幸運"
            sx={sx_2}
            onChange={newValue => changeObj('luk', newValue.target.value)}
            />
            <TextField
            type="number"
            id="eq_8"
            label="重量"
            sx={sx_2}
            onChange={newValue => changeObj('wt', newValue.target.value)}
            />
            <TextField
            type="number"
            id="eq_9"
            label="耐久"
            sx={sx_2}
            onChange={newValue => changeObj('dur', newValue.target.value)}
            />
        </div>

        <div className={styles.forgeBlock}>
            <h3>結果</h3>

            <TextField
            id="eq_5"
            label="攻擊"
            sx={sx_2}
            value={atk}
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="eq_6"
            label="防禦"
            sx={sx_2}
            value={def}
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="eq_7"
            label="幸運"
            sx={sx_2}
            value={luk}
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="eq_8"
            label="重量"
            sx={sx_2}
            value={wt}
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="eq_9"
            label="耐久"
            sx={sx_2}
            value={dur}
            InputProps={{
                readOnly: true,
            }}
            />
        </div>

        <div className={styles.forgeBlock}>
            <ButtonGroup size="large" color="info" variant="outlined" aria-label="outlined button group">
                <Button>存入...</Button>
                <Button>複製結果</Button>
            </ButtonGroup>
        </div>

        </div>
    </div>
  )
}
