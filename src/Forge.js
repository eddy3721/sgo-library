import React from 'react'
import styles from './css/forge.module.css';
import { useState} from 'react';
import Title from './Title';
import Dialog from './forge/Forge_Dialog';
import {Alert, TextField, Button} from '@mui/material';

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
    '完美的': 1.80,
    '頂級的': 1.70,
    '精良的': 1.45,
    '高級的': 1.25,
    '上等的': 1.15,
    '普通的': 1.00,
    '次等的': 0.9,
    '劣質的': 0.8,
    '破爛的': 0.7,
    '垃圾般的': 0.55,
    '屎一般的': 0.4
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
    let resault = [];
    resault.push(Number(/攻擊：([0-9]+)/.exec(value)[1]),
                Number(/防禦：([0-9]+)/.exec(value)[1]),
                Number(/幸運：([0-9]+)/.exec(value)[1]),
                Number(/重量：([0-9]+)/.exec(value)[1]),
                Number(/耐久：([0-9]+)/.exec(value)[1]));

    setAtk(resault[0]);
    setDef(resault[1]);
    setLuk(resault[2]);
    setWt(resault[3]);
    setDur(resault[4]);

    //計算結果
    let rateName = value.split(" ")[0];
    let r = rate[rateName];
    if(r){
        for(let i = 0; i < resault.length; i++){
            if(i !== 3){ //重量除外
                resault[i] = Math.round((resault[i] / r) * 100) / 100;
            }
        }

        setAtk2(resault[0]);
        setDef2(resault[1]);
        setLuk2(resault[2]);
        setWt2(resault[3]);
        setDur2(resault[4]);

        //更新表單
        let newObj = obj;
        newObj.name = value.slice(rateName.length+1, /鍛造者：/.exec(value).index-1);
        newObj.type = /類型：(\S+)/.exec(value)[1];
        newObj.atk = resault[0];
        newObj.def = resault[1];
        newObj.luk = resault[2];
        newObj.wt = resault[3];
        newObj.dur = resault[4];
        setObj(newObj);
    }
    else{
        alert("error, 該品質不在記錄內");
    }

  }

  //清除輸入框
  const clearPasteValue = ()=>{
    document.querySelector('#paste').value='';
  };

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
            id="paste"
            label="貼上背包數值"
            sx={sx}
            onChange={newValue => pasteEq(newValue.target.value)}
            />
            <Button sx={{marginTop: 2}} variant="contained" onClick={clearPasteValue}>清除</Button>
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
            <Dialog obj={obj}/>
        </div>

        </div>
    </div>
  )
}
