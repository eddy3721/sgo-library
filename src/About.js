import React from 'react'
import styles from './css/about.module.css';
import { useState } from 'react';
import Title from './Title';
import Avatar from './image/VG.gif';

export default function About() {
  let food = ["滷肉飯", "蔥油餅", "牛肉麵", "小籠包", "蚵仔煎", "臭豆腐", "雞排", 
                "鳳梨酥", "便當", "肉圓", "聖黃金蛋炒飯", "肉粽", "紅豆餅", "炸粿",
                "鍋貼", "鐵板麵", "泡麵", "火雞肉飯"];
  let [ramdomFood] = useState(food[Math.floor(Math.random()*food.length)]);
  
  return (
    <div>
        <Title mainTitle="關於"/>
        
        <div className='main'>
          <hr className="divider" />
          
          <div className={styles.enemyList}>
            <div className={styles.skillDetail}>
                <p>作者</p>
                <hr className="divider" />
                <img src={Avatar} alt="" />
                <p>DC : eddy3721</p>
                <hr className="divider" />
                <div>興趣是畫圖跟寫程式，最喜歡的食物是{ramdomFood}，偶像是茅場晶彥。</div>
                <div>有問題找菜雞的話，在<a style={{color:'#90b4f7'}} href='https://discord.gg/shhwVKNPpy' target="_blank" rel="noreferrer" >大群</a>的 #麻店 比較常出現。</div>
            </div>
            <div className={styles.skillDetail}>
                <p>參考網站</p>
                <hr className="divider" />
                <div>
                    <a style={{color:'#90b4f7'}} href='https://cy-grimoire.netlify.app/' target="_blank" rel="noreferrer" >布偶的魔法書</a>
                </div>
                <div>
                    <a style={{color:'#90b4f7'}} href='https://swordgale.online/' target="_blank" rel="noreferrer" >Sword Gale Online</a>
                </div>
                <div>
                    <a style={{color:'#90b4f7'}} href='https://mykirito.com/' target="_blank" rel="noreferrer" >我的桐人</a>
                </div>
            </div>
            <div className={styles.skillDetail}>
                <p>資料提供</p>
                <hr className="divider" />
            </div>
          </div>
        </div>
      </div>
  )
}
