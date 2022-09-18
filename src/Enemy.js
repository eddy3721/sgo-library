import React from 'react'
import EnemyData from './json/enemy.json'
import PropData from './json/props.json'
import styles from './css/enemy.module.css';
import { useState } from 'react';

export default function Enemy() {
  let type = {
    "skill": "iconfont icon-book",
    "item": "iconfont icon-material",
    "mine": "iconfont icon-material"
  }
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
    setPopoverPos([event.target.offsetLeft, event.target.offsetTop-scrollTop + 32]);
  }
  const hidePopover = (event)=>{
    setPopoverPos(null);
  }

  return (
      <div>
        <h1>怪物</h1>
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
                <div className={styles.drop}>
                  {
                    enemy.drop.map(drop=>(
                      <div onMouseEnter={showPopover.bind(this,drop[0]-1)} onMouseLeave={hidePopover}>
                        <div>
                          <i className={type[PropData[Number(drop[0])-1].type] + ' ' + styles.pointEventNone}/><span className={styles.pointEventNone}>&nbsp;{PropData[Number(drop[0])-1].name}</span>
                        </div>
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
      </div>
  )
}
