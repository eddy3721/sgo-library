import styles from './css/home.module.css';
import React from 'react';
import {Link} from 'react-router-dom';
import {useEffect } from 'react';

export default function ProductList() {

    let list = [
        {'name':'怪物','url':'/enemy'},
        {'name':'素材','url':'/drop'},
        {'name':'技能','url':'/skill'},
        {'name':'測名','url':'/forge'},
        {'name':'測名表','url':'/sheet'},
        {'name':'未開放','url':'/none'},
        {'name':'未開放','url':'/none'},
        {'name':'未開放','url':'/none'},
    ];

     //新建存檔
     useEffect(() => {
        let data = JSON.parse(localStorage.getItem('forge_sheet'));
        console.log(data);

        if(data === null){
            data = [];
            for(let i = 1; i <= 4; i++){
                let obj = {
                    'name': '存檔' + i, 
                    'data': []
                }
                data.push(obj);
            }

            localStorage.setItem('forge_sheet', JSON.stringify(data));
        }
    }, [])

    return (
        <div >
            <h1>大木小窩</h1>

            <nav className={styles.circleMenu}>
                <div>
                    {
                        list.map(product=>(
                            <Link to={product.url} className={styles.circleButton}>
                                <Link to={product.url}>{product.name}</Link>
                            </Link>
                        ))
                    }
                </div>
            </nav>
        </div>
    )
}