import React from 'react'
import EnemyData from './json/enemy.json'
import PropData from './json/props.json'
import styles from './css/enemy.module.css';
import { useState } from 'react';
import Title from './Title';
import ComboBox from './ComboBox';
import EnemyDrop from './EnemyDrop';
import {Alert, Autocomplete} from '@mui/material';

export default function Enemy() {
  let typeCh = {
    "skill": "技能書",
    "item": "道具",
    "mine": "礦物"
  }
  function pushMapname(){
    let arr = [];
    EnemyData.forEach(map=>{
      arr.push(map.name);
    })
    return arr;
  }
  let [mapNameArr] = useState(pushMapname());
  let [mapNum, setMapNum] = useState(-1);
  let [item, setItem] = useState({});
  let [value, setValue] = useState(''); //選地圖

  //popover
  let [popoverPos, setPopoverPos] = useState(null);
  const showPopover = (id, event)=>{
    let scrollTop  = document.body.scrollTop;
    setItem(PropData[id]);
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
              <div>{'-' + EnemyData[mapNum].name + '-'}</div>
            }
          </div>
          
          <div className={styles.enemyList}>
            {
              (mapNum !== -1) &&
              EnemyData[mapNum].enemy.map(enemy=>(
                <div className={styles.enemyDetail}>
                  <p>{enemy.name}</p>
                  <p>{'出沒層數: ' + enemy.layer[0] + '~' + enemy.layer[1]}</p>
                  <hr className="divider" />
                  <div className={styles.drop} style={{}}>
                    {
                      enemy.drop.map(drop=>(
                        <div onMouseEnter={showPopover.bind(this,drop[0]-1)} onMouseLeave={hidePopover}>
                          <EnemyDrop rate={drop[1] / enemy.total} drop={drop}/>
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
      </div>
  )
}
