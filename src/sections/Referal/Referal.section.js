import React from 'react'

import styles from './Referal.module.css';
import { ClientCard } from '../../components';
import { img_1, img_2, img_3, img_4, img_5, img_6 } from '../../res/images';

const Referal = () => {
    return (
        <div className={styles.referedContainer}>
            {workers.map((worker, index) => <ClientCard client={worker} />)}
        </div>
    )
}

export default Referal;


const workers = [
    {id: 1, name:'James Br', age: 22, sex: 'Male', numberOfClients: 45, progress: 80, img: img_1},
    {id: 2, name:'Kate Lv', age: 27, sex: 'Female', numberOfClients: 40, progress: 76, img: img_2},
    {id: 3, name:'Cynthia Cr', age: 26, sex: 'Female', numberOfClients: 36, progress: 70, img: img_3},
]