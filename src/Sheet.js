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
    const [allData, setAllData] = useState(JSON.parse(localStorage.getItem('forge_sheet')));

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    //更新allData
    const freshAllData = ()=>{
      setAllData(JSON.parse(localStorage.getItem('forge_sheet')));
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
        
      }
    };
  
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
                            <Tab onClick={()=>freshAllData()} key={index} label={file.name} {...a11yProps(index)} />
                        ))
                    }
                </Tabs>
                </Box>
                {
                    allData.map((file, index)=>(
                        <TabPanel value={value} index={index}>
                          
                            <div className={styles.buttonBox}>
                                <Button variant="contained">匯出excel</Button>
                                <Button variant="contained">匯入excel</Button>
                                <Button onClick={()=>editFileName(file, index)} variant="contained" startIcon={<EditIcon />}>更改存檔名稱</Button>
                                <Button onClick={()=>deleteFile(file, index)} variant="contained" startIcon={<DeleteIcon />}>清空該存檔</Button>
                            </div>

                            <ForgeSheet data={file.data} fileIndex={index}/>
                        </TabPanel>
                    ))
                }
            </div>
        </div>
        
    );
}
