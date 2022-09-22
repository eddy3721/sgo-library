import React from 'react'
import EnemyData from './json/enemy.json'
import PropData from './json/props.json'
import styles from './css/enemy.module.css';
import { useState } from 'react';
import Title from './Title';
import EnemyDrop from './EnemyDrop';

export default function Enemy() {
  let typeCh = {
    "skill": "技能書",
    "item": "道具",
    "mine": "礦物"
  }
  let enemyData = Object.entries(EnemyData);
  let [mapNum, setMapNum] = useState('');
  let [item, setItem] = useState({});

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
            {
              enemyData.map(map=>(
                <button key={map[0]} onClick={()=>setMapNum(map[0])} className={styles.enemyMapButton}>{map[1].name}</button>
              ))
            }
          </div>
          <hr className="divider" />
          <div>
            {
              (mapNum === '') ? 
              <div>-請選擇地圖-</div>:
              <div>{'-' + enemyData[mapNum][1].name + '-'}</div>
            }
          </div>
          
          <div className={styles.enemyList}>
            {
              mapNum &&
              enemyData[mapNum][1].enemy.map(enemy=>(
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
