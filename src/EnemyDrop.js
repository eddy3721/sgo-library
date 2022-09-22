import React from 'react'
import styles from './css/enemy.module.css';
import PropData from './json/props.json'

export default function EnemyDrop(props) {
  let type = {
    "skill": "iconfont icon-book",
    "item": "iconfont icon-material",
    "mine": "iconfont icon-material"
  }
  let bc = '';

  if(props.rate >= 0.7) bc = '3d6c3d';
  else if(props.rate >= 0.5) bc = '4387ad';
  else if(props.rate >= 0.3) bc = '7e5d89';
  else bc = 'caa853';

  let drop = props.drop;

  return (
    <div style={{border: '3px solid #' + bc}}>
        <i className={type[PropData[Number(drop[0])-1].type] + ' ' + styles.pointEventNone}/><span className={styles.pointEventNone}>&nbsp;{PropData[Number(drop[0])-1].name}</span>
    </div>
  )
}
