import React from 'react';
import { IoWallet } from 'react-icons/io5';
import { Button } from '..';

import styles from './RankRate.module.css';

const RankRate = (props) => {
    const {rank, rate} = props;
    return (
        <div className={styles.rankRate}>
            <div className={styles.rankProgress}>
                <div className={styles.rateContainer} style={{width: 250}}><div className={styles.rateBar} style={{width: (rate * 0.01 * 2.5) }} /></div>
                <h2 className={styles.rank}>{rate} / 10,000 XAF</h2>
            </div>
            <button className={[styles.rateButton, (rate >= 10000) ? styles.rateActivate : styles.rateDeactivate].join(' ')}><IoWallet className={styles.rateIcon} />Checkout</button>
        </div>
    )
}

export default RankRate;

