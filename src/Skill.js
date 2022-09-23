import React from 'react'
import PropData from './json/props.json'
import styles from './css/enemy.module.css';
import { useState } from 'react';
import Title from './Title';

export default function Skill() {
  let type = ["單手劍", "細劍", "短刀", "單手錘", "盾牌", "雙手劍", "太刀", "雙手斧", "長槍"];
  let [weaponType, setWeaponType] = useState('');

  let skillData = PropData.filter(prop=>prop.type === 'skill');
  let weaponClass = {};
  for(let i = 0; i < type.length; i++){
    weaponClass[type[i]] = skillData.filter(prop=>prop.weapon === type[i]);
  }

  return (
    <div>
        <Title mainTitle="技能"/>
        
        <div className='main'>
          <div>
            {
              type.map(weapon=>(
                <button onClick={()=>setWeaponType(weapon)} className={styles.enemyMapButton}>{weapon}</button>
              ))
            }
          </div>
          <hr className="divider" />
          <div>
            {
              (weaponType === '') ? 
              <div>-請選擇武器類型-</div>:
              <div>{'-' + weaponType + '-'}</div>
            }
          </div>
          
          <div className={styles.enemyList}>
            {
              weaponType &&
              weaponClass[weaponType].map((skill)=>(
                <div className={styles.skillDetail}>
                  <p>{skill.name}</p>
                  <p>{skill.intro}</p>
                  <hr className="divider" />
                  {
                    skill.preview.map((p, index)=>(
                      <div className={styles.report}>
                        <div className={styles.reportNum}>{index+1}</div>{p}
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
  )
}
