import React from 'react'
import PropData from './json/props.json'
import styles from './css/drop.module.css';
import { useState , useEffect} from 'react';
import Title from './Title';
import $ from 'jquery';

//googleSheet

export default function Drop() {
  let type = [["item", "道具"],["mine", "礦物"]];
  let propClass = {};

  type.forEach(type=>{
    propClass[type[0]] = PropData.filter(prop=>prop.type === type[0]);
  });

  let [typeNum, setTypeNum] = useState('');
  let [openIntro, setOpenIntro] = useState(0);
  let [searchClass, setSearchClass] = useState([]);
  let [dropEnemy, setDropEnemy] = useState([]);
  let [dropData, setDropData] = useState();

  useEffect(() => {
    let a = {
      sheetUrl: "https://docs.google.com/spreadsheets/d/1NgVMebLyJ7Mstm-N_DjGNno388w0Ncm0OfA8RwCj6jg/edit#gid=1862839471",
      page: "drop"
    };
    // declare the async data fetching function
    const fetchData = async () => {
      let dropData;
      await $.get('https://script.google.com/macros/s/AKfycbyB__dTvxQjtUVkmhX5frOiqc6EITwt_Vv3OwjF7gdwYpb_R18zbpdpeAx6Bfs0pEgc/exec',a, function(data){
        dropData = JSON.parse(data);
      });
      dropData.item = dropData.itemAndMineData.filter(e=>e.type === 'item');
      dropData.mine = dropData.itemAndMineData.filter(e=>e.type === 'mine');
      delete dropData.enemyData[""];
      console.log(dropData);
      setDropData(dropData);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [])

  const showIntro = (id)=>{
    (openIntro === id) ? setOpenIntro(0) : setOpenIntro(id);
    let arr = [];
    Object.keys(dropData.enemyData).forEach(mapName=>{
      dropData.enemyData[mapName].forEach(enemy=>{
        for(let i = 0; i < enemy.drop.length; i++){
          if(enemy.drop[i] === id){
            arr.push([enemy.name, mapName]);
          }
        }
      });
    });
    setDropEnemy(arr);
  };

  const updateSearch = (value)=>{
    (value) ?
    setSearchClass(PropData.filter(prop=>prop.name.indexOf(value) !== -1)):
    setSearchClass([]);
  };

  return (
      <div>
        <Title mainTitle="素材"/>
        
        {
          (dropData)?
          <div className='main' style={{marginBottom: '10rem'}}>
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
                        <div>
                          <div>{item.intro}</div>
                          <hr className="divider" />
                          <div className={styles.dropPlace}>
                            {
                              dropEnemy.map(info=>(
                                <div className={styles.dropPlace}>{info[0] + '(' + info[1] + ')'}</div>
                              ))
                            }
                          </div>
                        </div>   
                      }
                    </div>
                  </div>
                ))
              }
              {   
                (typeNum && searchClass.length===0) &&
                dropData[typeNum].map(item=>(
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
                          <div>
                            <div>{item.intro}</div>
                            <hr className="divider" />
                            <div className={styles.dropPlace}>
                              {
                                dropEnemy.map(info=>(
                                  <div className={styles.dropPlace}>{info[0] + '(' + info[1] + ')'}</div>
                                ))
                              }
                            </div>
                          </div>   
                        }
                      </div>
                    </div>
                  ))
              }
              
            </div>
          </div>
          :
          <div className='main' style={{marginBottom: '10rem'}}>
            <div>加載中</div>
          </div>
        }
        

        <div className={styles.search}>
          <input className={styles.searchBox} placeholder="搜尋.w.b" onChange={(e)=>updateSearch(e.target.value)} />
        </div>
      </div>
  )
}
