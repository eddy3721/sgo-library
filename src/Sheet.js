import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Title from './Title';
import ForgeSheet from './forge/Forge_Sheet';
import { useState} from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './css/forge.module.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Sheet() {
    const [value, setValue] = useState(0);
    const [mode, setMode] = useState(0);  //0=noraml, 1=compare
    const [allData, setAllData] = useState(JSON.parse(localStorage.getItem('forge_sheet')));

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    //更新allData
    const freshAllData = (file, index)=>{
      setAllData(JSON.parse(localStorage.getItem('forge_sheet')));
      file = normalMode(file, index);
      setMode(0);
    };

    //編輯存檔名稱
    const editFileName = (file, index)=>{
      let r = window.prompt('將 「' + file.name + ' 」更改為?');
      if(r){
        allData[index].name = r;
        localStorage.setItem('forge_sheet', JSON.stringify(allData));
        setAllData(allData);
        document.querySelector('#simple-tab-' + index).innerHTML = r;
      }
    };

    //清空存檔
    const deleteFile = (file, index)=>{
      let r = window.confirm('確定要清空存檔 「' + file.name + ' 」嗎?');
      if(r === true){
        allData[index].data = [];
        localStorage.setItem('forge_sheet', JSON.stringify(allData));
        setAllData(allData);
        document.querySelector('#table tbody').innerHTML = "";
      }
    };

    //計算比對值
    const compareMode = (file)=>{
      let atk_max = Math.max(...file.data.map(e=>e.atk));
      let def_max = Math.max(...file.data.map(e=>e.def));
      let luk_max = Math.max(...file.data.map(e=>e.luk));
      let wt_max = Math.max(...file.data.map(e=>e.wt));
      let dur_max = Math.max(...file.data.map(e=>e.dur));
      file.data.forEach(e=>{
        e.atk = Math.floor(e.atk/atk_max*100);
        e.def = Math.floor(e.def/def_max*100);
        e.luk = Math.floor(e.luk/luk_max*100);
        e.wt = Math.floor(e.wt/wt_max*100);
        e.dur = Math.floor(e.dur/dur_max*100);
      });
      return file;    
    }

    //一般模式
    const normalMode = (file, i) =>{
      let data = JSON.parse(localStorage.getItem('forge_sheet'))[i].data;
      file.data.forEach((e, index)=>{
        e.atk = data[index].atk;
        e.def = data[index].def;
        e.luk = data[index].luk;
        e.wt = data[index].wt;
        e.dur = data[index].dur;
      })
      return file;
    }

    //切換模式
    const changeMode = (file, index)=>{
      let newMode = (mode === 0) ? 1 : 0;
      if(newMode === 0){
        file = normalMode(file, index);
      }
      else if(newMode === 1){
        file = compareMode(file);
      }
      allData[index] = file;
      setMode(newMode);
    }
  
    return (
        <div>
            <Title mainTitle="測名表"/>
        
            <div className='main'>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="basic tabs example"
                    textColor="inherit"
                    centered
                >
                    {
                        allData.map((file, index)=>(
                            <Tab onClick={()=>freshAllData(file, index)} key={index} label={file.name} {...a11yProps(index)} />
                        ))
                    }
                </Tabs>
                </Box>
                {
                    allData.map((file, index)=>(
                        <TabPanel value={value} index={index}>
                          
                            <div className={styles.buttonBox}>
                                <Button onClick={()=>editFileName(file, index)} variant="contained" startIcon={<EditIcon />}>更改存檔名稱</Button>
                                <Button onClick={()=>deleteFile(file, index)} variant="contained" startIcon={<DeleteIcon />}>清空該存檔</Button>
                                <Button onClick={()=>changeMode(file, index)} variant="contained">切換/比對模式</Button>
                            </div>

                            <ForgeSheet data={file.data} mode={mode} fileIndex={index}/>
                        </TabPanel>
                    ))
                }
            </div>
        </div>
        
    );
}
