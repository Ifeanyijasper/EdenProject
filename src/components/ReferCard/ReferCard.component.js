import React from 'react';
import { IoBarChart } from 'react-icons/io5';
import { img_3 } from '../../res/images';
import extractInitials from '../../utils/extractIni';

import styles from './ReferCard.module.css';

const ReferCard = (props) => {
    const {refer} = props;
    return (
        <div className={styles.referCard}>
            <div className={styles.referDetails}>
                { refer.img ? 
                <img src={img_3} alt="Refer name" className={styles.referImage}/>
                : 
                 <p className={styles.referIni}>{refer.fullname ? extractInitials(refer.fullname) : extractInitials(refer.username)}</p>
                }
                <h2 className={styles.referName}>{refer.fullname || refer.username}</h2>
            </div>
        </div>
    )
}

export default ReferCard;
