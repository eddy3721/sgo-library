import React from 'react'
import styles from './css/forge.module.css';
import { useState} from 'react';
import Title from './Title';
import Dialog from './forge/Forge_Dialog';
import {Alert, TextField, ButtonGroup, Button} from '@mui/material';

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

  let rate = {
    '傳說的': 2.60,
    '神話的': 2.25,
    '史詩的': 1.9,
    '頂級的': 1.70,
    '精良的': 1.50,
    '高級的': 1.275,
    '上等的': 1.20,
    '普通的': 1.00,
    '次等的': 0.85,
    '劣質的': 0.70,
    '破爛的': 0.6,
    '垃圾般的': 0.5,
    '屎一般的': 0.35
  }

  let [atk, setAtk] = useState(0);
  let [def, setDef] = useState(0);
  let [luk, setLuk] = useState(0);
  let [wt, setWt] = useState(0);
  let [dur, setDur] = useState(0);
  let [atk2, setAtk2] = useState(0);
  let [def2, setDef2] = useState(0);
  let [luk2, setLuk2] = useState(0);
  let [wt2, setWt2] = useState(0);
  let [dur2, setDur2] = useState(0);
  
  //貼上數值
  function pasteEq(value){
    let arr = value.split(/\s+/);
    console.log(arr);
    for(let i = 5; i <= 9; i++){
        arr[i] = Number(arr[i].substr(3));
    }
    console.log(arr);
    setAtk(arr[6]);
    setDef(arr[7]);
    setLuk(arr[8]);
    setWt(arr[9]);
    setDur(arr[12]);

    //計算結果
    let r = rate[arr[0]];
    if(r){
        let resault = [];
        resault.push(Math.round((arr[6] / r) * 100) / 100);
        resault.push(Math.round((arr[7] / r) * 100) / 100);
        resault.push(Math.round((arr[8] / r) * 100) / 100);
        resault.push(Math.round((arr[9] / r) * 100) / 100);
        resault.push(Math.round((arr[12] / r) * 100) / 100);
        setAtk2(resault[0]);
        setDef2(resault[1]);
        setLuk2(resault[2]);
        setWt2(resault[3]);
        setDur2(resault[4]);

        //更新表單
        let newObj = obj;
        newObj.name = arr[1];
        newObj.type = arr[16].substr(3);
        newObj.atk = resault[0];
        newObj.def = resault[1];
        newObj.luk = resault[2];
        newObj.wt = resault[3];
        newObj.dur = resault[4];
        setObj(newObj);
        console.log(obj);
    }
    else{
        alert("error, 該品質不在記錄內");
    }

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
            id="eq_4"
            label="貼上背包數值"
            sx={sx}
            onChange={newValue => pasteEq(newValue.target.value)}
            />
        </div>

        <div className={styles.forgeBlock}>
            <h3>原始數值</h3>

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
            <h3>結果</h3>

            <TextField
            id="eq_5"
            label="攻擊"
            sx={sx_2}
            value={atk2}
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="eq_6"
            label="防禦"
            sx={sx_2}
            value={def2}
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="eq_7"
            label="幸運"
            sx={sx_2}
            value={luk2}
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="eq_8"
            label="重量"
            sx={sx_2}
            value={wt2}
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="eq_9"
            label="耐久"
            sx={sx_2}
            value={dur2}
            InputProps={{
                readOnly: true,
            }}
            />
        </div>

        <div className={styles.forgeBlock}>
            <ButtonGroup size="large" color="info" variant="outlined" aria-label="outlined button group">
                <Dialog obj={obj}/>
                <Button>複製結果</Button>
            </ButtonGroup>
        </div>

        </div>
    </div>
  )
}
