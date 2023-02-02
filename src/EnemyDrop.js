import React from 'react'
import styles from './css/enemy.module.css';
import PropData from './json/props.json'

export default function EnemyDrop(props) {
  let type = {
    "skill": "iconfont icon-book",
    "item": "iconfont icon-material",
    "mine": "iconfont icon-material",
    "none": ""
  }

  let drop;
  if(props.drop){
    drop = props.drop;
  }
  else{
    drop = {'type': 'none', 'name': '暫無', 'id': '1'};
  }
  
  return (  
      <div style={{backgroundColor: 'rgba(255, 255, 255, .15)', fontSize: '14px'}}>
        <i className={type[drop.type] + ' ' + styles.pointEventNone}/><span className={styles.pointEventNone}>&nbsp;{drop.name}</span>
      </div>
  )
}
