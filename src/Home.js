import styles from './css/home.module.css';
import React from 'react';
import {Link} from 'react-router-dom';

export default function ProductList() {

    let list = [
        {'name':'怪物','url':'/enemy'},
        {'name':'素材','url':'/drop'},
        {'name':'技能','url':'/skill'},
        {'name':'未開放','url':'/none'},
        {'name':'未開放','url':'/none'},
        {'name':'未開放','url':'/none'},
        {'name':'未開放','url':'/none'},
        {'name':'未開放','url':'/none'},
    ];

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