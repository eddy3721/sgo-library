import React from 'react'
import EnemyData from './json/enemy.json'
import PropData from './json/props.json'
import styles from './css/enemy.module.css';
import { useState, useEffect } from 'react';
import Title from './Title';
import ComboBox from './ComboBox';
import EnemyDrop from './EnemyDrop';
import {Alert, Autocomplete} from '@mui/material';
import $ from 'jquery';
import cofigJson from './json/config.json';

export default function Enemy() {
  let [mapNameArr, setMapNameArr] = useState();
  let [mapNum, setMapNum] = useState(0);
  let [item, setItem] = useState({});
  let [value, setValue] = useState('大草原'); //選地圖
  let [enemyData, setEnemyData] = useState();

  useEffect(() => {
    let a = {
      sheetUrl: cofigJson.sheetUrl,
      page: "drop"
    };
    // declare the async data fetching function
    const fetchData = async () => {
      let dropData;
      await $.get(cofigJson.appScriptUrl,a, function(data){
        dropData = JSON.parse(data);
      });
      Object.keys(dropData.enemyData).forEach(mapName=>{
        dropData.enemyData[mapName].forEach(enemy=>{
          enemy.drop.forEach((itemId, index)=>{
            enemy.drop[index] = dropData.itemAndMineData.find(item=>item.id === itemId);
          });
        });
      });
      delete dropData.enemyData[""];
      console.log(dropData);
      setEnemyData(dropData);
      setMapNameArr(Object.keys(dropData.enemyData));
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [])

  let typeCh = {
    "skill": "技能書",
    "item": "道具",
    "mine": "礦物"
  }


  //popover
  let [popoverPos, setPopoverPos] = useState(null);
  const showPopover = (id, event)=>{
    let scrollTop  = document.body.scrollTop;
    setItem(enemyData.itemAndMineData.find(item=>item.id === id));
    (event.target.offsetTop-scrollTop < 350) ? 
    setPopoverPos([event.target.offsetLeft, event.target.offsetTop-scrollTop + 32]):
    setPopoverPos([event.target.offsetLeft, event.target.offsetTop-scrollTop - 150]);
  }
  const hidePopover = (event)=>{
    setPopoverPos(null);
  }

  return (
      <div>
        <Title mainTitle="怪物"/>
        
        {
          (enemyData)?
          <div className='main'>
          
          <div>
            <Autocomplete
              disablePortal
              value={value}
              onChange={(event, newValue) => {
                  setValue(newValue);
                  setMapNum(mapNameArr.indexOf(newValue));
              }}
              id="combo-box-demo"
              options={mapNameArr}
              sx={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: 300,
              }}
              renderInput={(params) => <ComboBox label='地圖' params={params} />}
            />
          </div>

          <hr className="divider" />

          <div>
            {
              (mapNum === -1) ? 
              <Alert variant="outlined" severity="warning" color='info' sx={{color:'#03a9f4'}}>請選擇地圖</Alert>:
              <div>{'-' + value + '-'}</div>
            }
          </div>
          
          <div className={styles.enemyList}>
            {
              (mapNum !== -1) &&
              enemyData.enemyData[value].map(enemy=>(
                <div className={styles.enemyDetail}>
                  <p>{enemy.name}</p>
                  <p>{'出沒層數: ' + enemy.layer}</p>
                  <hr className="divider" />
                  <div className={styles.drop} style={{}}>
                    {
                      enemy.drop.map(drop=>(
                        <div onMouseEnter={showPopover.bind(this,drop.id)} onMouseLeave={hidePopover}>
                          <EnemyDrop rate={1} drop={drop}/>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
          {
            (popoverPos) &&
              <div className={styles.popover} style={{left: popoverPos[0], top: popoverPos[1]}}>
                <p>{item.name}</p>
                <p>{'類型 : ' + typeCh[item.type]}</p>
                <hr className="divider" />
                <p>{item.intro}</p>
              </div>
          }
          {
            (popoverPos) &&
              <div className={styles.popoverApp}>
                <p>{item.name}</p>
                <p>{'類型 : ' + typeCh[item.type]}</p>
                <hr className="divider" />
                <p>{item.intro}</p>
              </div>
          }
        </div>
        :
        <div className='main' style={{marginBottom: '10rem'}}>
          <div>加載中</div>
        </div>
        }
        
      </div>
  )
}