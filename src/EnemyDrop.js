import React from 'react'
import styles from './css/enemy.module.css';
import PropData from './json/props.json'

export default function EnemyDrop(props) {
  let type = {
    "skill": "iconfont icon-book",
    "item": "iconfont icon-material",
    "mine": "iconfont icon-material"
  }

  let drop = props.drop;

  return (
    <div style={{backgroundColor: 'rgba(255, 255, 255, .15)', fontSize: '14px'}}>
        <i className={type[PropData[Number(drop)-1].type] + ' ' + styles.pointEventNone}/><span className={styles.pointEventNone}>&nbsp;{PropData[Number(drop)-1].name}</span>
    </div>
  )
}
