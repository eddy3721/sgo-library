import React from 'react'
import PropData from './json/props.json'
import styles from './css/drop.module.css';
import { useState } from 'react';
import Title from './Title';

export default function Drop() {
  let type = [["item", "道具"],["mine", "礦物"]];
  let propClass = {};

  type.forEach(type=>{
    propClass[type[0]] = PropData.filter(prop=>prop.type === type[0]);
  });

  let [typeNum, setTypeNum] = useState('');
  let [openIntro, setOpenIntro] = useState(0);
  let [searchClass, setSearchClass] = useState([]);


  const showIntro = (id)=>{
    (openIntro === id) ? setOpenIntro(0) : setOpenIntro(id);
  };

  const updateSearch = (value)=>{
    (value) ?
    setSearchClass(PropData.filter(prop=>prop.name.indexOf(value) !== -1)):
    setSearchClass([]);
  };

  return (
      <div>
        <Title mainTitle="素材"/>
        
        <div className='main'>
          <div>
            {
              type.map(type=>(
                <button onClick={()=>setTypeNum(type[0])} className={styles.enemyMapButton}>{type[1]}</button>
              ))
            }
          </div>
          <hr className="divider" />
          <div>
            {
              (searchClass.length !== 0) &&
              searchClass.map(item=>(
                <div key={item.id} className={styles.item} onClick={showIntro.bind(this,item.id)}>
                  {
                    (openIntro === item.id) ?
                    <span>&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;&nbsp;</span>:
                    <span>&nbsp;&nbsp;&nbsp;◇&nbsp;&nbsp;&nbsp;</span>
                  }
                  <span>{item.name}</span>
                  <div>
                    {
                      (openIntro === item.id) &&
                      <div>{item.intro}</div>
                    }
                  </div>
                </div>
              ))
            }
            {
              (typeNum && searchClass.length===0) &&
              propClass[typeNum].map(item=>(
                <div key={item.id} className={styles.item} onClick={showIntro.bind(this,item.id)}>
                  {
                    (openIntro === item.id) ?
                    <span>&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;&nbsp;</span>:
                    <span>&nbsp;&nbsp;&nbsp;◇&nbsp;&nbsp;&nbsp;</span>
                  }
                  <span>{item.name}</span>
                  <div>
                    {
                      (openIntro === item.id) &&
                      <div>{item.intro}</div>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className={styles.search}>
          <input className={styles.searchBox} placeholder="搜尋.w.b" onChange={(e)=>updateSearch(e.target.value)} />
        </div>
      </div>
  )
}
