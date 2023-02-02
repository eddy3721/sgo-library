import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState} from 'react';

const rowHead = {
    "& tr":{
        backgroundColor:'#2a3242',
    },
    "& th":{
        fontWeight: 'bolder',
        color: '#fff'
    },
}
const rowBody = {
    "& tr":{
        backgroundColor:'#1a202c',
        cursor: 'pointer',
    },
    "& tr:hover":{
        backgroundColor:'#2a3242!important',
    },
    "& th,td":{
        color: 'rgba(255,255,255,0.8)',
        borderBottom:'1px solid rgba(255,255,255,0.5)'
    },
}

const redText = {
  "& ":{
    color:'rgba(255,64,64,0.8)!important'
  }
}
const greenText = {
  "& ":{
    color:'rgba(135,255,104,0.8)!important'
  }
}

export default function Forge_Sheet(props) {

  const [data, setData] = useState(props.data);

  const deleteObj = (item, id)=>{
    let r = window.confirm("確定要刪除 " + item.name + " 嗎?");
    if(r === true){
      //localstorage
      let allData = JSON.parse(localStorage.getItem('forge_sheet'));
      allData[props.fileIndex].data.splice(id, 1);
      localStorage.setItem('forge_sheet', JSON.stringify(allData));

      //刷新
      setData(allData[props.fileIndex].data);
      //console.log(allData[props.fileIndex].data);
    }
  };

  const compareColor = (type, value)=>{
    if(value > 80){
      return <TableCell align="right" sx={greenText}>{value}%</TableCell>;
    }
    else if(value <= 50){
      return <TableCell align="right" sx={redText}>{value}%</TableCell>;
    }
    else{
      return <TableCell align="right">{value}%</TableCell>;
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table" id="table">
        <TableHead sx={rowHead}>
          <TableRow>
            <TableCell>裝備名稱</TableCell>
            <TableCell align="right">類型</TableCell>
            <TableCell align="right">攻擊</TableCell>
            <TableCell align="right">防禦</TableCell>
            <TableCell align="right">幸運</TableCell>
            <TableCell align="right">重量</TableCell>
            <TableCell align="right">耐久</TableCell>
          </TableRow>
        </TableHead>
        {
          ((props.mode) === 0)?
          <TableBody sx={rowBody}>
            {data.map((row, index) => (
            <TableRow
              key={index}
              hover='true'
              onClick={()=>deleteObj(row, index)}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.atk}</TableCell>
              <TableCell align="right">{row.def}</TableCell>
              <TableCell align="right">{row.luk}</TableCell>
              <TableCell align="right">{row.wt}</TableCell>
              <TableCell align="right">{row.dur}</TableCell>           
            </TableRow>
          ))}
        </TableBody>:

        <TableBody sx={rowBody}>
        {data.map((row, index) => (
        <TableRow
          key={index}
          hover='true'
          onClick={()=>deleteObj(row, index)}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>

          <TableCell align="right">{row.type}</TableCell>
          {compareColor('atk', row.atk)}
          {compareColor('def', row.def)}
          {compareColor('luk', row.luk)}
          {compareColor('wt', row.wt)}
          {compareColor('dur', row.dur)}        
        </TableRow>
      ))}
    </TableBody>
        }
        
      </Table>
    </TableContainer>
  )
}
